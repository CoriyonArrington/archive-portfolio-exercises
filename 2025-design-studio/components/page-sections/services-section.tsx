// components/page-sections/services-section.tsx
import React from "react";
import Link from "next/link";
import { Service, ServicesSummaryProps } from "@/types/services";

export default function ServicesSection({
  headline,
  body,
  service_list,
  cta,
}: ServicesSummaryProps) {
  return (
    <section className="py-16 max-w-screen-lg mx-auto px-4">
      <h2 className="text-3xl font-semibold mb-4">{headline}</h2>
      <p className="mb-8 text-lg text-gray-700">{body}</p>

      {service_list.length === 0 ? (
        <div className="text-gray-600">No featured services available.</div>
      ) : (
        <ul className="space-y-6">
          {service_list.map((service: Service) => (
            <li key={service.title}>
              <h3 className="text-xl font-bold">{service.title}</h3>
              <p className="mt-1 text-gray-700">{service.description}</p>
            </li>
          ))}
        </ul>
      )}

      <Link
        href="/services"
        className="mt-8 inline-block text-green-500 font-medium hover:underline"
      >
        {cta}
      </Link>
    </section>
  );
}
