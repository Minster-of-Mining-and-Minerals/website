import Image from "next/image";
import React from "react";
import {
    FileText,
    Leaf,
    Users,
    Globe,
    TrendingUp,
    ShieldCheck,
    Target,
    Cpu,
    Gem,
    HandIcon
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const asmData = {
    sidebar: {
        title: "Important Documents",
        documents: [
            {
                title: "ASM Study Report",
                link: "#",
                type: "PDF",
            },
            {
                title: "SUMM Interventions on Gender_ASSM_EITI",
                link: "#",
                type: "PDF",
            },
            {
                title: "Environmental Management Guidelines for Artisanal Miners",
                link: "#",
                type: "PDF",
            },
        ],
    },
    objectives: [
        {
            title: "Strengthen Governance",
            description: "Attractive and conducive jurisdiction for investment through law, regulation, structural management, and geosciences data.",
            icon: <ShieldCheck className="w-8 h-8 text-teal-600" />,
        },
        {
            title: "Increase Efficiency",
            description: "Promoting access to capital, technology, and skilled labour to increase productivity and competitiveness.",
            icon: <TrendingUp className="w-8 h-8 text-teal-600" />,
        },
        {
            title: "Enhance Value Addition",
            description: "Ensuring access to local processing facilities and markets, developing supplier and diversified businesses.",
            icon: <Cpu className="w-8 h-8 text-teal-600" />,
        },
        {
            title: "Foster Responsibility",
            description: "Complying with appropriate environmental, community, health and safety standards.",
            icon: <Leaf className="w-8 h-8 text-teal-600" />,
        },
    ],
    stats: [
        { label: "Foreign Exchange Earnings", value: "65%", icon: <Globe className="w-5 h-5" /> },
        { label: "Direct Jobs", value: "1.26M", icon: <Users className="w-5 h-5" /> },
        { label: "Livelihood Support", value: "7.5M", icon: <Users className="w-5 h-5" /> },
        { label: "Income Dependency", value: "74%", icon: <TrendingUp className="w-5 h-5" /> },
    ]
};

const AsmPage = () => {
    return (


        < div className="container max-w-7xl mx-auto px-6 py-16" >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-16">

                    {/* History & Context */}
                    <section className="space-y-6">
                        <div className="flex flex-row items-center gap-3">
                            <div className="p-2 text-teal-600 bg-teal-50 rounded-lg">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                            <div className="text-3xl text-center flex font-bold text-gray-900 tracking-tight">
                                Artisanal Mining Today and in History
                            </div>
                        </div>
                        <div className="prose prose-lg text-gray-600 max-w-none space-y-4">
                            <p>
                                Ethiopia’s long history of artisanal mining spans three millennia. The gold deposits in Ethiopia’s rivers, for example, have been exploited for thousands of years by small scale miners.
                                Some historians have estimated that the oldest mine in the world, dating back more than 6,000 years, was in western Ethiopia near the Sudanese border.
                            </p>
                            <p>
                                Today, artisanal and small scale mining (ASM) happens all around the country and still plays an extremely important role in Ethiopia.
                                Significant reforms are underway to modernize the sector, making it a high priority for Ethiopia’s Homegrown Reform Agenda and the Ministry of Mines and Petroleum (MoMP).
                            </p>
                        </div>
                    </section>

                    {/* Economic Impact Stats */}
                    <section className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                        <h3 className="text-xl font-bold mb-8 text-gray-800 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-teal-600" />
                            Economic & Employment Impact
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {asmData.stats.map((stat, idx) => (
                                <div key={idx} className="space-y-2">
                                    <div className="text-teal-600 mb-1">{stat.icon}</div>
                                    <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                                    <div className="text-sm text-gray-600 leading-snug">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 p-4 bg-golden-dark10 rounded-lg text-sm text-golden-dark border ">
                            <strong>Note:</strong> ASM contributes about 65% of Ethiopia’s foreign exchange earnings and supports the livelihoods of over 7.5 million people.
                        </div>
                    </section>

                    {/* Strategy Objectives */}
                    <section className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-4">National Strategy Objectives</h2>
                            <p className="text-gray-600">The primary objective is to formalize the sector and promote responsible, inclusive and productive operations.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {asmData.objectives.map((obj, idx) => (
                                <Card key={idx} className="border-none shadow-sm bg-white hover:shadow-md transition-shadow group">
                                    <CardContent className="p-6">
                                        <div className="mb-4  duration-300">
                                            {obj.icon}
                                        </div>
                                        <h4 className="text-xl font-bold mb-2 text-gray-900">{obj.title}</h4>
                                        <p className="text-gray-600 text-sm leading-relaxed">{obj.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                        <div className="flex items-start gap-4 p-6 bg-amber-50 rounded-xl border border-amber-100">
                            <Target className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
                            <div>
                                <h4 className="font-bold text-amber-900 mb-1">Cross-cutting Objectives</h4>
                                <p className="text-amber-800 text-sm">
                                    Promoting women’s fair participation and beneficiation in ASM and the utilisation of indigenous knowledge across all strategy objectives.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Market Access & Mining Profile */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-gray-900">Market Access</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Currently, only about 39% of ASM production is marketed through formal channels. The MoMP is actively developing centralized formal market centers close to mining areas to bridge this gap.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-gray-900">Sector Profile</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Artisanal miners tend to be aged 18-45. As surface mining becomes untenable, mining increasingly requires digging or tunnelling, activities currently dominated by men.
                            </p>
                        </div>
                    </section>

                    {/* Gender & Environment */}
                    {/* <section className="space-y-12">
                        <div className="rounded-2xl overflow-hidden text-white flex flex-col md:flex-row">
                            <div className="p-8 md:p-12 space-y-6 flex-1">
                                <Badge className="bg-teal-500 text-white border-none">Gender Equality</Badge>
                                <h3 className="text-3xl font-bold">Prioritising Women in ASM</h3>
                                <p className="text-teal-50/80 leading-relaxed">
                                    Ethiopia has established a Gender Equality Working Group (GEWG) to integrate gender concerns into all relevant policies, ensuring men and women benefit equally from the mining sector.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <div className="bg-white/10 p-3 rounded-lg text-sm backdrop-blur-sm border border-white/20">
                                        Gender Equality Strategy
                                    </div>
                                    <div className="bg-white/10 p-3 rounded-lg text-sm backdrop-blur-sm border border-white/20">
                                        Policy Alignment
                                    </div>
                                </div>
                            </div>
                            <div className="  p-8 md:p-12 flex-1 border-l border-white/10">
                                <Badge className="bg-golden-dark text-white border-none">Sustainability</Badge>
                                <h3 className="text-3xl font-bold mb-6">Environmental Impact</h3>
                                <p className="text-teal-50/80 leading-relaxed mb-6">
                                    The MoMP provides guidelines to lessen the environmental impact, improving management by providing licensing authorities with checks and balances.
                                </p>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-sm">
                                        <div className="w-1.5 h-1.5 rounded-full bg-golden-dark" />
                                        Rehabilitation Measures
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <div className="w-1.5 h-1.5 rounded-full bg-golden-dark" />
                                        Sustainable Mining Practices
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section> */}

                </div>

                {/* Sidebar Area */}
                <div className="space-y-8">

                    {/* Important Documents */}
                    <section className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-teal-700" />
                            {asmData.sidebar.title}
                        </h3>
                        <div className="space-y-4">
                            {asmData.sidebar.documents.map((doc, idx) => (
                                <a
                                    key={idx}
                                    href={doc.link}
                                    className="group block p-4 bg-white rounded-lg border border-gray-200 hover:border-teal-500 hover:shadow-sm transition-all"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="space-y-1">
                                            <p className="text-sm font-semibold text-gray-900 group-hover:text-teal-700 transition-colors">
                                                {doc.title}
                                            </p>
                                            <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                                                <Badge variant="outline" className="text-[10px] px-1.5 py-0 group-hover:border-teal-200 group-hover:text-teal-700">
                                                    {doc.type}
                                                </Badge>
                                                <span>Download</span>
                                            </div>
                                        </div>
                                        <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-teal-50 transition-colors">
                                            <FileText className="w-4 h-4 text-gray-400 group-hover:text-teal-600" />
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </section>

                    {/* Quick Facts Map Mention */}
                    <section className="bg-golden-dark10 rounded-xl p-6 border  relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="font-bold text-teal-900 mb-2">Mining Regions</h3>
                            <p className="text-sm text-teal-800/80 leading-relaxed mb-4">
                                Artisanal mining is concentrated in Ethiopia’s rich Greenstone Belts, producing Gold, Opals, Emeralds, and Tantalum.
                            </p>
                            <img
                                src="https://nomadsinn.com/momp/wp-content/uploads/2020/01/Picture61.png"
                                alt="ASM Mining Map"
                                className="rounded-lg shadow-sm border border-teal-200/50 w-full"
                            />
                        </div>
                        <div className="absolute -right-8 -bottom-8 opacity-10">
                            <Gem className="w-32 h-32 text-teal-900" />
                        </div>
                    </section>

                    {/* Indigenous Knowledge */}
                    <section className="p-6 border border-slate-200 rounded-xl">
                        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <HandIcon className="w-5 h-5 text-amber-600" />
                            Indigenous Knowledge
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Placer gold deposits have been exploited for thousands of years using rudimentary but effective techniques passed down through generations.
                        </p>
                    </section>
                </div>
            </div>
        </div >
    );
};

export default AsmPage;