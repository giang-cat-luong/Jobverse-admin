import JobDetailPage from "./jobDetail";

export default async function Page({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const resolvedParams = await params;

  return <JobDetailPage jobId={resolvedParams.jobId} />;
}
