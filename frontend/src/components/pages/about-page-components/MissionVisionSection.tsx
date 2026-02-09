"use client";
import { Eye, Target, Award } from "lucide-react";
import InfoCard from "./InfoCard";

const missionVision = {
    mission: {
        icon: "/icons/goal.png",
        title: "Mission",
        description:
            "To generate, manage, and deliver geosciences data for society and business in a sustainable and responsible manner that supports the development of mineral resources in Ethiopia.",
    },
    vision: {
        icon: "/icons/witness.png",
        title: "Vision",
        description:
            "To foresee the well developed Mineral Resources Contribution to the Foreign Currency Earnings increase by 10 fold, and be the backbone of the industry.",
    },
};

const coreValues = {
    icon: "/icons/diamond.png",
    title: "Values",
    values: [
        "Teamwork is a fundamental principle of the Ministry of Mines, emphasizing collaboration among departments, stakeholders, and partners to achieve shared goals in the sustainable development and management of Ethiopia’s mineral resources.",
        "Innovation and creativity guide the Ministry in adopting modern technologies, improving regulatory frameworks, and encouraging forward-looking solutions that enhance efficiency, competitiveness, and responsible growth within the mining sector.",
        "Endurance reflects the Ministry’s commitment to long-term planning, resilience, and consistent effort in overcoming sectoral challenges while ensuring stability, continuity, and progress in mineral resource development.",
        "Ethics underpin all activities of the Ministry of Mines, ensuring transparency, accountability, fairness, and integrity in decision-making, licensing, investment facilitation, and engagement with communities and stakeholders.",
    ],
};


export default function VisionMissionValues() {
    return (
        <div className="flex flex-col bg-[#09e32d] p-6">
            <div className="max-w-7xl mx-auto">

                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-golden-dark">
                        Vision, Mission & Core Values
                    </h1>
                    <p className="text-gray-600 mt-3 max-w-3xl mx-auto">
                        Guiding principles that shape the strategic direction and operational
                        excellence of the Ministry of Mines.
                    </p>
                </div>

                {/* TOP: Mission & Vision */}
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 gap-4">
                    <InfoCard icon={missionVision.mission.icon} title="Mission">
                        <p className="text-center">
                            {missionVision.mission.description}
                        </p>
                    </InfoCard>

                    <InfoCard icon={missionVision.vision.icon} title="Vision">
                        <p className="text-center">
                            {missionVision.vision.description}
                        </p>
                    </InfoCard>
                </div>

                {/* BOTTOM: Values (CENTERED & WIDER) */}
                <div className="flex justify-center">
                    <div className="w-full md:max-w-4xl ">
                        <InfoCard
                            icon={coreValues.icon}
                            title={coreValues.title}
                            center
                        >
                            <div className="grid md:grid-cols-12 grid-cols-1">
                                <div className="md:col-span-1 hidden md:block">
                                </div>
                                <ul className="md:col-span-11 col-span-1 grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-20 list-disc pl-6 md:outline-none text-left">
                                    {coreValues.values.map((value, index) => (
                                        <li key={index}>{value}</li>
                                    ))}
                                </ul>
                            </div>
                        </InfoCard>
                    </div>
                </div>
            </div>


        </div>
    );
}
