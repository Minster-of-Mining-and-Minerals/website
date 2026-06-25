import type { Metadata } from "next";
import React from "react";
import BackgroundPage from "@/components/pages/about-page-components/BackgroundSection";
import LeadershipSection from "@/components/pages/about-page-components/LeadershipSection";
import VisionMissionValues from "@/components/pages/about-page-components/MissionVisionSection";
import { buildPageMetadata } from "@/lib/seo";
import { PAGE_SEO } from "@/lib/seo-content";

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const seo = PAGE_SEO["/about"];

    return buildPageMetadata({
        title: seo.title,
        description: seo.description,
        path: "/about",
        locale,
    });
}

const AboutPage = () => {
    return (
        <>
            <BackgroundPage />
            <LeadershipSection />
            <VisionMissionValues />
        </>
    );
};

export default AboutPage;
