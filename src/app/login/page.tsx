"use client";
import Loading from "@/components/Loading";
import { AuthFormContainer } from "@/components/Login/AuthFormContainer";
import { LoginForm } from "@/components/Login/LoginForm";
import { AdminImage, CategoriesImage } from "@/constants/images";
import { LanguageFile } from "@/constants/language";
import { useGlobalTranslate } from "@/hooks/translation/useGlobalTranslate";
import Image from "next/image";
import { useState } from "react";

type ViewState = "login";

export default function LoginPage() {
  const {
    data: loginLanguageData,
    isLoading,
    error,
  } = useGlobalTranslate(LanguageFile.AUTHEN);

  const [currentView, setCurrentView] = useState<ViewState>("login");

  if (isLoading) return <Loading />;
  if (error) return <div>Error</div>;

  return (
    <div className="min-h-screen bg-[#E3EDFD] grid 2xl:grid-cols-[1fr_1240px_1fr] lg:grid-cols-[1fr_984px_1fr] md:grid-cols-[1fr_768px_1fr] grid-cols-[12px_minmax(0,auto)_12px]">
      <div className="flex justify-center items-center lg:flex-row lg:gap-[3rem] lg:justify-between col-start-2 col-end-3">
        <div className="hidden lg:flex m-auto flex-col gap-[4rem]">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 flex-row items-center">
              <h2 className="text-[2.5rem] text-[hsl(215,15%,20%,0.95)]">
                Quản lý
              </h2>
              <Image
                src={AdminImage.logo_admin}
                alt="logo"
                width={176}
                height={46}
              />
            </div>
            <div className="flex gap-2 flex-row items-center">
              <h2 className="text-[2.5rem] text-[hsl(215,15%,20%,0.95)]">
                Quản lý dự án và freelancer
              </h2>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <Image
              src={CategoriesImage.conceptbanner}
              alt="concept banner"
              className="h-[164px]"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 justify-center items-center py-[4rem] max-w-[500px] w-full h-full ">
          <Image
            src={AdminImage.logo_admin}
            alt="logo"
            width={176}
            height={46}
          />
          {currentView === "login" && (
            <AuthFormContainer title="Đăng nhập">
              <LoginForm />
            </AuthFormContainer>
          )}
        </div>
      </div>
    </div>
  );
}
