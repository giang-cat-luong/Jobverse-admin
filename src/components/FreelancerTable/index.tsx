"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FreelancerApplication } from "@/types/admin";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import { Check, X, Eye } from "lucide-react";
import useNotification from "@/hooks/useNotification";

interface FreelancerTableProps {
  freelancers: FreelancerApplication[];
}

export function FreelancerTable({ freelancers }: FreelancerTableProps) {
  const router = useRouter();
  const { success_message } = useNotification();
  const [applications, setApplications] =
    useState<FreelancerApplication[]>(freelancers);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleApprove = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, application_status: "approved" } : app
      )
    );
    success_message(
      null,
      null,
      `Freelancer application #${id} has been approved.`
    );
  };

  const handleReject = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, application_status: "rejected" } : app
      )
    );
    success_message(
      null,
      null,
      `Freelancer application #${id} has been rejected.`
    );
  };

  const handleView = (id: string) => {
    router.push(`/freelancers/${id}`);
  };

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            Verified
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
            Rejected
          </Badge>
        );
      default:
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
            Pending
          </Badge>
        );
    }
  };

  const getApplicationStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
            Rejected
          </Badge>
        );
      default:
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
            Pending
          </Badge>
        );
    }
  };

  return (
    <div className="rounded-md border border-gray-200 bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Freelancer</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Payment Status</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((freelancer) => (
            <TableRow
              key={freelancer.id}
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => handleView(freelancer.id)}
            >
              <TableCell>{freelancer.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full overflow-hidden">
                    <img
                      src={freelancer.avatar_url}
                      alt={freelancer.display_name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium">
                      {`${freelancer.name} ${freelancer.surname}`}
                    </div>
                    <div className="text-sm text-gray-500">
                      @{freelancer.username}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{freelancer.email}</TableCell>
              <TableCell>{freelancer.freelancer_type}</TableCell>
              <TableCell>{formatDate(freelancer.created_at)}</TableCell>
              <TableCell>
                {getPaymentStatusBadge(freelancer.payment_status)}
              </TableCell>
              <TableCell>
                {getApplicationStatusBadge(freelancer.application_status)}
              </TableCell>
              <TableCell>
                <div
                  className="flex items-center gap-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 border-gray-200"
                    onClick={() => handleView(freelancer.id)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  {freelancer.application_status === "pending" && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 border-green-200 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800"
                        onClick={(e) => handleApprove(freelancer.id, e)}
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 border-red-200 bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800"
                        onClick={(e) => handleReject(freelancer.id, e)}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
