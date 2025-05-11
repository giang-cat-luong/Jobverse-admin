"use client";
import Image from "next/image";
import { X } from "lucide-react";
import BottomSheet from "@/components/ui/BottomSheet";
import { useLanguage } from "@/contexts/LanguageContext";
import en from "@/assets/icons/en.svg";
import th from "@/assets/icons/th.svg";
import vn from "@/assets/icons/vn.svg";

const LANGUAGES = {
  th: { code: "th", label: "Thailand", flag: th },
  en: { code: "en", label: "English", flag: en },
  vi: { code: "vi", label: "Vietnam", flag: vn },
};

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function LanguageBottomSheet({ open, onClose }: Props) {
  const { lang: currentLang, setLang } = useLanguage();

  const handleSelectLang = (langCode: string) => {
    if (langCode !== currentLang) {
      setLang(langCode);
      localStorage.setItem("lang", langCode);
    }
    onClose();
  };

  return (
    <BottomSheet open={open} onClose={onClose}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Language</h2>
        <button onClick={onClose}>
          <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
        </button>
      </div>

      <div className="space-y-3">
        {Object.values(LANGUAGES).map((lang) => {
          const isSelected = lang.code === currentLang;
          return (
            <button
              key={lang.code}
              onClick={() => handleSelectLang(lang.code)}
              className={`w-full flex items-center justify-between border rounded-xl px-4 py-3 transition-colors duration-200 ${
                isSelected
                  ? "border-primary bg-blue-50"
                  : "border-gray-200 hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <Image
                  src={lang.flag}
                  alt={lang.label}
                  width={24}
                  height={24}
                  className="rounded-full object-cover"
                />
                <span className="text-sm text-gray-800">{lang.label}</span>
              </div>

              {isSelected && (
                <span className="text-blue-600 text-lg font-bold ml-auto">
                  ✔
                </span>
              )}
            </button>
          );
        })}
      </div>
    </BottomSheet>
  );
}
