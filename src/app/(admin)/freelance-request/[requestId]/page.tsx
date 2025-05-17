import FreelancerDetailPage from "./requestDetail";

export default async function Page({
  params,
}: {
  params: Promise<{ requestId: string }>;
}) {
  const resolvedParams = await params;

  return <FreelancerDetailPage requestId={resolvedParams.requestId} />;
}
