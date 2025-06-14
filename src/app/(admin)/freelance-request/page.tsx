"use client";
import { FreelancerTable } from "@/components/FreelancerTable";
import SellerHeader from "@/components/SellerHeader";

const FreelanceRequest = () => {

  return (
    <div className="flex-1">
      <SellerHeader />

      <div className="container px-4 sm:px-6 py-4 sm:py-6 mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
          All Applications
        </h2>
        <div className="bg-white p-4 rounded-lg shadow overflow-x-auto">
          <FreelancerTable />
        </div>
      </div>
    </div>
  );
};

export default FreelanceRequest;
