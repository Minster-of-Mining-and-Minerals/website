import React from "react";
import Image from "next/image";

const MinisterProfile = () => {
    return (
        <div className="w-full md:max-w-4xl mx-auto md:p-6 md:bg-gray-50 rounded-xl shadow-sm">

            {/* Minister Image */}
            <div className="w-full flex flex-col items-center gap-4 mb-6">
                <Image
                    width={300}
                    height={300}
                    src="/habtamu-tegegn-profile.jpg"
                    alt="H.E. Engineer Habtamu Tegegn"
                    className=" h-auto rounded-xl object-cover shadow-md"
                />
                <div className="flex flex-col items-center gap-1">
                    <h1 className="text-xl md:text-2xl font-bold text-teal-800 text-center ">H.E. Engineer Habtamu Tegegn</h1>
                    <p className="text-gray-500 font-semibold text-lg">Minister of Mines</p>
                </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-4 text-justify">
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    H.E. Engineer Habtamu Tegegn serves as the Minister of Mines of the Federal Democratic Republic of Ethiopia.
                    He is a senior public servant with extensive experience in leadership, governance, and sectoral reform,
                    playing a key role in advancing Ethiopia’s mining sector in alignment with the country’s national development priorities.
                </p>

                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    As Minister of Mines, H.E. Engineer Habtamu Tegegn provides strategic oversight and policy direction for the sustainable development,
                    regulation, and promotion of Ethiopia’s mineral resources. His leadership focuses on strengthening institutional capacity,
                    improving sector governance, attracting responsible investment, and ensuring that the mining sector contributes meaningfully
                    to economic growth, export expansion, and job creation.
                </p>

                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    Under his stewardship, the Ministry of Mines continues to work toward modernizing regulatory frameworks, enhancing transparency,
                    and promoting environmentally and socially responsible mining practices. Particular emphasis is placed on aligning sector growth
                    with national economic goals and international best practices, while safeguarding community interests and environmental sustainability.
                </p>

                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    H.E. Engineer Habtamu Tegegn is committed to building a resilient and competitive mining sector that supports Ethiopia’s long-term development agenda
                    and contributes to inclusive and sustainable economic transformation.
                </p>
            </div>
        </div>
    );
};

export default MinisterProfile;
