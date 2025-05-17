"use client";
import { API_ROUTES } from "@/api/endpoints";
import Error from "@/app/error";
import Loading from "@/components/Loading";
import { MembershipTable } from "@/components/Membership";
import SellerHeader from "@/components/SellerHeader";
import { usePrivateFetch } from "@/hooks/api-hooks";
import { MembershipLevelsResponse } from "@/types/membership";

const Membership = () => {
  const {
    data: membershipList,
    isLoading,
    error,
    mutate
  } = usePrivateFetch<MembershipLevelsResponse>(API_ROUTES.admin.membership);

  if (!membershipList || !membershipList.membership_levels) return <Loading />;
  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <div className="flex-1">
      <SellerHeader />

      <div className="container px-4 sm:px-6 py-4 sm:py-6 mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
          Membership Levels
        </h2>
        <div className="bg-white p-4 rounded-lg shadow">
          <MembershipTable mutate={mutate} memberships={membershipList?.membership_levels} />
        </div>
      </div>
    </div>
  );
};

export default Membership;
