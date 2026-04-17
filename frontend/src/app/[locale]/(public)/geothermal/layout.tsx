"use client";

import React from "react";
import { Quote } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import PageHeader from "@/components/pages/home-page-components/PageHeader";
import { Button } from "@/components/ui/button";

const items = [
  {
    label: "About Geothermal",
    slug: "/geothermal",
    description: "Overview of Ethiopia's geothermal energy potential and development"
  },
  {
    label: "Geothermal Mapping",
    slug: "/geothermal/mapping",
    description: "Geothermal resource mapping and surface manifestations"
  },
  {
    label: "Resource Assessment",
    slug: "/geothermal/geothermal-resources",
    description: "Assessment of geothermal reservoirs and energy capacity"
  },
  {
    label: "Geothermal Data & Archives",
    slug: "/geothermal/data",
    description: "Technical reports, maps, and exploration databases"
  },
  {
    label: "Hydrogeology & Thermal Springs",
    slug: "/geothermal/hydrogeology",
    description: "Groundwater studies and thermal spring investigations"
  },
  {
    label: "Geohazards & Risk Studies",
    slug: "/geothermal/geohazards",
    description: "Studies on volcanic activity and geothermal-related risks"
  },
  {
    label: "Research & Publications",
    slug: "/geothermal/research",
    description: "Scientific research and technical geothermal publications"
  },
  {
    label: "Laboratory Services",
    slug: "/geothermal/laboratories",
    description: "Geochemical and geophysical analysis services"
  },
  {
    label: "Training & Capacity Building",
    slug: "/geothermal/training",
    description: "Professional training in geothermal exploration and development"
  },
  {
    label: "Resources",
    slug: "/geothermal/resource",
    description: "Documentation and legal frameworks"
  }
];


export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // remove locale prefix: /en/about -> /about
  const normalizedPathname = pathname.replace(/^\/(en|am)/, "");

  // Find active item for title & breadcrumb
  const activeItem = items.find((item) => item.slug === normalizedPathname);
  const title = activeItem?.label ?? "Overview of Ethiopia's geothermal sector";
  const description = activeItem?.description ?? "Exploring Ethiopia's renewable energy potential";

  return (
    <>
      <PageHeader
        title="Overview of Ethiopia's Geothermal Sector"
        icon={<Quote />}
        description="Exploring Ethiopia's renewable geothermal energy potential"
      />

      <div className="relative">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl z-[999]">
          <div className="pt-5 pb-10 w-full bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden space-y-6 px-7">
            <h1 className="text-2xl font-bold text-golden-dark text-center">More On Geothermal</h1>

            <div className="bg-white flex gap-4 overflow-x-auto whitespace-nowrap px-2 hide-scrollbar">
              {items.map((item) => {
                const active = normalizedPathname === item.slug;
                return (
                  <Button
                    key={item.slug}
                    onClick={() => router.push(item.slug)}
                    className={`p-6 cursor-pointer transition-colors bg-gray-100 border border-gray-200  ${active ? "bg-golden-dark text-white font-semibold border-l-4 border-golden-dark shadow-xl hover:bg-golden" : "text-gray-700 hover:bg-gray-50"
                      }`}
                  >
                    {item.label}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>

        <section className="pt-20 md:pt-28 max-w-7xl mx-auto px-6 py-12">
          <div className="w-full md:pl-8">
            <div className="flex items-start gap-6 mb-8">
              <div>
                <h1 className="text-2xl flex gap-2 flex-col font-serif text-teal-800 leading-tight">
                  {title}
                  <span className="text-golden-dark h-1 w-1/2 bg-teal-800"></span>
                  <p className="text-gray-600 text-lg text-teal-800">{description}</p>
                </h1>
              </div>
            </div>

            <div className="prose max-w-none">{children}</div>
          </div>
        </section>
      </div>
    </>
  );
}