import PageHeader from "@/components/common/PageHeader";
import { Landmark } from "lucide-react";
import React from "react";

const BackgroundOfMoMPage = () => {
    return (
        <div className="w-full bg-gray-50">

            {/* Page Header */}
            <PageHeader
                title="Background of MoM"
                icon={<Landmark />}
                description="Historical background, mandate, and institutional structure of the Ministry of Mines"
            />

            {/* Main Content */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-16">

                    {/* Overview */}
                    <div className="flex flex-col gap-6">
                        <h2 className="text-2xl sm:text-3xl font-bold text-golden-dark">
                            Overview
                        </h2>
                        <div className="h-1 w-24 bg-golden-dark rounded-full"></div>

                        <p className="text-gray-700 leading-relaxed text-base sm:text-lg max-w-4xl">
                            The Ministry of Mines and Petroleum was reestablished by Proclamation
                            <span className="font-medium text-golden-dark"> 1097/2018 </span>
                            as a regulatory organ responsible for overseeing the Mines and Petroleum
                            Sector of the country. Its mandate includes granting exploration and
                            mining licenses, regulating sector activities, and ensuring sustainable
                            resource development.
                        </p>
                    </div>

                    {/* Strategic Importance */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <div className="flex flex-col gap-4">
                            <h3 className="text-xl sm:text-2xl font-semibold text-golden-dark">
                                Strategic Importance
                            </h3>
                            <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                                As one of the priority sectors under the country’s homegrown economic
                                reform agenda, the Ministry plays a critical role in attracting private
                                sector investment. It focuses on streamlining bureaucratic and
                                regulatory procedures, updating mining policies, and strengthening
                                institutional capacity.
                            </p>
                            <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                                A key milestone in this effort is the introduction of a
                                <span className="font-medium text-golden-dark">
                                    {" "}digital mining cadaster system
                                </span>, which enhances transparency, efficiency, and investor
                                confidence.
                            </p>
                        </div>

                        <div>
                            <img
                                src="/home-2.jpg"
                                alt="Mining operations"
                                className="rounded-2xl object-cover w-full h-full shadow-md"
                            />
                        </div>
                    </div>

                    {/* Resources & Investment */}
                    <div className="flex flex-col gap-6">
                        <h3 className="text-xl sm:text-2xl font-semibold text-golden-dark">
                            Mineral Resources & Investment Promotion
                        </h3>

                        <p className="text-gray-700 leading-relaxed text-base sm:text-lg max-w-5xl">
                            The Ministry is committed to positioning the country as a preferred
                            destination for international mining and petroleum investors by promoting
                            its rich endowment of strategic minerals. These include gold, gemstones
                            such as opal, emerald, and sapphire, as well as tantalum, lithium,
                            potash, iron ore, and a wide range of industrial, energy, and construction
                            minerals.
                        </p>

                        <p className="text-gray-700 leading-relaxed text-base sm:text-lg max-w-5xl">
                            Through Public–Private Partnership (PPP) initiatives, the Ministry—via its
                            affiliated corporations—is facilitating joint ventures to establish
                            centralized laboratory and drilling service provisions that support
                            exploration and production activities.
                        </p>
                    </div>

                    {/* Institutions */}
                    <div className="flex flex-col gap-6">
                        <h3 className="text-xl sm:text-2xl font-semibold text-golden-dark">
                            Autonomous Institutions
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white rounded-xl p-6 shadow-sm border">
                                <h4 className="font-semibold text-golden-dark text-lg mb-2">
                                    Geological Survey of Ethiopia (GSE)
                                </h4>
                                <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                                    Focuses on strengthening the generation and dissemination of
                                    geoscience data, drilling services, and laboratory analysis to
                                    support mineral and petroleum development.
                                </p>
                            </div>

                            <div className="bg-white rounded-xl p-6 shadow-sm border">
                                <h4 className="font-semibold text-golden-dark text-lg mb-2">
                                    Ethiopian Mineral, Petroleum and Biofuel Corporation (EMPBC)
                                </h4>
                                <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                                    A public enterprise engaged in commercial mining, petroleum, and
                                    biofuel sector activities, contributing to national economic
                                    growth and energy security.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default BackgroundOfMoMPage;
