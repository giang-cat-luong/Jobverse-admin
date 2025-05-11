"use client";
import { API_ROUTES } from "@/api/endpoints";
import { ProfileImage } from "@/constants/images";
import { usePrivateFetch } from "@/hooks/api-hooks";
import { ProfileData } from "@/types/userData";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import {
  faCalendar,
  faFileContract,
  faGear,
  faGift,
  faIdCard,
  faListCheck,
  faMoneyBill1Wave,
  faRightFromBracket,
  faUserPen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface SellerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SellerMenu = ({ isOpen, onClose }: SellerMenuProps) => {
  const pathname = usePathname();

  const menuItems = [
    {
      href: "/",
      label: "Overall",
      icon: faFileContract,
      target: "_self",
    },
  ];

  const handleLogout = async () => {
    try {
      localStorage.removeItem("freelancerFormData");
      localStorage.removeItem("freelancerCurrentStep");
      await signOut({
        callbackUrl: "/",
        redirect: true,
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <main style={{visibility:'hidden'}} className={`fixed z-50 ${isOpen ? "visible" : "invisible"}`}>
      <div
        className={`fixed top-[3rem] left-0 min-h-screen w-full sm:w-[560px] bg-white border-t-1 border-gray-500 shadow-xl transform transition-all duration-150 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col relative bg-white">
          <section className="flex gap-3 items-center flex-col pt-8 px-4 pb-1">
            <figure className="w-20 h-20 rounded-full overflow-hidden relative">
              <Image
                src={ProfileImage.avatar}
                alt="avatar"
                width={80}
                height={80}
                className="object-cover"
              />
            </figure>
            <div className="text-[0.875rem] font-semibold text-text_primary">
              Admin
            </div>
          </section>
          <section className="flex flex-col gap-2 p-4">
            <Link href="/" className="flex-1">
              <button className="py-2 w-full cursor-pointer bg-third text-white font-semibold rounded-md border-1 border-border_primary">
                Find freelancer
              </button>
            </Link>
            <Link target="_blank" href="/job-board" className="flex-1">
              <button className="py-2 w-full cursor-pointer bg-white text-third font-semibold rounded-md border-1 border-border_primary">
                Job board
              </button>
            </Link>
          </section>
        </div>
        <ul className="flex flex-col gap-0 mt-3 m-0 p-0 list-none">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li
                key={item.href}
                className={`flex flex-row items-center gap-2 ${
                  isActive
                    ? "bg-secondary text-third border-l-4 border-primary"
                    : "bg-white text-text_secondary"
                } leading-[25px] cursor-pointer`}
              >
                <Link
                  onClick={onClose}
                  target={item.target}
                  href={item.href}
                  className="px-5 py-4 flex-1"
                >
                  <div className="flex flex-row items-center gap-4">
                    <FontAwesomeIcon
                      icon={item.icon}
                      className={`text-[18px] ${
                        isActive ? "text-third" : "text-text_secondary"
                      }`}
                    />
                    <span className="font-sans whitespace-nowrap text-[0.875rem] flex items-center">
                      {item.label}
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
          <hr className="h-[1px] bg-border_secondary w-full inline-block" />
          <li className="flex flex-row items-center gap-2 bg-white text-text_secondary">
            <button onClick={handleLogout} className="px-5 py-4 flex-1">
              <div className="flex flex-row items-center gap-4">
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  className="text-[18px] text-text_secondary"
                />
                <span className="font-sans whitespace-nowrap text-[0.875rem] flex items-center">
                  Sign out
                </span>
              </div>
            </button>
          </li>
        </ul>
      </div>
    </main>
  );
};

export default SellerMenu;
