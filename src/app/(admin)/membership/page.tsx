
"use client";
import { MembershipTable } from "@/components/Membership";
import SellerHeader from "@/components/SellerHeader";
import { mockMembershipLevels } from "@/lib/mock-data";
import { useState } from "react";

const Membership = () => {
 const [memberships] = useState(mockMembershipLevels);
  return (
     <div className="flex-1">
      <SellerHeader/>
      
      <div className="container px-4 sm:px-6 py-4 sm:py-6 mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Membership Levels</h2>
        <div className="bg-white p-4 rounded-lg shadow">
          <MembershipTable memberships={memberships} />
        </div>
      </div>
    </div>
  );
};

export default Membership;
