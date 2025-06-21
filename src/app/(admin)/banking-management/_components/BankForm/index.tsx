"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/Checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useNotification from "@/hooks/useNotification";
import { Bank } from "@/types/bank";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const bankFormSchema = z.object({
  name: z.string().min(1, "Bank name is required"),
  country: z.string().min(1, "Country is required"),
  is_global: z.boolean().default(false),
});

type BankFormValues = z.infer<typeof bankFormSchema>;

interface BankFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<Bank, "id">) => void;
  editingBank?: Bank | null;
}

export function BankForm({
  isOpen,
  onClose,
  onSave,
  editingBank,
}: BankFormProps) {
  const { success_message, error_message } = useNotification();

  const form = useForm<BankFormValues>({
    resolver: zodResolver(bankFormSchema),
    defaultValues: {
      name: "",
      country: "",
      is_global: false,
    },
  });

  useEffect(() => {
    if (editingBank) {
      form.reset({
        name: editingBank.name,
        country: editingBank.country,
        is_global: editingBank.is_global,
      });
    } else {
      form.reset({
        name: "",
        country: "",
        is_global: false,
      });
    }
  }, [editingBank, isOpen, form]);

  const onSubmit = (data: BankFormValues) => {
    onSave(data);
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
            {editingBank
              ? "Update bank information"
              : "Add a new bank to the system"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Vietcombank" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Vietnam or Thailand" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="is_global"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(val) => field.onChange(!!val)}
                    />
                  </FormControl>
                  <FormLabel className="mb-0">Is Global</FormLabel>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
              >
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
