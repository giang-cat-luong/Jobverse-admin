"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Check,
  X,
  Clock,
  Star,
  Package,
  MapPin,
} from "lucide-react";
import { Job } from "@/types/admin";
import useNotification from "@/hooks/useNotification";
import { useRouter } from "next/navigation";

type Props = {
  jobId: string;
};
const JobApplicationDetail = ({ jobId }: Props) => {
  const { success_message } = useNotification();
  const router = useRouter();
  // Mock job data - in real app, fetch from API
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    // Mock job data - replace with actual API call
    const mockJob: Job = {
      id: "150d2c66-1c8f-4b27-afaf-4ca5cfb818c7",
      user: {
        username: "luckystation",
        display_name: "luckystation",
        avatar_url:
          "https://fastwork.ibrowe.com/api/v4/image/3df69e7c-713c-4455-b6b7-abbae47e329c.png",
        bio: "กราฟิกดีไซเนอร์ (Freelance Graphic Designer)\n\nมิถุนายน 2564 - ธันวาคม 2566\n\nออกแบบสื่อกราฟิก เช่น โลโก้ แบนเนอร์ และโพสต์โซเชียลมีเดีย สำหรับธุรกิจขนาดเล็กและสตาร์ทอัพ",
        user_id: "697f5642-a6d6-473b-b409-f5e418c02f78",
      },
      service_catalog: {
        id: "2b3060e2-9ff1-465a-8518-9d538975a27d",
        title: "Graphic design",
        second_title: null,
        created_at: "2025-04-12T04:40:01.489433",
        updated_at: "2025-04-12T04:40:01.489433",
        parent_id: null,
        service_topic: null,
        image_url: null,
        is_popular: false,
        slug: "graphic-design",
      },
      service_type: {
        id: "beb41dd6-8c74-4b24-b7cb-5e766d874226",
        title: "Character Design",
        second_title: "Character Design",
        created_at: "2025-04-12T04:40:01.489433",
        updated_at: "2025-04-12T04:40:01.489433",
        parent_id: "2b3060e2-9ff1-465a-8518-9d538975a27d",
        service_topic: "Graphic design",
        image_url: null,
        is_popular: false,
        slug: "character-design",
      },
      slug: "kaebbaebnen-rsamhrabaichngaan-8518dfbe",
      title: "ออกแบบแบนเนอร์สำหรับใช้งาน",
      base_price: "0.00",
      price_before_discount: "0.00",
      show: true,
      rating: "0.00",
      status: 2,
      is_hot: false,
      is_pro: false,
      description:
        "แน่นอนครับ! ด้านล่างคือตัวอย่าง **รายละเอียดงานออกแบบแบนเนอร์** สำหรับโพสต์รับงานฟรีแลนซ์ ที่ดูเป็นมืออาชีพ น่าเชื่อถือ และกระชับ:\n\n---\n\n### 🧑‍🎨 **รับออกแบบแบนเนอร์ทุกประเภท – โดยนักออกแบบฟรีแลนซ์มืออาชีพ!**\n\n✅ ออกแบบแบนเนอร์สำหรับใช้ใน\n\n* โฆษณาออนไลน์ (Facebook, Instagram, LINE OA, Google Ads)\n* เว็บไซต์ / แอปพลิเคชัน\n* งานพิมพ์ (แบนเนอร์ไวนิล, ป้ายร้าน, โปรโมชัน ฯลฯ)\n* YouTube / Cover Page / Slide Presentation\n* งานกราฟิกอื่น ๆ ตามต้องการ",
      is_instant_hire: false,
      purchase_count: 0,
      reviews_count: 0,
      packages: [
        {
          id: "5349408d-dc17-4a57-9a09-7a426ab95fba",
          job_id: "150d2c66-1c8f-4b27-afaf-4ca5cfb818c7",
          description: "ออกแบบใหม่ตามบรีฟ ไม่ใช้เทมเพลตสำเร็จ",
          price: "100000.00",
          sort_order: 0,
          created_at: "2025-06-03T02:57:59.807540",
          updated_at: "2025-06-03T02:57:59.807540",
          package_name: "เริ่มต้น",
          execution_time: 1440,
        },
        {
          id: "33479502-2972-4bb2-82fa-34645474eefb",
          job_id: "150d2c66-1c8f-4b27-afaf-4ca5cfb818c7",
          description: "ออกแบบใหม่ตามบรีฟ ไม่ใช้เทมเพลตสำเร็จ ออกแบบ 3 แบบ",
          price: "1000000.00",
          sort_order: 1,
          created_at: "2025-06-03T02:57:59.807540",
          updated_at: "2025-06-03T02:57:59.807540",
          package_name: "มาตรฐาน",
          execution_time: 2440,
        },
        {
          id: "bbf4d751-6282-4646-9167-9cbbac68ab52",
          job_id: "150d2c66-1c8f-4b27-afaf-4ca5cfb818c7",
          description: "ออกแบบใหม่ตามบรีฟ ไม่ใช้เทมเพลตสำเร็จ ออกแบบไม่จำกัด",
          price: "10000000.00",
          sort_order: 2,
          created_at: "2025-06-03T02:57:59.807540",
          updated_at: "2025-06-03T02:57:59.807540",
          package_name: "มืออาชีพ",
          execution_time: 6440,
        },
      ],
      images: [
        {
          id: "1e2b2933-e216-455f-a55e-1e49e9805bea",
          job_id: "150d2c66-1c8f-4b27-afaf-4ca5cfb818c7",
          image_url:
            "https://fastwork.ibrowe.com/api/v4/image/3c48a56a-813b-4ae8-bb29-3ba27fc36a79.jpeg",
          is_cover_photo: true,
          sort_order: 0,
          alt: "Ảnh bìa",
          created_at: "2025-06-03T02:58:13.212914",
          updated_at: "2025-06-03T02:58:13.212914",
        },
        {
          id: "641db6c4-ffb0-4557-b161-85bb219dfdd4",
          job_id: "150d2c66-1c8f-4b27-afaf-4ca5cfb818c7",
          image_url:
            "https://fastwork.ibrowe.com/api/v4/image/abd41660-b46e-4493-95be-aac9ca670503.webp",
          is_cover_photo: false,
          sort_order: 1,
          alt: "Hình dịch vụ 1",
          created_at: "2025-06-03T02:58:13.212914",
          updated_at: "2025-06-03T02:58:13.212914",
        },
      ],
      worksteps: [
        {
          id: "57a99f8a-bf31-498e-95b4-dd36142fc41e",
          job_id: "150d2c66-1c8f-4b27-afaf-4ca5cfb818c7",
          description:
            "ขั้นตอนที่ 1: วิเคราะห์ความต้องการของลูกค้า\nพูดคุยเพื่อทำความเข้าใจวัตถุประสงค์ของโพสต์ เช่น ขายสินค้า, เพิ่มยอดไลก์, สร้างแบรนด์ ฯลฯ",
          sort_order: 0,
        },
        {
          id: "d06b4c36-f763-4529-b380-295b8bf7c177",
          job_id: "150d2c66-1c8f-4b27-afaf-4ca5cfb818c7",
          description:
            "ขั้นตอนที่ 2: ออกแบบแนวคิดและองค์ประกอบภาพ (Concept Design)\nสร้าง Mood & Tone และแนวทางภาพรวมตามแบรนด์",
          sort_order: 1,
        },
      ],
      onboarding: {
        id: "919554ca-50df-4326-8237-2273d8859e84",
        job_id: "150d2c66-1c8f-4b27-afaf-4ca5cfb818c7",
        step1: true,
        step2: true,
        step3: true,
        step4: true,
        step5: true,
      },
      created_at: "2025-05-08T09:47:31.353210",
      updated_at: "2025-05-08T09:47:31.353210",
      tag_ids: [],
      completion_rate: 0,
      badges: [],
      overall_rating: {
        overall_rating: 0.0,
        average_responsiveness_rating: 0.0,
        average_service_rating: 0.0,
        average_skill_rating: 0.0,
        average_worth_rating: 0.0,
      },
      rehire_orders_count: 0,
      additional_attributes: {
        certificate_badge: false,
        rehire_guarantee_badge: false,
      },
      socials: [],
      websites: [],
      related_jobs: [],
      approval_status: "pending",
    };

    setJob(mockJob);
  }, [jobId]);

  const handleApprove = () => {
    if (job) {
      setJob({ ...job, approval_status: "approved" });
      success_message(null, null, "The job has been approved successfully.");
    }
  };

  const handleReject = () => {
    if (job) {
      setJob({ ...job, approval_status: "rejected" });
      setJob({ ...job, approval_status: "approved" });
      success_message(null, null, "The job has been rejected.");
    }
  };

  const formatPrice = (price: string) => {
    const numPrice = parseFloat(price);
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
    }).format(numPrice);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return (
          <Badge className="bg-amber-100 text-amber-800">Pending Review</Badge>
        );
    }
  };

  if (!job) {
    return (
      <div className="flex-1">
        <div className="container px-4 sm:px-6 py-4 sm:py-6 mx-auto">
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="container px-4 sm:px-6 py-4 sm:py-6 mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => router.push("/job-request-management")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Jobs
          </Button>
          {getStatusBadge(job.approval_status)}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-2xl">{job.title}</CardTitle>
                    <CardDescription>
                      {job.service_catalog.title} • {job.service_type.title}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">
                      {formatPrice(job.packages[0]?.price || "0")}
                    </div>
                    <div className="text-sm text-gray-500">Starting from</div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Job Images */}
            <Card>
              <CardHeader>
                <CardTitle>Job Images</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {job.images.map((image) => (
                    <div key={image.id} className="relative">
                      <img
                        src={image.image_url}
                        alt={image.alt}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      {image.is_cover_photo && (
                        <Badge className="absolute top-2 left-2 bg-blue-100 text-blue-800">
                          Cover
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Job Description */}
            <Card>
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <p className="whitespace-pre-wrap">{job.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Packages */}
            <Card>
              <CardHeader>
                <CardTitle>Service Packages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {job.packages.map((pkg) => (
                    <div key={pkg.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4" />
                          <h4 className="font-semibold">{pkg.package_name}</h4>
                        </div>
                        <div className="text-lg font-bold">
                          {formatPrice(pkg.price)}
                        </div>
                      </div>
                      <p className="text-gray-600 mb-2">{pkg.description}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="h-3 w-3" />
                        {Math.floor(pkg.execution_time / 1440)} days delivery
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Work Steps */}
            <Card>
              <CardHeader>
                <CardTitle>Work Process</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {job.worksteps.map((step, index) => (
                    <div key={step.id} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="whitespace-pre-wrap">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Freelancer Info */}
            <Card>
              <CardHeader>
                <CardTitle>Freelancer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4">
                  <img
                    src={job.user.avatar_url}
                    alt={job.user.display_name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{job.user.display_name}</h3>
                    <p className="text-sm text-gray-500">
                      @{job.user.username}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm">{job.rating} (0 reviews)</span>
                    </div>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Bio:</strong>
                  </p>
                  <p className="text-gray-600 whitespace-pre-wrap line-clamp-6">
                    {job.user.bio}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Job Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Job Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Purchase Count:</span>
                  <span className="font-semibold">{job.purchase_count}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Reviews:</span>
                  <span className="font-semibold">{job.reviews_count}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Created:</span>
                  <span className="font-semibold">
                    {formatDate(job.created_at)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Instant Hire:</span>
                  <span className="font-semibold">
                    {job.is_instant_hire ? "Yes" : "No"}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            {job.approval_status === "pending" && (
              <Card>
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={handleApprove}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Approve Job
                  </Button>
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={handleReject}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Reject Job
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobApplicationDetail;
