import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, FileText, CheckCircle, Download } from "lucide-react";
import useNotification from "@/hooks/useNotification";

interface CSVImportProps {
  onImportSuccess: (data: any[]) => void;
}

export function CSVImport({ onImportSuccess }: CSVImportProps) {
  const [file, setFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const [preview, setPreview] = useState<any[]>([]);
  const { success_message, error_message } = useNotification();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
      previewCSV(selectedFile);
    } else {
      error_message(null, null, "Please select a valid CSV file");
    }
  };

  const previewCSV = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split("\n").filter((line) => line.trim());
      const headers = lines[0].split(",").map((h) => h.trim());

      // Validate headers
      const requiredHeaders = [
        "country_code",
        "country_name",
        "bank_code",
        "bank_name",
      ];
      const isValidFormat = requiredHeaders.every((header) =>
        headers.includes(header)
      );

      if (!isValidFormat) {
        error_message(
          null,
          null,
          "CSV must have columns: country_code, country_name, bank_code, bank_name"
        );
        setFile(null);
        return;
      }

      const data = lines.slice(1, 6).map((line) => {
        const values = line.split(",").map((v) => v.trim());
        return headers.reduce((obj, header, index) => {
          obj[header] = values[index] || "";
          return obj;
        }, {} as any);
      });

      setPreview(data);
    };
    reader.readAsText(file);
  };

  const downloadSampleCSV = () => {
    const sampleData = [
      ["country_code", "country_name", "bank_code", "bank_name"],
      ["US", "United States", "JPM", "JPMorgan Chase"],
      ["US", "United States", "BAC", "Bank of America"],
      ["GB", "United Kingdom", "HSBC", "HSBC Holdings"],
      ["SG", "Singapore", "DBS", "DBS Bank"],
      ["JP", "Japan", "MUFG", "Mitsubishi UFJ Financial Group"],
    ];

    const csvContent = sampleData.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "sample_banks.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    success_message(null, null, "Sample CSV file downloaded successfully");
  };

  const handleImport = async () => {
    if (!file) return;

    setImporting(true);

    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const lines = text.split("\n").filter((line) => line.trim());
        const headers = lines[0].split(",").map((h) => h.trim());

        const data = lines.slice(1).map((line, index) => {
          const values = line.split(",").map((v) => v.trim());
          const row = headers.reduce((obj, header, headerIndex) => {
            obj[header] = values[headerIndex] || "";
            return obj;
          }, {} as any);

          return {
            ...row,
            id: `bank_${Date.now()}_${index}`,
            created_at: new Date().toISOString(),
          };
        });

        onImportSuccess(data);

        success_message(
          null,
          null,
          `Successfully imported ${data.length} banks`
        );

        setFile(null);
        setPreview([]);
      };

      reader.readAsText(file);
    } catch (error) {
      error_message(null, null, "An error occurred while importing data");
    } finally {
      setImporting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Import CSV
        </CardTitle>
        <CardDescription>
          Upload CSV file to add countries and banks
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <FileText className="h-4 w-4" />
          <AlertDescription>
            <strong>Required CSV format:</strong>
            <br />
            country_code,country_name,bank_code,bank_name
            <br />
            US,United States,JPM,JPMorgan Chase
            <br />
            GB,United Kingdom,HSBC,HSBC Holdings
          </AlertDescription>
        </Alert>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={downloadSampleCSV}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download Sample
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <Input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="flex-1"
          />
          <Button
            onClick={handleImport}
            disabled={!file || importing}
            className="whitespace-nowrap"
          >
            {importing ? "Importing..." : "Import CSV"}
          </Button>
        </div>

        {preview.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Data Preview (first 5 rows):
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border rounded">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border p-2 text-left">Country Code</th>
                    <th className="border p-2 text-left">Country Name</th>
                    <th className="border p-2 text-left">Bank Code</th>
                    <th className="border p-2 text-left">Bank Name</th>
                  </tr>
                </thead>
                <tbody>
                  {preview.map((row, index) => (
                    <tr key={index}>
                      <td className="border p-2">{row.country_code}</td>
                      <td className="border p-2">{row.country_name}</td>
                      <td className="border p-2">{row.bank_code}</td>
                      <td className="border p-2">{row.bank_name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
