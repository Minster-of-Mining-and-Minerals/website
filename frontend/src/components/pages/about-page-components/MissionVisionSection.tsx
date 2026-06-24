"use client";
import { useGetStrategiesQuery } from "@/redux/api/strategyApi";
import InfoCard from "./InfoCard";
import { getImageUrl } from "@/utils/fileUrl";
import PublicEmptyState from "@/components/common/PublicEmptyState";
import { Loader2, Target } from "lucide-react";
import { useTranslations } from "next-intl";

const splitTitle = (title = "") => {
    const words = title.trim().split(/\s+/);

    if (words.length === 1) {
        // Single word → split into two halves
        const mid = Math.ceil(words[0].length / 2);
        return [words[0].slice(0, mid), words[0].slice(mid)];
    }

    // Multiple words → split by word count
    const mid = Math.ceil(words.length / 2);
    return [
        words.slice(0, mid).join(" "),
        words.slice(mid).join(" "),
    ];
};

export default function VisionMissionValues() {
    const { data: strategies, isLoading, error } = useGetStrategiesQuery();
    const t = useTranslations("empty_state");
    const strategy = strategies?.[0];

    // Extract sections from the strategy data
    const missionSection = strategy?.sections?.find(s => s.type === "mission");
    const visionSection = strategy?.sections?.find(s => s.type === "vision");
    const coreValuesSection = strategy?.sections?.find(s => s.type === "core_values");

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <Loader2 className="h-10 w-10 animate-spin text-golden-dark" />
            </div>
        );
    }

    if (error || !strategy) {
        return (
            <PublicEmptyState
                title={t("strategy_title")}
                description={error ? t("error_description") : undefined}
                icon={Target}
            />
        );
    }

    const [firstPart, secondPart] = splitTitle(strategy.title || "");
    const missionVision = {
        mission: {
            icon: missionSection?.attachment?.file_path
                ? getImageUrl(missionSection.attachment, "large")
                : "/icons/goal.png",
            title: "Mission",
            description: missionSection?.content || "",
        },
        vision: {
            icon: visionSection?.attachment?.file_path
                ? getImageUrl(visionSection.attachment, "large")
                : "/icons/witness.png",
            title: "Vision",
            description: visionSection?.content || "",
        },
    };

    const coreValues = {
        icon: coreValuesSection?.attachment?.file_path
            ? getImageUrl(coreValuesSection.attachment, "large")
            : "/icons/diamond.png",
        title: "Values",
        values: coreValuesSection?.core_values?.map(v => v.content) || [],
    };

    return (
        <div className="flex flex-col mt-20 mb-20 p-6">
            <div className="max-w-7xl mx-auto">

                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="text-2xl md:text-4xl font-bold text-teal-900">
                        <span className="text-golden-dark">{firstPart} </span>
                        <span className="text-teal-900">{secondPart}</span>
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