"use client";
import { useState } from "react";
import { CSVImport } from "./_components/CSVImport";
import { BankingTable } from "./_components/BankingTable"; 
import { CountryStats } from "./_components/CountryStats";
import { BankForm } from "./_components/BankForm"; 
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Bank,Country } from "@/types/bank"; 
import useNotification from "@/hooks/useNotification";

const BankingManagementPage = () => {
  const { success_message,error_message } = useNotification();
  
  const [banks, setBanks] = useState<Bank[]>([
    {
      id: "1",
      country_code: "VN",
      country_name: "Vietnam",
      bank_code: "VCB",
      bank_name: "Vietcombank",
      created_at: "2024-01-15T10:00:00Z"
    },
    {
      id: "2",
      country_code: "VN",
      country_name: "Vietnam",
      bank_code: "TCB",
      bank_name: "Techcombank",
      created_at: "2024-01-15T10:05:00Z"
    },
    {
      id: "3",
      country_code: "TH",
      country_name: "Thailand",
      bank_code: "SCB",
      bank_name: "Siam Commercial Bank",
      created_at: "2024-01-15T10:10:00Z"
    },
    {
      id: "4",
      country_code: "TH",
      country_name: "Thailand",
      bank_code: "BBL",
      bank_name: "Bangkok Bank",
      created_at: "2024-01-15T10:15:00Z"
    }
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBank, setEditingBank] = useState<Bank | null>(null);

  // Calculate countries from banks data
  const countries: Country[] = banks.reduce((acc, bank) => {
    const existing = acc.find(c => c.country_code === bank.country_code);
    if (existing) {
      existing.bank_count++;
    } else {
      acc.push({
        country_code: bank.country_code,
        country_name: bank.country_name,
        bank_count: 1
      });
    }
    return acc;
  }, [] as Country[]);

  const handleImportSuccess = (importedBanks: any[]) => {
    const newBanks = importedBanks.map(bank => ({
      id: bank.id,
      country_code: bank.country_code,
      country_name: bank.country_name,
      bank_code: bank.bank_code,
      bank_name: bank.bank_name,
      created_at: bank.created_at
    }));

    // Check for duplicates before importing
    const duplicates = newBanks.filter(newBank => 
      banks.some(existingBank => 
        existingBank.country_code === newBank.country_code && 
        existingBank.bank_code.toLowerCase() === newBank.bank_code.toLowerCase()
      )
    );

    if (duplicates.length > 0) {
      const duplicateList = duplicates.map(bank => `${bank.bank_code} (${bank.country_name})`).join(', ');
      error_message(
        null,
        null,
        `Các ngân hàng sau đã tồn tại trong hệ thống: ${duplicateList}. Vui lòng kiểm tra lại file CSV.`,
      );
      return; // Stop the import process
    }

    // Filter out any banks that might be duplicates within the import itself
    const uniqueNewBanks = newBanks.filter((bank, index, self) => 
      index === self.findIndex(b => 
        b.country_code === bank.country_code && 
        b.bank_code.toLowerCase() === bank.bank_code.toLowerCase()
      )
    );

    if (uniqueNewBanks.length !== newBanks.length) {
      error_message(
        null,
        null,
        `File CSV có chứa ${newBanks.length - uniqueNewBanks.length} ngân hàng trùng lặp. Chỉ import ${uniqueNewBanks.length} ngân hàng duy nhất.`,
      );
    }

    setBanks(prev => [...prev, ...uniqueNewBanks]);
    
    success_message(
        null,
        null,
        `Đã thêm ${uniqueNewBanks.length} ngân hàng vào hệ thống.`,
      );
  };

  const handleDeleteBank = (bankId: string) => {
    setBanks(prev => prev.filter(bank => bank.id !== bankId));
  };

  const handleEditBank = (bank: Bank) => {
    setEditingBank(bank);
    setIsFormOpen(true);
  };

  const handleSaveBank = (bankData: Omit<Bank, 'id' | 'created_at'>) => {
    if (editingBank) {
      // Update existing bank
      setBanks(prev => prev.map(bank => 
        bank.id === editingBank.id 
          ? { ...bank, ...bankData }
          : bank
      ));
    } else {
      // Add new bank
      const newBank: Bank = {
        ...bankData,
        id: `bank_${Date.now()}`,
        created_at: new Date().toISOString()
      };
      setBanks(prev => [...prev, newBank]);
    }
    setEditingBank(null);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingBank(null);
  };

  return (
    <div className="flex-1">
      <div className="container px-4 sm:px-6 py-4 sm:py-6 mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">Banking Management</h2>
            <p className="text-gray-600">Manage banks and countries list</p>
          </div>
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Bank
          </Button>
        </div>

        <CountryStats countries={countries} totalBanks={banks.length} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <CSVImport onImportSuccess={handleImportSuccess} />
          </div>
          <div className="lg:col-span-2">
            <BankingTable 
              banks={banks}
              countries={countries}
              onDeleteBank={handleDeleteBank}
              onEditBank={handleEditBank}
            />
          </div>
        </div>

        <BankForm
          isOpen={isFormOpen}
          onClose={handleCloseForm}
          onSave={handleSaveBank}
          editingBank={editingBank}
          countries={countries}
          existingBanks={banks}
        />
      </div>
    </div>
  );
};

export default BankingManagementPage;
