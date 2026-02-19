"use client";

import React from "react";
import PageHeader from "@/components/pages/home-page-components/PageHeader";
import { Quote } from "lucide-react";




export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {




    return (
        <>
            {/* Hero / Page Header (shared across all administration pages) */}
            <PageHeader
                title="Artisanal and Small Scale Mining"
                icon={<Quote />}
                description="Artisanal and Small Scale Mining"
            />

            <section className="mx-auto">
                {/* RIGHT MAIN CONTENT (route content) */}
                <div className="w-full">
                    {/* Route-specific content renders here */}
                    <div className="prose max-w-none">{children}</div>
                </div>
            </section>
        </>
    );
}