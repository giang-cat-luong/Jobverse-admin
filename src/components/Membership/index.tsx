"use client";
import { useState } from "react";
import { MembershipLevel } from "@/types/admin";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Edit, Trash2 } from "lucide-react";
import useNotification from "@/hooks/useNotification";

interface MembershipTableProps {
  memberships: MembershipLevel[];
}

export function MembershipTable({
  memberships: initialMemberships,
}: MembershipTableProps) {
  const { success_message } = useNotification();
  const [memberships, setMemberships] =
    useState<MembershipLevel[]>(initialMemberships);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentMembership, setCurrentMembership] =
    useState<MembershipLevel | null>(null);
  const [formData, setFormData] = useState({
    level: "",
    min_income: "",
    max_income: "",
    service_fee: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      level: "",
      min_income: "",
      max_income: "",
      service_fee: "",
    });
    setCurrentMembership(null);
  };

  const handleAdd = () => {
    const newMembership: MembershipLevel = {
      id: crypto.randomUUID(),
      level: formData.level,
      min_income: formData.min_income,
      max_income: formData.max_income || null,
      service_fee: formData.service_fee,
    };

    setMemberships((prev) => [...prev, newMembership]);
    success_message(
      null,
      null,
      `${newMembership.level} membership level has been added successfully.`
    );
    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleEdit = () => {
    if (!currentMembership) return;

    const updatedMemberships = memberships.map((m) =>
      m.id === currentMembership.id
        ? {
            ...currentMembership,
            level: formData.level,
            min_income: formData.min_income,
            max_income: formData.max_income || null,
            service_fee: formData.service_fee,
          }
        : m
    );

    setMemberships(updatedMemberships);
    success_message(
      null,
      null,
      `${formData.level} membership level has been updated successfully.`
    );
    setIsEditDialogOpen(false);
    resetForm();
  };

  const handleDelete = () => {
    if (!currentMembership) return;

    const updatedMemberships = memberships.filter(
      (m) => m.id !== currentMembership.id
    );
    setMemberships(updatedMemberships);
    success_message(
      null,
      null,
      `${currentMembership.level} membership level has been removed.`
    );
    setIsDeleteDialogOpen(false);
    resetForm();
  };

  const openEditDialog = (membership: MembershipLevel) => {
    setCurrentMembership(membership);
    setFormData({
      level: membership.level,
      min_income: membership.min_income,
      max_income: membership.max_income || "",
      service_fee: membership.service_fee,
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (membership: MembershipLevel) => {
    setCurrentMembership(membership);
    setIsDeleteDialogOpen(true);
  };

  const formatCurrency = (value: string | null) => {
    if (value === null) return "∞";
    return parseFloat(value).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Membership Levels</h3>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              <span>Add Level</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Membership Level</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="level">Level Name</label>
                <Input
                  id="level"
                  name="level"
                  value={formData.level}
                  onChange={handleInputChange}
                  placeholder="e.g. Silver"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="min_income">Minimum Income</label>
                <Input
                  id="min_income"
                  name="min_income"
                  value={formData.min_income}
                  onChange={handleInputChange}
                  placeholder="e.g. 50000.00"
                  type="number"
                  step="0.01"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="max_income">
                  Maximum Income (leave empty for unlimited)
                </label>
                <Input
                  id="max_income"
                  name="max_income"
                  value={formData.max_income}
                  onChange={handleInputChange}
                  placeholder="e.g. 99999.99"
                  type="number"
                  step="0.01"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="service_fee">Service Fee (%)</label>
                <Input
                  id="service_fee"
                  name="service_fee"
                  value={formData.service_fee}
                  onChange={handleInputChange}
                  placeholder="e.g. 14.00"
                  type="number"
                  step="0.01"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAdd}>Add Membership</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-md overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead>Level</TableHead>
              <TableHead>Minimum Income</TableHead>
              <TableHead>Maximum Income</TableHead>
              <TableHead>Service Fee</TableHead>
              <TableHead className="w-[100px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {memberships.map((membership) => (
              <TableRow key={membership.id}>
                <TableCell className="font-medium">
                  {membership.level}
                </TableCell>
                <TableCell>{formatCurrency(membership.min_income)}</TableCell>
                <TableCell>{formatCurrency(membership.max_income)}</TableCell>
                <TableCell>{membership.service_fee}%</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEditDialog(membership)}
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openDeleteDialog(membership)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Membership Level</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="edit-level">Level Name</label>
              <Input
                id="edit-level"
                name="level"
                value={formData.level}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="edit-min_income">Minimum Income</label>
              <Input
                id="edit-min_income"
                name="min_income"
                value={formData.min_income}
                onChange={handleInputChange}
                type="number"
                step="0.01"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="edit-max_income">
                Maximum Income (leave empty for unlimited)
              </label>
              <Input
                id="edit-max_income"
                name="max_income"
                value={formData.max_income}
                onChange={handleInputChange}
                type="number"
                step="0.01"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="edit-service_fee">Service Fee (%)</label>
              <Input
                id="edit-service_fee"
                name="service_fee"
                value={formData.service_fee}
                onChange={handleInputChange}
                type="number"
                step="0.01"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleEdit}>Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to delete the {currentMembership?.level}{" "}
            membership level? This action cannot be undone.
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
