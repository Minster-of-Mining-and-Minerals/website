import React from "react";
import BackgroundPage from "@/components/pages/about-page-components/BackgroundSection";
import LeadershipSection from "@/components/pages/about-page-components/LeadershipSection";
import VisionMissionValues from "@/components/pages/about-page-components/MissionVisionSection";
import OrganizationStructure from "@/components/pages/about-page-components/OrganizationStructure";

const AboutPage = () => {
    return (
        <>
            <BackgroundPage />
            <LeadershipSection />
            <VisionMissionValues />
            {/* <OrganizationStructure /> */}
        </>
    );
};

export default AboutPage;
