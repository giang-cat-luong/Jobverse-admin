"use client";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

interface CategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (name: string) => void;
  initialValue?: string;
  isEditing?: boolean;
}

export default function CategoryDialog({ open, onOpenChange, onSubmit, initialValue = "", isEditing = false }: CategoryDialogProps) {
  const [categoryName, setCategoryName] = useState(initialValue);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Plus className="h-3 w-3 mr-1" />
          {isEditing ? "Edit Category" : "Add Category"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Category" : "Add New Category"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Update the category details below." : "Enter the details for the new category."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="category-name" className="text-sm font-medium">
              Category Name
            </label>
            <Input
              id="category-name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter category name"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button
            onClick={() => {
              onSubmit(categoryName);
              setCategoryName("");
            }}
            className="bg-admin-purple hover:bg-admin-purple/90 text-white"
          >
            {isEditing ? "Update Category" : "Add Category"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
