"use client";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

interface SectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (title: string) => void;
  initialValue?: string;
  isEditing?: boolean;
}

export default function SectionDialog({ open, onOpenChange, onSubmit, initialValue = "", isEditing = false }: SectionDialogProps) {
  const [sectionTitle, setSectionTitle] = useState(initialValue);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          {isEditing ? "Edit Section" : "Add Section"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Section" : "Add New Section"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Update the section details below." : "Enter the details for the new section."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="section-title" className="text-sm font-medium">
              Section Title
            </label>
            <Input
              id="section-title"
              value={sectionTitle}
              onChange={(e) => setSectionTitle(e.target.value)}
              placeholder="Enter section title"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button
            onClick={() => {
              onSubmit(sectionTitle);
              setSectionTitle("");
            }}
            className="bg-admin-purple hover:bg-admin-purple/90 text-white"
          >
            {isEditing ? "Update Section" : "Add Section"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
