// components/common/notification-modal.tsx
"use client";

import { useState, useEffect, useRef, RefObject } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import useClickOutside from "@/hooks/use-click-outside";

export type NotificationModalProps = {
  variant: "success" | "error" | "info" | "warning";
  title?: string;
  message: string;
};

export default function NotificationModal({
  variant,
  title,
  message,
}: NotificationModalProps) {
  const [open, setOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const close = () => {
    setOpen(false);
    router.replace(pathname, { scroll: false });
  };

  // Create a ref for the modal container
  const modalRef = useRef<HTMLDivElement>(null);
  // Wire up click‑outside to close the modal
  useClickOutside<HTMLDivElement>(
    modalRef as RefObject<HTMLDivElement>,
    close
  );

  useEffect(() => {
    if (!params.get("success") && !params.get("error")) {
      setOpen(false);
    }
  }, [params]);

  if (!open) return null;

  const colorClass = {
    success: "text-green-600",
    error: "text-red-600",
    info: "text-blue-600",
    warning: "text-yellow-600",
  }[variant];

  const defaultTitle =
    title ??
    (variant === "success"
      ? "Success"
      : variant === "error"
      ? "Error"
      : variant.charAt(0).toUpperCase() + variant.slice(1));

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full"
      >
        <h2 className={`text-xl font-semibold ${colorClass}`}>
          {defaultTitle}
        </h2>
        <p className="mt-4 text-base">{message}</p>
        <button
          onClick={close}
          className="mt-6 px-4 py-2 rounded-2xl shadow-sm hover:shadow-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
}
