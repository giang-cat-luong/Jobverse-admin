"use client";
import { useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useClickOutside } from "@/hooks/useClickOutside";

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  maxWidth?: string; // optional, e.g., max-w-md
}

export default function BottomSheet({
  open,
  onClose,
  children,
  maxWidth = "max-w-md",
}: BottomSheetProps) {
  const ref = useClickOutside<HTMLDivElement>(() => onClose());

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-end">
          <motion.div
            ref={ref}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 25,
            }}
            className={`w-full ${maxWidth} bg-white rounded-t-2xl px-6 pt-6 pb-10 shadow-2xl`}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
