import React from "react";
import BackgroundPage from "@/components/pages/about-page-components/BackgroundSection";
import LeadershipSection from "@/components/pages/about-page-components/LeadershipSection";
import VisionMissionValues from "@/components/pages/about-page-components/MissionVisionSection";

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
