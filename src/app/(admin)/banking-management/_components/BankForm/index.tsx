
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Bank, Country } from "@/types/bank";
import useNotification from "@/hooks/useNotification";
import { useEffect } from "react";

const bankFormSchema = z.object({
  country_code: z.string().min(1, "Please select a country"),
  country_name: z.string().min(1, "Country name is required"),
  bank_code: z.string().min(1, "Bank code is required").min(2, "Bank code must be at least 2 characters"),
  bank_name: z.string().min(1, "Bank name is required").min(3, "Bank name must be at least 3 characters"),
});

type BankFormValues = z.infer<typeof bankFormSchema>;

interface BankFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (bank: Omit<Bank, 'id' | 'created_at'>) => void;
  editingBank?: Bank | null;
  countries: Country[];
  existingBanks: Bank[];
}

export function BankForm({ isOpen, onClose, onSave, editingBank, countries, existingBanks }: BankFormProps) {
  const { success_message,error_message } = useNotification();
  
  const form = useForm<BankFormValues>({
    resolver: zodResolver(bankFormSchema),
    defaultValues: {
      country_code: '',
      country_name: '',
      bank_code: '',
      bank_name: ''
    }
  });

  useEffect(() => {
    if (editingBank) {
      form.reset({
        country_code: editingBank.country_code,
        country_name: editingBank.country_name,
        bank_code: editingBank.bank_code,
        bank_name: editingBank.bank_name
      });
    } else {
      form.reset({
        country_code: '',
        country_name: '',
        bank_code: '',
        bank_name: ''
      });
    }
  }, [editingBank, isOpen, form]);

  const handleCountryChange = (countryCode: string) => {
    const country = countries.find(c => c.country_code === countryCode);
    form.setValue('country_code', countryCode);
    form.setValue('country_name', country?.country_name || '');
  };

  const checkDuplicateBank = (data: BankFormValues): boolean => {
    const duplicate = existingBanks.find(bank => 
      bank.country_code === data.country_code && 
      bank.bank_code.toLowerCase() === data.bank_code.toLowerCase() &&
      (!editingBank || bank.id !== editingBank.id)
    );
    return !!duplicate;
  };

  const onSubmit = (data: BankFormValues) => {
    // Check for duplicate bank
    if (checkDuplicateBank(data)) {
      error_message(
        null,
        null,
        `Bank with code "${data.bank_code}" already exists in ${data.country_name}`,
      );
      return;
    }

    // Type assertion is safe here because Zod validation ensures all fields are present and valid
    onSave(data as Omit<Bank, 'id' | 'created_at'>);
    onClose();
    
    success_message(
        null,
        null,
        editingBank ? "Bank updated successfully" : "Bank added successfully",
      );
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {editingBank ? "Edit Bank" : "Add New Bank"}
          </DialogTitle>
          <DialogDescription>
            {editingBank ? "Update bank information" : "Add a new bank to the system"}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="country_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <Select value={field.value} onValueChange={handleCountryChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.country_code} value={country.country_code}>
                          {country.country_code} - {country.country_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bank_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank Code</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g. VCB, SCB..." 
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bank_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g. Vietcombank, Siam Commercial Bank..." 
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit">
                {editingBank ? "Update" : "Add"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
