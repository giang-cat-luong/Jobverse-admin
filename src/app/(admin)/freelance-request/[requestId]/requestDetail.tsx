import SellerHeader from "@/components/SellerHeader";
import { mockFreelancerApplications } from "@/lib/mock-data";
import { FreelancerDetail } from "../../_components/RequestDetail";

interface Props {
  requestId: string;
}
const FreelancerDetailPage = ({ requestId }: Props) => {
  const freelancer = mockFreelancerApplications.find((f) => f.id === requestId);

  if (!freelancer) {
    return window.location.href = "/freelance-request";
  }

  return (
    <div className="flex-1">
      <SellerHeader />

      <div className="container mx-auto px-6 py-6">
        <FreelancerDetail freelancer={freelancer} />
      </div>
    </div>
  );
};

export default FreelancerDetailPage;
