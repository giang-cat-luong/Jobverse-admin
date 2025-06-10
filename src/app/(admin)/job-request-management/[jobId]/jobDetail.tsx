import JobApplicationDetail from "@/components/JobApplicationDetail";
import SellerHeader from "@/components/SellerHeader";
import { mockFreelancerApplications } from "@/lib/mock-data";

interface Props {
  jobId: string;
}
const JobDetailPage = ({ jobId }: Props) => {

  return (
    <div className="flex-1">
      <SellerHeader />

      <div className="container mx-auto px-6 py-6">
        <JobApplicationDetail  jobId={jobId}/>
      </div>
    </div>
  );
};

export default JobDetailPage;
