"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FreelancerApplication } from "@/types/admin";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useNotification from "@/hooks/useNotification";
import { Check, Eye, X } from "lucide-react";
import { API_ROUTES } from "@/api/endpoints";
import { usePrivateFetchParams, usePrivatePost } from "@/hooks/api-hooks";
import Loading from "../Loading";
import Error from "@/app/error";
import Image from "next/image";
import { LandingImage } from "@/constants/images";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pagination } from "@/components/Pagination";
import LoadingMultiCircle from "../LoadingMultiCircle";

function extractRealImageUrl(url: string): string {
  try {
    const u = new URL(url);
    const realUrl = u.searchParams.get("url");
    return realUrl ? decodeURIComponent(realUrl) : url;
  } catch (err) {
    return url;
  }
}

export function FreelancerTable() {
  const router = useRouter();
  const { success_message, error_message } = useNotification();

  const [loadingAction, setLoadingAction] = useState<{
    userId: string;
    type: "approve" | "reject" | null;
  } | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [page, setPage] = useState<number>(1);
  const pageSize = 10;

  const queryParams = new URLSearchParams();
  queryParams.append("page", page.toString());
  queryParams.append("page_size", pageSize.toString());
  if (statusFilter !== "All") queryParams.append("status", statusFilter);

  const apiEndpoint =
    statusFilter === "All"
      ? API_ROUTES.apply_freelance.get_freelancer_list_all
      : API_ROUTES.apply_freelance.get_freelancer_list_status;

  const {
    data: freelancerResponse,
    isLoading,
    error,
    mutate,
  } = usePrivateFetchParams<FreelancerApplication>(
    `${apiEndpoint}?${queryParams.toString()}`
  );

  const applications = freelancerResponse?.freelancers || [];
  const totalPages = freelancerResponse?.total_pages || 1;

  const { trigger: approveRequest } = usePrivatePost(
    API_ROUTES.apply_freelance.verify_freelancer
  );
  const { trigger: rejectRequest } = usePrivatePost(
    API_ROUTES.apply_freelance.reject_request
  );

  const handleApprove = async (user_id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLoadingAction({ userId: user_id, type: "approve" });
    try {
      await approveRequest({ user_id });
      await mutate();
      success_message(null, null, `Approved freelancer #${user_id}`);
    } catch {
      error_message(null, null, `Failed to approve freelancer #${user_id}`);
    } finally {
      setLoadingAction(null);
    }
  };

  const handleReject = async (user_id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLoadingAction({ userId: user_id, type: "reject" });
    try {
      await rejectRequest({ user_id });
      await mutate();
      success_message(null, null, `Rejected freelancer #${user_id}`);
    } catch {
      error_message(null, null, `Failed to reject freelancer #${user_id}`);
    } finally {
      setLoadingAction(null);
    }
  };

  const handleView = (id: string) => {
    router.push(`/freelance-request/${id}`);
  };

  const getPaymentStatusBadge = (status: string) => {
    return status === "Valid" ? (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
        Verified
      </Badge>
    ) : (
      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
        Pending
      </Badge>
    );
  };

  const getApplicationStatusBadge = (status: string) => {
    switch (status) {
      case "Verified":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            Approved
          </Badge>
        );
      case "Rejected":
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

  if (error) return <Error />;

  return (
    <div className="space-y-4">
      {/* Filter */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium">Filter by status:</label>
        <Select
          value={statusFilter}
          onValueChange={(value) => {
            setStatusFilter(value);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Verified">Approved</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <div className="min-w-[1200px]">
          <Table className="w-full table-auto">
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Freelancer</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center text-gray-500 py-6"
                  >
                    <LoadingMultiCircle />
                  </TableCell>
                </TableRow>
              ) : applications.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center text-gray-500 py-6"
                  >
                    There are no freelancers.
                  </TableCell>
                </TableRow>
              ) : (
                applications.map((freelancer, index) => (
                  <TableRow
                    key={freelancer.user_id}
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleView(freelancer.user_id)}
                  >
                    <TableCell>{(page - 1) * pageSize + index + 1}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full overflow-hidden">
                          <Image
                            src={
                              extractRealImageUrl(freelancer.avatar_url) ||
                              LandingImage.avatar
                            }
                            alt={freelancer.display_name}
                            width={40}
                            height={40}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium">
                            {freelancer.display_name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {freelancer.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{freelancer.freelancer_type}</TableCell>
                    <TableCell>
                      {new Date(freelancer.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {getPaymentStatusBadge(freelancer.payment_status)}
                    </TableCell>
                    <TableCell>
                      {getApplicationStatusBadge(freelancer.is_verified)}
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
                          onClick={() => handleView(freelancer.user_id)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        {freelancer.is_verified === "Pending" && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 border-green-200 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800"
                              onClick={(e) =>
                                handleApprove(freelancer.user_id, e)
                              }
                              disabled={
                                loadingAction?.userId === freelancer.user_id &&
                                loadingAction?.type === "approve"
                              }
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 border-red-200 bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800"
                              onClick={(e) =>
                                handleReject(freelancer.user_id, e)
                              }
                            >
                              <X className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination Component */}
      <div className="flex justify-center mt-4">
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>
    </div>
  );
}
