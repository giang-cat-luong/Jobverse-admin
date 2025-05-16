"use client";
import { API_ROUTES } from "@/api/endpoints";
import { LanguageFile } from "@/constants/language";
import { usePrivateFetch } from "@/hooks/api-hooks";
import { useGlobalTranslate } from "@/hooks/translation/useGlobalTranslate";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useLogout } from "@/hooks/useLogout";
import { ProfileData } from "@/types/userData";
import { interpolate } from "@/utils/interpolate";
import { faBell, faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import LanguageDropdown from "../LanguageDropDown";
import Loading from "../Loading";

const SellerHeader = () => {
  const {
    data: globalLanguageData,
    isLoading,
    error,
  } = useGlobalTranslate(LanguageFile.GLOBAL);
  const { logout } = useLogout();

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useClickOutside<HTMLDivElement>(() =>
    setIsProfileMenuOpen(false)
  );

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading language data</div>;

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-8 py-4">
        <h1 className="text-xl text-text_primary">Fastwork Admin Dashboard</h1>
        <div className="flex flex-row items-center space-x-4">
          <button className="w-[26px] h-[26px] px-2 hover:bg-gray-100 rounded-full">
            <FontAwesomeIcon
              icon={faBell}
              className="text-[26px] text-third "
            />
          </button>
          <div className="px-2">
            <LanguageDropdown />
          </div>
          <div className="relative" ref={profileMenuRef}>
            <button
              onClick={toggleProfileMenu}
              className="w-8 h-8 bg-black rounded-full overflow-hidden  flex justify-center items-center"
            >
              {/* Avatar image can be added here */}
            </button>

            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden">
                <div className="py-2">
                  <button
                    onClick={logout}
                    className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="w-4 h-4 mr-3 text-gray-500" />
                    <span>{globalLanguageData?.menu_logout}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default SellerHeader;
