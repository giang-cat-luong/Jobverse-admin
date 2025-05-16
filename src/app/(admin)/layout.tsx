import SellerSidebar from "@/components/SellerSidebar";
import { defaultMetadata } from "@/config/metadata";
import { ReactNode } from "react";

interface StartSellingLayoutProps {
  children: ReactNode;
}

export default function StartSellingLayout({
  children,
}: StartSellingLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SellerSidebar />
      <div className="flex-1 transition-all duration-300">
        <div className="min-h-screen flex flex-col">{children}</div>
      </div>
    </div>
  );
}

export const metadata = {
  ...defaultMetadata,
  title: "Admin Center | Fastwork.co",
  description:
    "ติดตามความคืบหน้าและจัดการงานอย่างมืออาชีพบน Fastwork Admin Center",
  openGraph: {
    ...defaultMetadata.openGraph,
    title: "Admin Center | Fastwork.vn",
    description:
      "ติดตามความคืบหน้าและจัดการงานอย่างมืออาชีพบน Fastwork Admin Center",
  },
};
