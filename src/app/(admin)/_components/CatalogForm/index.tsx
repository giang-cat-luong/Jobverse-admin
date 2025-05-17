"use client";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ServiceCatalog } from "@/types/catalog";
import { useState } from "react";

interface CatalogDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (name: string) => void;
  initialValue?: string;
  isEditing?: boolean;
}

export default function CatalogDialog({ open, onOpenChange, onSubmit, initialValue = "", isEditing = false }: CatalogDialogProps) {
  const [catalogName, setCatalogName] = useState(initialValue);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-admin-purple hover:bg-admin-purple/90 text-white">
          <Plus className="h-4 w-4 mr-2" />
          {isEditing ? "Edit Catalog" : "Add New Catalog"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Catalog" : "Add New Catalog"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Update the catalog details below." : "Enter the details for the new catalog."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="name" className="text-sm font-medium">
              Catalog Name
            </label>
            <Input
              id="name"
              value={catalogName}
              onChange={(e) => setCatalogName(e.target.value)}
              placeholder="Enter catalog name"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button
            onClick={() => {
              onSubmit(catalogName);
              setCatalogName("");
            }}
            className="bg-admin-purple hover:bg-admin-purple/90 text-white"
          >
            {isEditing ? "Update Catalog" : "Add Catalog"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
