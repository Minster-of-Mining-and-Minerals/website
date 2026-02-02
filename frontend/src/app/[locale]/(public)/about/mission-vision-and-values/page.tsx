import React from "react";
import { Eye, Target, Award } from "lucide-react";

const VisionMissionValues = () => {
    const coreValues = [
        "Team work",
        "Innovation and creativity",
        "Endurance",
        "Ethics",
        "Quality first",
        "Continuous Learning",
        "Environment & Social Issues First",
        "Fairness and equity",
    ];

    return (
        <div className="w-full md:max-w-6xl mx-auto p-6 bg-gray-50 rounded-xl shadow-sm flex flex-col gap-12">

            {/* Vision Section */}
            <div className="flex flex-col gap-4">
                <h2 className="text-2xl sm:text-2xl font-bold text-golden-dark flex items-center gap-2">
                    <Eye className="w-6 h-6 text-golden-dark" />
                    Vision
                </h2>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed text-justify max-w-4xl">
                    To foresee the well developed Mineral Resources Contribution to the Foreign Currency Earnings increase by 10 fold,
                    and be the Back Bone of the Industry in 2020-2023.
                </p>
            </div>

            {/* Mission Section */}
            <div className="flex flex-col gap-4">
                <h2 className="text-2xl sm:text-2xl font-bold text-golden-dark flex items-center gap-2">
                    <Target className="w-6 h-6 text-golden-dark" />
                    Mission
                </h2>
                <ul className="list-disc pl-6 text-gray-700 text-sm sm:text-base leading-relaxed max-w-4xl space-y-2">
                    <li>Generate, manage and deliver the basic geosciences (mineral and geo-energy) data of the country for society and the business sector.</li>
                    <li>Encourage and attract private investors to engage in the mining sector by creating conducive investment conditions.</li>
                    <li>Issue licenses to private investors engaged in mineral and petroleum operations, and administer contracts according to concession agreements.</li>
                    <li>Develop the mineral and geo-energy resources of Ethiopia in an environmentally friendly manner.</li>
                    <li>Collaborate with stakeholders to regulate the market and products of precious and ornamental minerals produced at the artisanal level.</li>
                    <li>Expand the development of mineral resources to enhance the contribution of foreign currency earnings to national economic growth.</li>
                </ul>
            </div>

            {/* Core Values */}
            <div className="flex flex-col gap-4">
                <h2 className="text-2xl sm:text-2xl font-bold text-golden-dark flex items-center gap-2">
                    <Award className="w-6 h-6 text-golden-dark" />
                    Core Values
                </h2>
                <ul className="list-disc pl-6 text-gray-700 text-sm sm:text-base leading-relaxed max-w-4xl space-y-2">
                    {coreValues.map((value, index) => (
                        <li key={index}>{value}</li>
                    ))}
                </ul>
            </div>

        </div>
    );
};

export default VisionMissionValues;
