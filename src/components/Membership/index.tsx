// components/MembershipTable.tsx
"use client";
import { API_ROUTES } from "@/api/endpoints";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePrivateDelete, usePrivatePost, usePrivatePut } from "@/hooks/api-hooks";
import useNotification from "@/hooks/useNotification";
import { MembershipLevel } from "@/types/membership";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import LoadingCircle from "../LoadingCircle";
import { MembershipForm } from "../MembershipForm";

interface MembershipTableProps {
  memberships: MembershipLevel[];
  mutate: () => void;
}

export function MembershipTable({ mutate, memberships }: MembershipTableProps) {
  const { success_message } = useNotification();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentMembership, setCurrentMembership] =
    useState<MembershipLevel | null>(null);

  const { trigger: createNewMembership, isMutating: creating } = usePrivatePost<
    MembershipLevel,
    Omit<MembershipLevel, "id">
  >(API_ROUTES.admin.create_membership);

  const { trigger: updateMembership, isMutating: isUpdating } =
    usePrivatePut<MembershipLevel>(
      currentMembership?.id
        ? `${API_ROUTES.admin.update_membership}/${currentMembership.id}`
        : ""
    );

  const { trigger: deleteMembership, isMutating: isDeleting } =
    usePrivateDelete<null>(
      currentMembership?.id
        ? `${API_ROUTES.admin.delete_membership}/${currentMembership.id}`
        : ""
    );

  const handleAdd = async (data: Omit<MembershipLevel, "id">) => {
    try {
      await createNewMembership({
        ...data,
        max_income: data.max_income || null,
      });
      await mutate();
      success_message(
        null,
        null,
        `${data.level} membership level has been added successfully.`
      );
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error("Add failed:", error);
    }
  };

  const handleEdit = async (data: Omit<MembershipLevel, "id">) => {
    if (!currentMembership?.id) return;
    try {
      await updateMembership({
        ...data,
        max_income: data.max_income || null,
        id: currentMembership.id,
      });
      await mutate();
      success_message(
        null,
        null,
        `${data.level} membership level has been updated successfully.`
      );
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleDelete = async () => {
    if (!currentMembership?.id) return;
    try {
      await deleteMembership();
      await mutate();
      success_message(
        null,
        null,
        `${currentMembership.level} membership level has been removed.`
      );
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const openEditDialog = (membership: MembershipLevel) => {
    setCurrentMembership(membership);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (membership: MembershipLevel) => {
    setCurrentMembership(membership);
    setIsDeleteDialogOpen(true);
  };
  const formatCurrency = (value: string | null) => {
    if (value === null) return "∞";
    const num = parseFloat(value);
    return num.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Membership Levels</h3>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="default" className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              <span>Add Level</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Membership Level</DialogTitle>
            </DialogHeader>
            <MembershipForm
              isEdit={false}
              onSubmit={handleAdd}
              onCancel={() => setIsAddDialogOpen(false)}
              isSubmitting={creating}
            />
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
            {memberships.map((membership, index) => {
              return (
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
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openDeleteDialog(membership)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Membership Level</DialogTitle>
          </DialogHeader>
          {currentMembership && (
            <MembershipForm
              isEdit
              defaultValues={currentMembership}
              onSubmit={handleEdit}
              onCancel={() => setIsEditDialogOpen(false)}
              isSubmitting={isUpdating}
            />
          )}
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
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? <LoadingCircle /> : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
