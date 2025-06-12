"use client";

import { API_ROUTES } from "@/api/endpoints";
import Error from "@/app/error";
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
import { LandingImage } from "@/constants/images";
import { usePrivateFetchParams, usePrivatePost } from "@/hooks/api-hooks";
import useNotification from "@/hooks/useNotification";
import { Job, RequestFreelancer } from "@/types/requestFreelancer";
import { isValidImageUrl } from "@/utils/validImage";
import { Check, Eye, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Loading from "../Loading";

export function JobRequestTable() {
  const router = useRouter();
  const { success_message, error_message } = useNotification();

  const [loadingAction, setLoadingAction] = useState<{
    jobId: string;
    type: "approve" | "reject" | null;
  } | null>(null);

  const { data, isLoading, error, mutate } =
    usePrivateFetchParams<RequestFreelancer>(
      API_ROUTES.apply_freelance.get_all
    );

  const { trigger: approveRequest } = usePrivatePost(
    API_ROUTES.apply_freelance.approve_request
  );
  const { trigger: rejectRequest } = usePrivatePost(
    API_ROUTES.apply_freelance.reject_request
  );

  const handleView = (id: string) => {
    router.push(`/job-request-management/${id}`);
  };

  const handleApprove = async (job_id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLoadingAction({ jobId: job_id, type: "approve" });
    try {
      await approveRequest({ job_id });
      await mutate();
      success_message(null, null, `Approved job #${job_id}`);
    } catch {
      error_message(null, null, `Failed to approve job #${job_id}`);
    } finally {
      setLoadingAction(null);
    }
  };

  const handleReject = async (job_id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLoadingAction({ jobId: job_id, type: "reject" });
    try {
      await rejectRequest({ job_id });
      await mutate();
      success_message(null, null, `Rejected job #${job_id}`);
    } catch {
      error_message(null, null, `Failed to reject job #${job_id}`);
    } finally {
      setLoadingAction(null);
    }
  };

  const getStatusBadge = (status: number) => {
    if (status === 2) {
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
          Approved
        </Badge>
      );
    } else if (status === 3) {
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
          Rejected
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
          Pending
        </Badge>
      );
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  const jobs = data?.data.jobs || [];

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[1200px]">
        <Table className="w-full table-auto">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Freelancer</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job: Job) => (
              <TableRow
                key={job.id}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => handleView(job.id)}
              >
                <TableCell>
                  <Image
                    src={job.images[0].image_url || LandingImage.construction}
                    alt={job.service_type.title}
                    width={150}
                    height={100}
                    className="object-cover max-h-[100px] inline-block mr-2"
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <Image
                        src={
                          isValidImageUrl(job.user.avatar_url)
                            ? job.user.avatar_url
                            : LandingImage.avatar
                        }
                        alt={job.user.display_name}
                        width={500}
                        height={500}
                        className="h-10 w-10 object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{job.user.display_name}</div>
                      <div className="text-sm text-gray-500">
                        @{job.user.username}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{job.service_type.title}</TableCell>
                <TableCell>{getStatusBadge(job.status)}</TableCell>
                <TableCell>
                  {new Date(job.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
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
                      onClick={() => handleView(job.id)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    {job.status === 1 && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 border-green-200 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800"
                          onClick={(e) => handleApprove(job.id, e)}
                          disabled={
                            loadingAction?.jobId === job.id &&
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
                          onClick={(e) => handleReject(job.id, e)}
                          disabled={
                            loadingAction?.jobId === job.id &&
                            loadingAction?.type === "reject"
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
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
