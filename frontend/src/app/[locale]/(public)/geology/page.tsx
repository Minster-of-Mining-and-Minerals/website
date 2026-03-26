import React from "react";
import Image from "next/image";

const geologyData = {
    title: "Geological Institute of Ethiopia",
    heading:
        "Understanding Ethiopia’s geology to support sustainable development.",
    description:
        "The Geological Institute of Ethiopia (GIE) is the national authority responsible for geological research, mapping, and geoscience data generation. It plays a vital role in understanding the country’s geological framework, assessing mineral and groundwater resources, and supporting sustainable development. GIE provides essential scientific information to inform decision-making in mining, infrastructure, water resources, and environmental protection.",
    image: "/eth_geography.png",
};

const GeologyPage = () => {
    return (
        <div className="w-11/12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-7 gap-8 py-16">
            {/* Intro Text */}
            <div className="col-span-2 prose max-w-none flex flex-col gap-4 text-gray-500">
                <p className="text-gray-900">
                    The Geological Institute of Ethiopia (GIE) leads the country in
                    geological research, mapping, and resource assessment. On this page,
                    you can learn more about its role in supporting sustainable
                    development, providing geoscience data, and enabling informed
                    decision-making in mining, water, and infrastructure sectors.
                </p>
                <p>
                    Ethiopia's diverse geology offers a wealth of mineral and water
                    resources. GIE ensures these are studied, mapped, and managed
                    responsibly for the benefit of the nation.
                </p>
            </div>

            {/* Hero Image and Heading */}
            <div className="col-span-3 flex flex-col gap-4">
                <Image
                    src={geologyData.image}
                    alt={geologyData.title}
                    width={1200}
                    height={1200}
                    className="object-cover w-full rounded-2xl shadow-lg"
                    priority
                />
                <p className="text-gray-900 text-lg font-medium">{geologyData.heading}</p>
            </div>

            {/* Core Mandate / Mission */}
            <div className="col-span-2 prose max-w-none flex flex-col gap-4 text-gray-500">
                <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-bold text-golden-dark">• Mandate</h2>
                    <p>
                        Conduct geological research, mapping, and resource assessments to
                        provide reliable geoscience data for national development.
                    </p>
                </div>
                <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-bold text-golden-dark">• Vision</h2>
                    <p>
                        To be a leading geological authority in Africa, providing
                        sustainable solutions for resource management and development.
                    </p>
                </div>
                <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-bold text-golden-dark">• Mission</h2>
                    <p>
                        Support Ethiopia’s development through accurate geological
                        information, research, and capacity building in geosciences.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default GeologyPage;
