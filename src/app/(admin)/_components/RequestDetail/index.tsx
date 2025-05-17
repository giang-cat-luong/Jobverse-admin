"use client";
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
import useNotification from "@/hooks/useNotification";
import { FreelancerApplication } from "@/types/admin";
import { ArrowLeft, Check, ExternalLink, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface FreelancerDetailProps {
  freelancer: FreelancerApplication;
}

export function FreelancerDetail({ freelancer }: FreelancerDetailProps) {
  const route = useRouter();
  const { success_message } = useNotification();
  const [application, setApplication] =
    useState<FreelancerApplication>(freelancer);

  const handleApprove = () => {
    setApplication({ ...application, application_status: "approved" });
    success_message(
      null,
      null,
      `Freelancer application #${application.id} has been approved.`
    );
  };

  const handleReject = () => {
    setApplication({ ...application, application_status: "rejected" });
    success_message(
      null,
      null,
      `Freelancer application #${application.id} has been rejected.`
    );
  };

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-green-100 text-green-800">Verified</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge className="bg-amber-100 text-amber-800">Pending</Badge>;
    }
  };

  const getApplicationStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge className="bg-blue-100 text-blue-800">Pending</Badge>;
    }
  };

  const handleVerifyPayment = () => {
    setApplication({ ...application, payment_status: "verified" });
    success_message(
      null,
      null,
      `Payment for freelancer application #${application.id} has been verified.`
    );
  };

  const handleRejectPayment = () => {
    setApplication({ ...application, payment_status: "rejected" });
    success_message(
      null,
      null,
      `Payment for freelancer application #${application.id} has been rejected.`
    );
  };

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
          {application.application_status === "pending" && (
            <>
              <Button
                variant="outline"
                className="border-red-200 bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800"
                onClick={handleReject}
              >
                <X className="h-4 w-4 mr-2" />
                Reject Application
              </Button>
              <Button
                className="bg-third hover:bg-primary text-white"
                onClick={handleApprove}
              >
                <Check className="h-4 w-4 mr-2" />
                Approve Application
              </Button>
            </>
          )}
          {application.application_status !== "pending" && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Application Status:</span>
              {getApplicationStatusBadge(application.application_status)}
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
                <img
                  src={application.avatar_url}
                  alt={application.display_name}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold">{`${application.title} ${application.name} ${application.surname}`}</h3>
              <p className="text-gray-500">@{application.username}</p>
              <p className="text-sm mt-1">{application.email}</p>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-gray-500">Display Name:</div>
              <div>{application.display_name}</div>

              <div className="text-gray-500">Freelancer Type:</div>
              <div>{application.freelancer_type}</div>

              <div className="text-gray-500">Country:</div>
              <div>{application.country}</div>

              <div className="text-gray-500">Birth Date:</div>
              <div>{new Date(application.birth_date).toLocaleDateString()}</div>

              <div className="text-gray-500">Sources:</div>
              <div className="flex flex-wrap gap-1">
                {application.sourceTypes.map((source) => (
                  <Badge key={source} variant="outline" className="text-xs">
                    {source}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium mb-2">Bio</h4>
              <p className="text-sm">{application.bio}</p>
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
                    <p>{application.address_details}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Province
                    </h4>
                    <p>{application.province}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Subdistrict/District
                    </h4>
                    <p>{application.subdistrict_or_district}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      District/Subdistrict
                    </h4>
                    <p>{application.district_or_subdistrict}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      ZIP Code
                    </h4>
                    <p>{application.zip_code}</p>
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
                    <p>{application.card_number}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Address Details
                    </h4>
                    <p>{application.card_address_details}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Subdistrict/District
                    </h4>
                    <p>{application.card_subdistrict_or_district}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      District/Subdistrict
                    </h4>
                    <p>{application.card_district_or_subdistrict}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Province
                    </h4>
                    <p>{application.card_province}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      ZIP Code
                    </h4>
                    <p>{application.card_zip_code}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      Front Card
                    </h4>
                    <div className="border rounded-md overflow-hidden">
                      <a
                        href={application.front_card}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block relative"
                      >
                        <img
                          src={application.front_card}
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
                        href={application.back_card}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block relative"
                      >
                        <img
                          src={application.back_card}
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
                    {getPaymentStatusBadge(application.payment_status)}
                  </div>
                </div>

                {application.payment_status === "pending" && (
                  <div className="bg-amber-50 p-4 rounded-md">
                    <p className="text-amber-800 mb-3">
                      This freelancer should have paid a 10 bath registration
                      fee. Please verify the payment before approving the
                      application.
                    </p>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        className="border-red-200 bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800"
                        onClick={handleRejectPayment}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Payment Not Found
                      </Button>
                      <Button
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={handleVerifyPayment}
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Verify Payment
                      </Button>
                    </div>
                  </div>
                )}

                {application.payment_status === "verified" && (
                  <div className="bg-green-50 p-4 rounded-md">
                    <p className="text-green-800">
                      Payment of 10 bath has been verified. You may proceed with
                      the application approval.
                    </p>
                  </div>
                )}

                {application.payment_status === "rejected" && (
                  <div className="bg-red-50 p-4 rounded-md">
                    <p className="text-red-800">
                      Payment verification failed. The freelancer needs to
                      complete the payment before the application can be
                      approved.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
