"use client";

import { API_ROUTES } from "@/api/endpoints";
import { Button } from "@/components/ui/button";
import { usePrivateFetchParams, usePrivatePost } from "@/hooks/api-hooks";
import { useDebounce } from "@/hooks/useDebounce";
import useNotification from "@/hooks/useNotification";
import { Bank, BankingData } from "@/types/bank";
import { Plus } from "lucide-react";
import { useState } from "react";
import { BankForm } from "./_components/BankForm";
import { BankingTable } from "./_components/BankingTable";
import { CountryStats } from "./_components/CountryStats";
import { CSVImport } from "./_components/CSVImport";

function buildQueryURL(base: string, params: Record<string, string>): string {
  const query = new URLSearchParams(params).toString();
  return `${base}?${query}`;
}

const BankingManagementPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBank, setEditingBank] = useState<Bank | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("all");

  const debouncedSearchTerm = useDebounce(searchTerm.trim(), 400); // ✅

  const { success_message, error_message } = useNotification();

  // ✅ build params cho API search_bank
  const queryParams: Record<string, string> = {};
  if (debouncedSearchTerm) queryParams.name = debouncedSearchTerm;
  if (selectedCountry !== "all") queryParams.country = selectedCountry;

  const queryUrl = buildQueryURL(API_ROUTES.bank.search_bank, queryParams);
  const { data, mutate } = usePrivateFetchParams<BankingData>(queryUrl);
  const banks: Bank[] = data?.banks || [];

  const uniqueCountries = Array.from(
  new Set(banks.map((bank) => bank.country))
).filter(Boolean);


  const { trigger: addBank } = usePrivatePost(API_ROUTES.bank.add_bank);

  // const handleEditBank = (bank: Bank) => {
  //   setEditingBank(bank);
  //   setIsFormOpen(true);
  // };

  const handleCloseForm = () => {
    setEditingBank(null);
    setIsFormOpen(false);
  };

  const handleSaveBank = async (data: Omit<Bank, "id">) => {
    try {
      await addBank(data);
      success_message(null, null, "Bank added successfully");
      mutate();
      handleCloseForm();
    } catch (err) {
      error_message(null, null, "Failed to add bank");
    }
  };

  // const handleDeleteBank = (bankId: string) => {
  //   // TODO: Implement DELETE API
  //   mutate();
  // };

  return (
    <div className="flex-1">
      <div className="container px-4 sm:px-6 py-4 sm:py-6 mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">
              Banking Management
            </h2>
            <p className="text-gray-600">Manage your bank list</p>
          </div>
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Bank
          </Button>
        </div>
        <CountryStats banks={banks} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <CSVImport onImportSuccess={() => mutate()} />
          </div>
          <div className="lg:col-span-2">
            <BankingTable
              banks={banks}
              // onDeleteBank={handleDeleteBank}
              // onEditBank={handleEditBank}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedCountry={selectedCountry}
              onCountryChange={setSelectedCountry}
              countries={uniqueCountries}
            />
          </div>
        </div>

        <BankForm
          isOpen={isFormOpen}
          onClose={handleCloseForm}
          onSave={handleSaveBank}
          editingBank={editingBank}
        />
      </div>
    </div>
  );
};

export default BankingManagementPage;
