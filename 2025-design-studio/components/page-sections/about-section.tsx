"use client";

import React from "react";
import { AboutProps } from "@/types/about";
import { useMobileViewport } from "@/hooks/use-mobile-viewport";

export default function AboutSection({
  headline,
  body,
  cta,
}: AboutProps) {
  // true if viewport is narrower than Tailwind's `sm` breakpoint (640px)
  const isMobile = useMobileViewport();

  return (
    <section id="about">
      <h2 className={isMobile ? "text-2xl" : "text-3xl"}>{headline}</h2>
      <p className={isMobile ? "text-base" : "text-lg"}>{body}</p>
      <a
        href="/about"
        className={`inline-block mt-4 ${
          isMobile ? "text-sm" : "text-base"
        } text-green-600 underline`}
      >
        {cta}
      </a>
    </section>
  );
}
