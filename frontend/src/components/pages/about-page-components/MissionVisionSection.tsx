"use client";
import { useGetStrategiesQuery } from "@/redux/api/strategyApi";
import InfoCard from "./InfoCard";
import { getFileUrl } from "@/utils/fileUrl";

export default function VisionMissionValues() {
    // Fetch strategies and get the first one
    const { data: strategies, isLoading, error } = useGetStrategiesQuery();
    const strategy = strategies?.[0]; // Get the first strategy from index 0

    // Extract sections from the strategy data
    const missionSection = strategy?.sections?.find(s => s.type === "mission");
    const visionSection = strategy?.sections?.find(s => s.type === "vision");
    const coreValuesSection = strategy?.sections?.find(s => s.type === "core_values");

    console.log("missionSection: ", missionSection)

    // Prepare data objects matching the existing structure
    const missionVision = {
        mission: {
            icon: missionSection?.attachment?.file_path
                ? getFileUrl(missionSection.attachment.file_path)
                : "/icons/goal.png",
            title: "Mission",
            description: missionSection?.content || "",
        },
        vision: {
            icon: visionSection?.attachment?.file_path
                ? getFileUrl(visionSection.attachment.file_path)
                : "/icons/witness.png",
            title: "Vision",
            description: visionSection?.content || "",
        },
    };

    const coreValues = {
        icon: coreValuesSection?.attachment?.file_path
            ? getFileUrl(coreValuesSection.attachment.file_path)
            : "/icons/diamond.png",
        title: "Values",
        values: coreValuesSection?.core_values?.map(v => v.content) || [],
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-900"></div>
            </div>
        );
    }

    // Error state
    if (error) {
        console.error("Failed to load strategy data:", error);
        // Still render with default data if there's an error
    }

    return (
        <div className="flex flex-col mt-20 mb-20 p-6">
            <div className="max-w-7xl mx-auto">

                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="text-2xl md:text-4xl font-bold text-teal-900">
                        <span className="text-golden-dark">Vision, Mission </span> & Core Values
                    </h1>
                    <p className="text-gray-600 mt-3 max-w-3xl mx-auto">
                        {strategy?.description || "Guiding principles that shape the strategic direction and operational excellence of the Ministry of Mines."}
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