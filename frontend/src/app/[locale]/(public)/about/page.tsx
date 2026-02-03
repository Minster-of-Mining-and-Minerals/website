import React from "react";

const BackgroundOfMoMPage = () => {
    return (
        <div className="w-full md:bg-gray-50 md:p-6">
            <section className="max-w-7xl flex flex-col gap-10">

                {/* Background */}
                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-bold text-golden-dark">
                        Background
                    </h2>

                    <p className="text-gray-700 leading-relaxed text-sm sm:text-base   ">
                        The Ministry of Mines and Petroleum was reestablished by
                        Proclamation <span className="font-medium text-golden-dark">1097/2018</span> as
                        a regulatory organ of the country’s Mines and Petroleum Sector. The Ministry
                        is mandated to oversee sector activities, including the granting of
                        exploration and mining licenses.
                    </p>

                    <p className="text-gray-700 leading-relaxed text-sm sm:text-base   ">
                        As one of the priority sectors under the country’s homegrown economic reform
                        agenda, the Ministry is encouraging private sector investment by streamlining
                        bureaucratic and regulatory procedures, updating policies, and strengthening
                        institutional capacity through the introduction of a digital mining cadaster
                        system.
                    </p>

                    <p className="text-gray-700 leading-relaxed text-sm sm:text-base   ">
                        The Ministry is working to position the country as a priority destination for
                        international mining and petroleum investors by promoting its strategic
                        minerals, including gold, gemstones such as opal, emerald, and sapphire,
                        tantalum, lithium, potash, iron ore, and various industrial, energy, and
                        construction minerals and petroleum.
                    </p>

                    <p className="text-gray-700 leading-relaxed text-sm sm:text-base   ">
                        Through Public–Private Partnership (PPP) modalities, the Ministry—via its
                        corporations—is promoting joint ventures to establish centralized laboratory
                        and drilling service provision.
                    </p>
                </div>

                {/* Institutions */}
                <div className="flex flex-col gap-6">
                    <h3 className="text-xl font-semibold text-golden-dark">
                        Autonomous Institutions
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8  ">
                        <div className="bg-white rounded-xl p-6 shadow-sm border">
                            <h4 className="font-semibold text-golden-dark mb-2">
                                Geological Survey of Ethiopia (GSE)
                            </h4>
                            <p className="text-gray-700 text-sm sm:text-base  leading-relaxed">
                                Responsible for strengthening the generation and dissemination of
                                geoscience data, as well as providing drilling and laboratory analysis
                                services.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm border">
                            <h4 className="font-semibold text-golden-dark mb-2">
                                Ethiopian Mineral, Petroleum and Biofuel Corporation (EMPBC)
                            </h4>
                            <p className="text-gray-700 text-sm sm:text-base  leading-relaxed">
                                A public enterprise engaged in commercial activities within the
                                mining, petroleum, and biofuel sectors.
                            </p>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    );
};

export default BackgroundOfMoMPage;
