"use client";

import { API_ROUTES } from "@/api/endpoints";
import Error from "@/app/error";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { usePrivateFetchParams, usePrivatePost } from "@/hooks/api-hooks";
import useNotification from "@/hooks/useNotification";
import { Job } from "@/types/admin";
import {
  ArrowLeft,
  Check,
  Clock,
  Package,
  Star,
  X
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Loading from "../Loading";

type Props = {
  jobId: string;
};
const JobApplicationDetail = ({ jobId }: Props) => {
  const router = useRouter();
  const { success_message, error_message } = useNotification();

  const [loadingAction, setLoadingAction] = useState<{
    jobId: string;
    type: "approve" | "reject" | null;
  } | null>(null);

  const {
    data: job,
    isLoading,
    error,
    mutate,
  } = usePrivateFetchParams<Job>(
    API_ROUTES.apply_freelance.get_job_detail + "/" + jobId
  );

  const { trigger: approveRequest } = usePrivatePost(
    API_ROUTES.apply_freelance.approve_request
  );
  const { trigger: rejectRequest } = usePrivatePost(
    API_ROUTES.apply_freelance.reject_request
  );

  const handleApprove = async (job_id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLoadingAction({ jobId: job_id, type: "approve" });
    try {
      await approveRequest({ job_id });
      await mutate();
      success_message(null, null, `Approved job #${job_id}`);
      window.location.href = "/job-request-management";
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
      window.location.href = "/job-request-management";
    } catch {
      error_message(null, null, `Failed to reject job #${job_id}`);
    } finally {
      setLoadingAction(null);
    }
  };

  const formatPrice = (price: string) => {
    const numPrice = parseFloat(price);
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
    }).format(numPrice);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusBadge = (status: number) => {
    switch (status) {
      case 0:
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">
            Draft
          </Badge>
        );
      case 1:
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
            Pending
          </Badge>
        );
      case 2:
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            Approved
          </Badge>
        );
      default:
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
            Rejected
          </Badge>
        );
    }
  };

  if (!job) {
    return (
      <div className="flex-1">
        <div className="container px-4 sm:px-6 py-4 sm:py-6 mx-auto">
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <div className="flex-1">
      <div className="container px-4 sm:px-6 py-4 sm:py-6 mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => router.push("/job-request-management")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Jobs
          </Button>
          {getStatusBadge(job.status)}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-2xl">{job.title}</CardTitle>
                    <CardDescription>
                      {job.service_catalog.title} • {job.service_type.title}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">
                      {formatPrice(job.packages?.[0]?.price || "0")}

                    </div>
                    <div className="text-sm text-gray-500">Starting from</div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Job Images */}
            <Card>
              <CardHeader>
                <CardTitle>Job Images</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {job.images?.length > 0 ? (
                    job.images.map((image) => (
                      <div key={image.id} className="relative">
                        <img
                          src={image.image_url}
                          alt={image.alt}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        {image.is_cover_photo && (
                          <Badge className="absolute top-2 left-2 bg-blue-100 text-blue-800">
                            Cover
                          </Badge>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No images available.</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Job Description */}
            <Card>
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <p className="whitespace-pre-wrap">{job.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Packages */}
            <Card>
              <CardHeader>
                <CardTitle>Service Packages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {job.packages && job.packages.length > 0 ? (
                    job.packages.map((pkg) => (
                      <div key={pkg.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <Package className="h-4 w-4" />
                            <h4 className="font-semibold">
                              {pkg.package_name}
                            </h4>
                          </div>
                          <div className="text-lg font-bold">
                            {formatPrice(pkg.price)}
                          </div>
                        </div>
                        <p className="text-gray-600 mb-2">{pkg.description}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="h-3 w-3" />
                          {Math.floor(pkg.execution_time / 1440)} days delivery
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No packages available.</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Work Steps */}
            <Card>
              <CardHeader>
                <CardTitle>Work Process</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {job.worksteps && job.worksteps.length > 0 ? (
                    job.worksteps.map((step, index) => (
                      <div key={step.id} className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-semibold">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="whitespace-pre-wrap">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No work steps provided.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Freelancer Info */}
            <Card>
              <CardHeader>
                <CardTitle>Freelancer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4">
                  <img
                    src={job.user.avatar_url}
                    alt={job.user.display_name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{job.user.display_name}</h3>
                    <p className="text-sm text-gray-500">
                      @{job.user.username}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm">{job.rating} (0 reviews)</span>
                    </div>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Bio:</strong>
                  </p>
                  <p className="text-gray-600 whitespace-pre-wrap line-clamp-6">
                    {job.user.bio}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Job Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Job Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Purchase Count:</span>
                  <span className="font-semibold">{job.purchase_count}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Reviews:</span>
                  <span className="font-semibold">{job.reviews_count}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Created:</span>
                  <span className="font-semibold">
                    {formatDate(job.created_at)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Instant Hire:</span>
                  <span className="font-semibold">
                    {job.is_instant_hire ? "Yes" : "No"}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}

            {job.status === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={(e) => handleApprove(job.id, e)}
                    disabled={
                      loadingAction?.jobId === job.id &&
                      loadingAction?.type === "approve"
                    }
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Approve Job
                  </Button>
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={(e) => handleReject(job.id, e)}
                    disabled={
                      loadingAction?.jobId === job.id &&
                      loadingAction?.type === "reject"
                    }
                  >
                    <X className="h-4 w-4 mr-2" />
                    Reject Job
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobApplicationDetail;
