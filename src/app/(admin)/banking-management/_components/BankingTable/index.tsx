
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Search, Filter, Edit, Trash2 } from "lucide-react";
import { Bank, Country } from "@/types/bank";
import useNotification from "@/hooks/useNotification";

interface BankingTableProps {
  banks: Bank[];
  countries: Country[];
  onDeleteBank: (bankId: string) => void;
  onEditBank: (bank: Bank) => void;
}

export function BankingTable({ banks, countries, onDeleteBank, onEditBank }: BankingTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string>("all");
  const { success_message,error_message } = useNotification();

  const filteredBanks = banks.filter(bank => {
    const matchesSearch = 
      bank.bank_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bank.bank_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bank.country_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCountry = selectedCountry === "all" || bank.country_code === selectedCountry;
    
    return matchesSearch && matchesCountry;
  });

  const handleDelete = (bank: Bank) => {
    if (confirm(`Bạn có chắc chắn muốn xóa ngân hàng "${bank.bank_name}"?`)) {
      onDeleteBank(bank.id);
      success_message(
        null,
        null,
        `Ngân hàng "${bank.bank_name}" đã được xóa`,
      );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Danh sách ngân hàng</CardTitle>
        <CardDescription>
          Quản lý danh sách ngân hàng theo quốc gia
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Tìm kiếm ngân hàng, mã ngân hàng, quốc gia..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="w-full md:w-[200px]">
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Chọn quốc gia" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả quốc gia</SelectItem>
                {countries.map((country) => (
                  <SelectItem key={country.country_code} value={country.country_code}>
                    {country.country_name} ({country.bank_count})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Quốc gia</TableHead>
                <TableHead>Mã ngân hàng</TableHead>
                <TableHead>Tên ngân hàng</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBanks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    Không tìm thấy ngân hàng nào
                  </TableCell>
                </TableRow>
              ) : (
                filteredBanks.map((bank) => (
                  <TableRow key={bank.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{bank.country_code}</Badge>
                        <span>{bank.country_name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono">{bank.bank_code}</TableCell>
                    <TableCell className="font-medium">{bank.bank_name}</TableCell>
                    <TableCell>{new Date(bank.created_at).toLocaleDateString('vi-VN')}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onEditBank(bank)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Chỉnh sửa
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDelete(bank)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Xóa
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 text-sm text-gray-500">
          Hiển thị {filteredBanks.length} / {banks.length} ngân hàng
        </div>
      </CardContent>
    </Card>
  );
}
