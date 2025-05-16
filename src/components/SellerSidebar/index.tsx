"use client";
import { AdminImage } from "@/constants/images";
import {
  faArrowRightToBracket,
  faCalendar,
  faFileContract,
  faIdCard,
  faListCheck
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const SellerSidebar = () => {
  const [isClose, setIsClose] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const sidebarWidth = isClose ? "w-16" : "w-64";

  return (
    <>
      <div className={`hidden md:block ${sidebarWidth}`} aria-hidden="true" />
      <div>
        <div
          className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-40 transition-all duration-200 hidden md:flex flex-col ${sidebarWidth}`}
        >
          <div className="h-[73px] border-b border-gray-200 flex items-center px-4">
            <div
              className={`flex items-center gap-3 min-w-0 overflow-hidden ${
                isClose ? "hidden" : "block"
              }`}
            >
              <div className="relative overflow-hidden flex items-center p-4">
                <Link href="/">
                  <Image
                    src={AdminImage.logo_admin}
                    alt="logo"
                    width={176}
                    height={46}
                  />
                </Link>
              </div>
            </div>
            <button onClick={() => setIsClose(!isClose)} className="ml-1">
              <FontAwesomeIcon
                icon={faArrowRightToBracket}
                className={`text-[18px] text-text_primary transition-transform ${
                  isClose ? "" : "rotate-180"
                }`}
              />
            </button>
          </div>

          <nav className="flex-1">
            {[
              {
                href: "/",
                icon: faFileContract,
                label: "Project overview",
              },
              {
                href: "/catalog-management",
                icon: faListCheck,
                label: "Catalog management",
              },
              {
                href: "/freelance-request",
                icon: faIdCard,
                label: "Freelance request",
              },
              {
                href: "/membership",
                icon: faCalendar,
                label: "Membership",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-3 px-3 py-4 text-base ${
                  isActive(item.href)
                    ? "text-third border-primary bg-secondary"
                    : "text-text_secondary bg-white hover:border-primary hover:bg-secondary hover:text-third"
                } border-l-4 `}
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  className={`text-[16px] ${
                    isActive(item.href)
                      ? "text-third"
                      : "text-text_secondary group-hover:text-third"
                  }`}
                />
                <span
                  className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${
                    isClose ? "hidden" : "block"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-200">
            <div className={`${isClose ? "hidden" : "block"}`}>
              <Link
                href="#"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                Send feedback
              </Link>
              <Link
                href="#"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                Support Center
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerSidebar;
