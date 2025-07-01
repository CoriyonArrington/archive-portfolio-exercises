"use client";

import React from "react";
import { WhyUXProps } from "@/types/why-ux";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function WhyUX({
  headline,
  body,
  cta,
  problems,
  solutions,
}: WhyUXProps) {
  // true if viewport is at least 1024px wide
  const isLarge = useMediaQuery("(min-width: 1024px)");

  return (
    <section id="why-ux">
      <h2>{headline}</h2>
      <p>{body}</p>
      <a href="/ux-education">{cta}</a>

      <div
        className={
          isLarge
            ? "grid grid-cols-2 gap-12 mt-12"
            : "flex flex-col gap-8 mt-12"
        }
      >
        <div>
          <h3 className="text-2xl font-bold mb-6">
            Challenges you might be facing
          </h3>
          <div className="space-y-4">
            {problems.map((item, idx) => (
              <div
                key={idx}
                className="group bg-white border border-gray-200 rounded-lg p-4 flex items-start gap-4"
              >
                <div className="bg-red-500 p-3 rounded-xl">{item.icon}</div>
                <div>
                  <p className="text-base font-medium">{item.title}</p>
                  <p className="text-muted">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-6">
            How I can help you succeed
          </h3>
          <div className="space-y-4">
            {solutions.map((item, idx) => (
              <div
                key={idx}
                className="group bg-white border border-gray-200 rounded-lg p-4 flex items-start gap-4"
              >
                <div className="bg-green-500 p-3 rounded-xl">{item.icon}</div>
                <div>
                  <p className="text-base font-medium">{item.title}</p>
                  <p className="text-muted">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
