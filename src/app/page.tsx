import SellerHeader from "@/components/SellerHeader";
import SellerSidebar from "@/components/SellerSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockFreelancerApplications } from "@/lib/mock-data";
import { Check, FileText, Users, X } from "lucide-react";

export default function Home() {
  const totalApplications = mockFreelancerApplications.length;
  const pendingApplications = mockFreelancerApplications.filter(
    (app) => app.payment_status === "Pending"
  ).length;
  const approvedApplications = mockFreelancerApplications.filter(
    (app) => app.payment_status === "Approved"
  ).length;
  const rejectedApplications = mockFreelancerApplications.filter(
    (app) => app.payment_status === "Rejected"
  ).length;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SellerSidebar />
      <div className="flex-1 transition-all duration-300">
        <div className="min-h-screen flex flex-col">
          <div className="flex-1 space-y-6">
            <SellerHeader />
            <div className="container mx-auto px-6">
              <h2 className="text-2xl font-bold mb-6">Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">
                      Total Applications
                    </CardTitle>
                    <Users className="h-4 w-4 text-admin-purple" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {totalApplications}
                    </div>
                    <p className="text-xs text-gray-500">
                      Freelancer registrations
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">
                      Pending Review
                    </CardTitle>
                    <FileText className="h-4 w-4 text-amber-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {pendingApplications}
                    </div>
                    <p className="text-xs text-gray-500">Awaiting approval</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">
                      Approved
                    </CardTitle>
                    <Check className="h-4 w-4 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {approvedApplications}
                    </div>
                    <p className="text-xs text-gray-500">
                      Approved applications
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">
                      Rejected
                    </CardTitle>
                    <X className="h-4 w-4 text-red-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {rejectedApplications}
                    </div>
                    <p className="text-xs text-gray-500">
                      Rejected applications
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>Recent Applications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockFreelancerApplications
                        .slice(0, 3)
                        .map((freelancer) => (
                          <div
                            key={freelancer.user_id}
                            className="flex items-center space-x-4"
                          >
                            <div className="h-10 w-10 rounded-full overflow-hidden">
                              <img
                                src={freelancer.avatar_url}
                                alt={freelancer.display_name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">
                                {`${freelancer.name} ${freelancer.surname}`}
                              </p>
                              <p className="text-xs text-gray-500 truncate">
                                {freelancer.email}
                              </p>
                            </div>
                            <div>
                              {freelancer.payment_status === "Pending" && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  Pending
                                </span>
                              )}
                              {freelancer.payment_status === "Approved" && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  Approved
                                </span>
                              )}
                              {freelancer.payment_status === "Rejected" && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                  Rejected
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>Payment Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockFreelancerApplications
                        .slice(0, 3)
                        .map((freelancer) => (
                          <div
                            key={freelancer.user_id}
                            className="flex items-center space-x-4"
                          >
                            <div className="h-10 w-10 rounded-full overflow-hidden">
                              <img
                                src={freelancer.avatar_url}
                                alt={freelancer.display_name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">
                                {`${freelancer.name} ${freelancer.surname}`}
                              </p>
                              <p className="text-xs text-gray-500 truncate">
                                Card: {freelancer.card_number.slice(-4)}
                              </p>
                            </div>
                            <div>
                              {freelancer.payment_status === "pending" && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                  Pending
                                </span>
                              )}
                              {freelancer.payment_status === "verified" && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  Verified
                                </span>
                              )}
                              {freelancer.payment_status === "rejected" && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                  Rejected
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
