import { API_ROUTES } from "@/api/endpoints";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { usePrivateImagePost } from "@/hooks/api-hooks";
import useNotification from "@/hooks/useNotification";
import { CheckCircle, Download, FileText, Upload } from "lucide-react";
import { useState } from "react";

interface CSVImportProps {
  onImportSuccess: () => void;
}

export function CSVImport({ onImportSuccess }: CSVImportProps) {
  const [file, setFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const [preview, setPreview] = useState<any[]>([]);
  const { success_message, error_message } = useNotification();

  const { trigger: importBank } = usePrivateImagePost(API_ROUTES.bank.import_bank);

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

      const requiredHeaders = ["name", "country", "is_global"];
      const isValidFormat = requiredHeaders.every((header) =>
        headers.includes(header)
      );

      if (!isValidFormat) {
        error_message(
          null,
          null,
          "CSV must have columns: name, country, is_global"
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
      ["name", "country", "is_global"],
      ["Vietcombank", "Vietnam", "false"],
      ["Bangkok Bank", "Thailand", "false"],
      ["HSBC", "United Kingdom", "true"],
      ["DBS Bank", "Singapore", "true"],
      ["MUFG", "Japan", "true"],
    ];
    const csvContent = sampleData.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "sample_banks.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    success_message(null, null, "Sample CSV file downloaded successfully");
  };

  const handleImport = async () => {
    if (!file) return;

    setImporting(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      console.log("formdatâ",formData);
      

      await importBank(formData);
      success_message(null, null, "Banks imported successfully");
      onImportSuccess();

      setFile(null);
      setPreview([]);
    } catch (error) {
      error_message(null, null, "Failed to import CSV");
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
          Upload a CSV file with format: name, country, is_global
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <FileText className="h-4 w-4" />
          <AlertDescription>
            <strong>Required CSV format:</strong>
            <br />
            name,country,is_global
            <br />
            Vietcombank,Vietnam,false
            <br />
            HSBC,United Kingdom,true
          </AlertDescription>
        </Alert>

        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={downloadSampleCSV} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download Sample
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <Input type="file" accept=".csv" onChange={handleFileChange} className="flex-1" />
          <Button onClick={handleImport} disabled={!file || importing} className="whitespace-nowrap">
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
                    <th className="border p-2 text-left">Name</th>
                    <th className="border p-2 text-left">Country</th>
                    <th className="border p-2 text-left">Is Global</th>
                  </tr>
                </thead>
                <tbody>
                  {preview.map((row, index) => (
                    <tr key={index}>
                      <td className="border p-2">{row.name}</td>
                      <td className="border p-2">{row.country}</td>
                      <td className="border p-2">{row.is_global}</td>
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
