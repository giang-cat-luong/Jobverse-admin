"use client";
import Loading from "@/components/Loading";
import SellerHeader from "@/components/SellerHeader";
import { AdminImage, LandingImage } from "@/constants/images";
import { LanguageFile } from "@/constants/language";
import { useGlobalTranslate } from "@/hooks/translation/useGlobalTranslate";
import { Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  const {
    data: notFoundLanguageData,
    isLoading,
    error: isError,
  } = useGlobalTranslate(LanguageFile.NOT_FOUND);

  if (isLoading) return <Loading />;
  if (isError) return <div>Error loading language data</div>;
  return (
    <div className="min-h-screen flex flex-col not-found-gradient ">
      <SellerHeader/>

      {/* Hero section */}
      <main className="flex-grow">
        <section className="pb-16 pt-20 px-4 ">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="fade-in">
                <h1 className="text-[32px] md:text-4xl font-medium text-gray-800 mb-4">
                  {notFoundLanguageData?.error_title}
                </h1>
                <p className="text-[#728197] text-[20px] font-sans mb-8">
                  {notFoundLanguageData?.error_description}
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 bg-third text-white px-6 py-3 rounded-md font-medium transition-all hover:bg-fastwork-dark-blue"
                >
                  <Home className="w-5 h-5" />
                  {notFoundLanguageData?.back_button}
                </Link>
              </div>
              <div className="fade-in stagger-1">
                <Image
                  src={LandingImage.construction}
                  alt="construction"
                  className="w-full h-full"
                  width={500}
                  height={500}
                  priority
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>© {new Date().getFullYear()} Fastwork. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
