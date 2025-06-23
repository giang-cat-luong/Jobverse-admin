"use client";

import { API_ROUTES } from "@/api/endpoints";
import { Button } from "@/components/ui/button";
import {
  usePrivateFetchParams,
  usePrivatePostParams,
  usePrivatePutParams,
  usePrivateDeleteParams,
} from "@/hooks/api-hooks";
import { useDebounce } from "@/hooks/useDebounce";
import useNotification from "@/hooks/useNotification";
import { Bank, BankingData } from "@/types/bank";
import { Plus } from "lucide-react";
import { useState } from "react";
import { BankForm } from "./_components/BankForm";
import { BankingTable } from "./_components/BankingTable";
import { CountryStats } from "./_components/CountryStats";
import { CSVImport } from "./_components/CSVImport";
import { Pagination } from "@/components/Pagination"; // Đường dẫn tùy vị trí của bạn
import Loading from "@/components/Loading";

function buildQueryURL(base: string, params: Record<string, string>): string {
  const query = new URLSearchParams(params).toString();
  return `${base}?${query}`;
}

const BankingManagementPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBank, setEditingBank] = useState<Bank | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const debouncedSearchTerm = useDebounce(searchTerm.trim(), 400);
  const { success_message, error_message } = useNotification();

  const queryParams: Record<string, string> = {
    page: String(currentPage),
    page_size: String(pageSize),
  };

  if (debouncedSearchTerm) queryParams.name = debouncedSearchTerm;
  if (selectedCountry !== "all") queryParams.country = selectedCountry;

  const queryUrl = buildQueryURL(API_ROUTES.bank.search_bank, queryParams);
  const { data,isLoading, mutate } = usePrivateFetchParams<BankingData>(queryUrl);
  const banks: Bank[] = data?.banks || [];
  const totalPages = data?.total_pages || 1;

  const uniqueCountries = Array.from(
    new Set(banks.map((bank) => bank.country))
  ).filter(Boolean);

  const { trigger: addBank, isMutating: isAddMutating } =
    usePrivatePostParams();
  const { trigger: updateBank, isMutating: isUpdateMutating } =
    usePrivatePutParams();
  const { trigger: deleteBank } =
    usePrivateDeleteParams();

  const handleEditBank = (bank: Bank) => {
    setEditingBank(bank);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setEditingBank(null);
    setIsFormOpen(false);
  };

  const handleSaveBank = async (data: Omit<Bank, "id">) => {
    try {
      if (editingBank) {
        await updateBank({
          url: `${API_ROUTES.bank.update_bank}/${editingBank.id}`,
          data,
        });
        success_message(null, null, "Bank updated successfully");
      } else {
        await addBank({
          url: API_ROUTES.bank.add_bank,
          data,
        });
        success_message(null, null, "Bank added successfully");
      }
      mutate();
      handleCloseForm();
    } catch (err) {
      error_message(
        null,
        null,
        editingBank ? "Failed to update bank" : "Failed to add bank"
      );
    }
  };

  const handleDeleteBank = async (bankId: string) => {
    try {
      await deleteBank({
        url: `${API_ROUTES.bank.delete_bank}/${bankId}`,
        data: {},
      });
      success_message(null, null, "Bank deleted successfully");
      mutate();
    } catch (err) {
      error_message(null, null, "Failed to delete bank");
    }
  };

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
              onDeleteBank={handleDeleteBank}
              onEditBank={handleEditBank}
              searchTerm={searchTerm}
              onSearchChange={(term) => {
                setCurrentPage(1);
                setSearchTerm(term);
              }}
              selectedCountry={selectedCountry}
              onCountryChange={(country) => {
                setCurrentPage(1);
                setSelectedCountry(country);
              }}
              countries={uniqueCountries}
              isLoading={isLoading}
            />

            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            </div>
          </div>
        </div>

        <BankForm
          isOpen={isFormOpen}
          onClose={handleCloseForm}
          onSave={handleSaveBank}
          editingBank={editingBank}
          isMutating={isAddMutating || isUpdateMutating}
        />
      </div>
    </div>
  );
};

export default BankingManagementPage;
