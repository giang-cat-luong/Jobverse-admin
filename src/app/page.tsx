"use client";
import { API_ROUTES } from "@/api/endpoints";
import Loading from "@/components/Loading";
import SellerHeader from "@/components/SellerHeader";
import SellerSidebar from "@/components/SellerSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePrivateFetchParams } from "@/hooks/api-hooks";
import { FreelancerApplication } from "@/types/admin";
import { RequestFreelancer } from "@/types/requestFreelancer";
import { Briefcase, FileText, PersonStanding, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { data: freelancerApplications, isLoading: isLoadingFreelancers } =
    usePrivateFetchParams<FreelancerApplication>(
      API_ROUTES.apply_freelance.get_freelancer_list_all
    );

  const { data: jobApplications, isLoading: isLoadingJobs } =
    usePrivateFetchParams<RequestFreelancer>(
      API_ROUTES.apply_freelance.get_job_all
    );

  const freelancers = freelancerApplications?.freelancers || [];
  const jobs = jobApplications?.data.jobs || [];

  const totalFreelancerApplications = freelancers.length;
  const totalJobApplications = jobs.length;

  const pendingFreelancers = freelancers.filter(
    (app) => app.is_verified === "Pending"
  ).length;

  const pendingJobs = jobs.filter((job) => job.status === 1).length;

  const recentFreelancers = freelancers.slice(0, 3);
  const recentJobs = jobs.slice(0, 3);

  if (isLoadingFreelancers || isLoadingJobs) return <Loading />;

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
                      Total Freelancer Applications
                    </CardTitle>
                    <Users className="h-4 w-4 text-admin-purple" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {totalFreelancerApplications}
                    </div>
                    <p className="text-xs text-gray-500">
                      Freelancer registrations
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">
                      Total Job Applications
                    </CardTitle>
                    <FileText className="h-4 w-4 text-amber-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {totalJobApplications}
                    </div>
                    <p className="text-xs text-gray-500">Job registrations</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">
                      Pending Freelancer
                    </CardTitle>
                    <PersonStanding className="h-4 w-4 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {pendingFreelancers}
                    </div>
                    <p className="text-xs text-gray-500">Awaiting approval</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">
                      Pending Job
                    </CardTitle>
                    <Briefcase className="h-4 w-4 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{pendingJobs}</div>
                    <p className="text-xs text-gray-500">Awaiting approval</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="col-span-1">
                  <CardHeader>
                    <div className="flex flex-row justify-between items-center">
                      <CardTitle>Recent Freelancer Applications</CardTitle>
                      <Link href={"/freelance-request"} target="_blank">
                        <p className="text-text_primary underline">See all</p>
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentFreelancers.map((freelancer) => (
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
                              {freelancer.display_name}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {freelancer.email}
                            </p>
                          </div>
                          <div>
                            {freelancer.payment_status === "Invalid" && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                Pending
                              </span>
                            )}
                            {freelancer.payment_status === "Valid" && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Verified
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
                    <div className="flex flex-row justify-between items-center">
                      <CardTitle>Recent Job Applications</CardTitle>
                      <Link href={"/job-request-management"} target="_blank">
                        <p className="text-text_primary underline">See all</p>
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentJobs.map((job) => (
                        <div
                          key={job.id}
                          className="flex items-center space-x-4"
                        >
                          <div className="h-10 w-10 rounded-full overflow-hidden">
                            {job.images && job.images.length > 0 ? (
                              <img
                                src={job.user.avatar_url}
                                alt={job.title}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="h-full w-full bg-gray-300 flex items-center justify-center text-xs text-gray-600">
                                No Image
                              </div>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              {`${job.title}`}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              Price: {job.base_price}
                            </p>
                          </div>
                          <div>
                            {job.status === 1 && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                Pending
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
