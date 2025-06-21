"use client";
import { API_ROUTES } from "@/api/endpoints";
import Error from "@/app/error";
import Loading from "@/components/Loading";
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
import { LandingImage } from "@/constants/images";
import { usePrivateFetchParams, usePrivatePost, usePrivatePut } from "@/hooks/api-hooks";
import useNotification from "@/hooks/useNotification";
import { FreelancerApplication } from "@/types/admin";
import { FreelancerRequest } from "@/types/freelancerRequest";
import { ArrowLeft, Check, ExternalLink, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface FreelancerDetailProps {
  requestId: string;
}

export function FreelancerDetail({ requestId }: FreelancerDetailProps) {
  const route = useRouter();
  const { success_message, error_message } = useNotification();

  const [loadingAction, setLoadingAction] = useState<{
    userId: string;
    type: "approve" | "reject" | null;
  } | null>(null);

  const {
    data: requestData,
    isLoading,
    error,
    mutate,
  } = usePrivateFetchParams<FreelancerRequest>(
    API_ROUTES.apply_freelance.get_freelancer_detail + "/" + requestId
  );

  const { trigger: approveRequest } = usePrivatePost(
    API_ROUTES.apply_freelance.verify_freelancer
  );
  const { trigger: rejectRequest } = usePrivatePost(
    API_ROUTES.apply_freelance.reject_request
  );
  const { trigger: approvePayment } = usePrivatePut(
    API_ROUTES.apply_freelance.approve_payment
  );

  const application = requestData?.user;

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

  const handleReject = async(user_id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLoadingAction({ userId: user_id, type: "reject" });
    try {
      await rejectRequest({ user_id });
      await mutate();
      success_message(null, null, `Reject freelancer #${user_id}`);
    } catch {
      error_message(null, null, `Failed to approve freelancer #${user_id}`);
    } finally {
      setLoadingAction(null);
    }
  };

  const handleApprovePayment = async (user_id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLoadingAction({ userId: user_id, type: "approve" });
    try {
      await approvePayment({ user_id, status: "Valid" });
      await mutate();
      success_message(null, null, `Approved payment #${user_id}`);
    } catch {
      error_message(null, null, `Failed to approve payment #${user_id}`);
    } finally {
      setLoadingAction(null);
    }
  };

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "Valid":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            Verified
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

  const handleVerifyPayment = () => {
    success_message(
      null,
      null,
      `Payment for freelancer application #${requestData?.user_id} has been verified.`
    );
  };

  const handleRejectPayment = () => {
    success_message(
      null,
      null,
      `Payment for freelancer application #${requestData?.user_id} has been rejected.`
    );
  };

  if (isLoading || !application) return <Loading />;
  if (error) return <Error />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => route.push("/freelance-request")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Applications
        </Button>

        <div className="flex items-center gap-2">
          {requestData.is_verified === "Pending" && (
            <>
              <Button
                variant="outline"
                className="border-red-200 bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800"
                onClick={(e) => handleReject(requestData.user_id, e)}
              >
                <X className="h-4 w-4 mr-2" />
                Reject Application
              </Button>
              <Button
                className="bg-third hover:bg-primary text-white"
                onClick={(e) => handleApprove(requestData.user_id, e)}
                disabled={
                  loadingAction?.userId === requestData.user_id &&
                  loadingAction?.type === "approve"
                }
              >
                <Check className="h-4 w-4 mr-2" />
                Approve Application
              </Button>
            </>
          )}
          {requestData.is_verified === "Verified" && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Application Status:</span>
              {getApplicationStatusBadge(requestData.is_verified)}
            </div>
          )}
          {requestData.is_verified === "Rejected" && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Application Status:</span>
              {getApplicationStatusBadge(requestData.is_verified)}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center mb-4">
              <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-admin-light-purple">
                <Image
                  src={LandingImage.avatar}
                  alt={application.user.display_name}
                  width={46}
                  height={40}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold">{`${application.card.title} ${application.card.name} ${application.card.surname}`}</h3>
              <p className="text-gray-500">@{application.user.username}</p>
              <p className="text-sm mt-1">{application.contact.email}</p>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-gray-500">Display Name:</div>
              <div>{application.user.display_name}</div>

              <div className="text-gray-500">Freelancer Type:</div>
              <div>{application.profile.freelancer_type}</div>

              <div className="text-gray-500">Country:</div>
              <div>{application.address.country}</div>

              <div className="text-gray-500">Birth Date:</div>
              <div>
                {new Date(application.user.birth_date).toLocaleDateString()}
              </div>

              <div className="text-gray-500">Sources:</div>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium mb-2">Bio</h4>
              <p className="text-sm">{application.profile.bio}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Application Details</CardTitle>
            <CardDescription>
              Review and verify freelancer's information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Address Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Address Details
                    </h4>
                    <p>{application.address.address_details}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Province
                    </h4>
                    <p>{application.address.province}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Subdistrict/District
                    </h4>
                    <p>{application.address.subdistrict_or_district}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      District/Subdistrict
                    </h4>
                    <p>{application.address.district_or_subdistrict}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      ZIP Code
                    </h4>
                    <p>{application.address.zip_code}</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-semibold">ID Card Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Card Number
                    </h4>
                    <p>{application.card.card_number}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Address Details
                    </h4>
                    <p>{application.card.address_details}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Subdistrict/District
                    </h4>
                    <p>{application.card.subdistrict_or_district}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      District/Subdistrict
                    </h4>
                    <p>{application.card.district_or_subdistrict}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Province
                    </h4>
                    <p>{application.card.province}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      ZIP Code
                    </h4>
                    <p>{application.card.zip_code}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      Front Card
                    </h4>
                    <div className="border rounded-md overflow-hidden">
                      <a
                        href={application.card.front_card}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block relative"
                      >
                        <img
                          src={application.card.front_card}
                          alt="ID Card Front"
                          className="w-full h-40 object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <Button
                            size="sm"
                            variant="secondary"
                            className="h-8 w-8 p-0"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      Back Card
                    </h4>
                    <div className="border rounded-md overflow-hidden">
                      <a
                        href={application.card.back_card}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block relative"
                      >
                        <img
                          src={application.card.back_card}
                          alt="ID Card Back"
                          className="w-full h-40 object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <Button
                            size="sm"
                            variant="secondary"
                            className="h-8 w-8 p-0"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">
                    Payment Verification (10 bath fee)
                  </h3>
                  <div className="flex items-center gap-2">
                    {getPaymentStatusBadge(requestData.payment_status)}
                  </div>
                </div>

                {requestData.payment_status === "Invalid" && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 border-green-200 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800"
                      onClick={(e) =>
                        handleApprovePayment(requestData.user_id, e)
                      }
                      disabled={
                        loadingAction?.userId === requestData.user_id &&
                        loadingAction?.type === "approve"
                      }
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <div className="bg-amber-50 p-4 rounded-md">
                      <p className="text-amber-800 mb-3">
                        This freelancer should have paid a 10 bath registration
                        fee. Please verify the payment before approving the
                        application.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
