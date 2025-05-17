
"use client";
import { useState } from "react";
import { FreelancerTable } from "@/components/FreelancerTable";
import SellerHeader from "@/components/SellerHeader";
import { mockFreelancerApplications } from "@/lib/mock-data";

const FreelanceRequest = () => {
  const [freelancers] = useState(mockFreelancerApplications);

  return (
    <div className="flex-1">
      <SellerHeader/>
      
      <div className="container px-4 sm:px-6 py-4 sm:py-6 mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Membership Levels</h2>
        <div className="bg-white p-4 rounded-lg shadow">
          <FreelancerTable freelancers={freelancers} />
        </div>
      </div>
    </div>
  );
};

export default FreelanceRequest;
