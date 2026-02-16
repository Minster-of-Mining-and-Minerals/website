import Image from "next/image";
import React from "react";

const asmData = {
    sidebar: {
        title: "Important Documents:",
        documents: [
            {
                title: "ASM Study Report",
                link: "#",
                color: "bg-teal-900",
            },
            {
                title: "SUMM Interventions ASM_EITI",
                link: "#",
                color: "bg-teal-900",
            },
            {
                title:
                    "Environmental Guidelines for ASM",
                link: "#",
                color: "bg-teal-900",
            },
        ],
    },
    content: [
        {
            type: "heading",
            level: 1,
            text: "Developing the ASM Sector",
        },
        {
            type: "paragraph",
            text: "Ethiopia’s long history of artisanal mining spans three millennia. The gold deposits in Ethiopia’s rivers have been exploited for thousands of years by small scale miners.",
        },
        {
            type: "paragraph",
            text: "Today, artisanal and small scale mining (ASM) happens all around the country and plays an extremely important role in Ethiopia. However, much artisanal mining activity remains informal.",
        },
        {
            type: "heading",
            level: 2,
            text: "Ethiopia’s Artisanal, Special Small-Scale Mining National Strategy",
        },
        {
            type: "paragraph",
            text: "Ethiopia has recently put in place a comprehensive National Strategy. Its primary objective is to formalize the artisanal mining sector and promote responsible, inclusive and productive operations.",
        },
        {
            type: "list",
            items: [
                "Strengthen ASM governance through improved law, regulation, structural management and geosciences data.",
                "Increase efficiency, productivity and competitiveness.",
                "Enhance value addition and maximise earnings.",
                "Foster environmentally and socially responsible ASM practices.",
                "Promote women’s fair participation and indigenous knowledge.",
            ],
        },
        {
            type: "heading",
            level: 2,
            text: "Artisanal Mining Today and in History",
        },
        {
            type: "paragraph",
            text: "The history of artisanal mining in Ethiopia spans three millennia — particularly for gold. Some historians estimate that one of the oldest mines in the world, dating back more than 6,000 years, was located in western Ethiopia.",
        },
        {
            type: "image",
            src: "https://nomadsinn.com/momp/wp-content/uploads/2020/01/Picture61.png",
            alt: "Artisanal Mining Map",
            width: 900,
            height: 600,
        },
        {
            type: "heading",
            level: 2,
            text: "Artisanal mining, employment and the economy",
        },
        {
            type: "list",
            items: [
                "Artisanal mining contributes about 65% of Ethiopia’s foreign exchange earnings.",
                "It directly employs around 1.26 million people.",
                "It is a source of livelihood for a further 7.5 million people.",
                "74% of miners’ livelihoods come from mining.",
            ],
        },
        {
            type: "button",
            text: "Download ASM Study Report",
            link: "#",
        },
    ],
};

const AsmPage = () => {
    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* Sidebar */}
                <div>
                    <h3 className="text-xl font-semibold mb-6">
                        {asmData.sidebar.title}
                    </h3>

                    <div className="space-y-6">
                        {asmData.sidebar.documents.map((doc, index) => (
                            <a
                                key={index}
                                href={doc.link}
                                className={`block ${doc.color} text-white p-6 rounded-lg shadow hover:opacity-90 transition`}
                            >
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">{doc.title}</span>
                                    <span className="text-sm bg-white text-black px-2 py-1 rounded">
                                        PDF
                                    </span>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <div className="space-y-8 lg:col-span-2 w-full text-gray-700 leading-relaxed">
                    {asmData.content.map((item, index) => {
                        if (item.type === "heading") {
                            const Tag = item.level === 1 ? "h1" : "h2";
                            return (
                                <Tag
                                    key={index}
                                    className={
                                        item.level === 1
                                            ? "text-4xl font-bold text-black"
                                            : "text-3xl font-semibold text-black pt-6"
                                    }
                                >
                                    {item.text}
                                </Tag>
                            );
                        }

                        if (item.type === "paragraph") {
                            return <p key={index}>{item.text}</p>;
                        }

                        if (item.type === "list") {
                            return (
                                <ul key={index} className="list-disc pl-6 space-y-2">
                                    {item.items.map((li, i) => (
                                        <li key={i}>{li}</li>
                                    ))}
                                </ul>
                            );
                        }

                        if (item.type === "image") {
                            return (
                                <div key={index} className="my-6">
                                    <img
                                        src={item.src}
                                        alt={item.alt}
                                        width={item.width}
                                        height={item.height}
                                        className="rounded-lg w-full h-auto"
                                    />
                                </div>
                            );
                        }

                        if (item.type === "button") {
                            return (
                                <a
                                    key={index}
                                    href={item.link}
                                    className="inline-block bg-golden-dark text-white px-6 py-2 rounded-lg shadow hover:bg-golden-dark transition"
                                >
                                    {item.text}
                                </a>
                            );
                        }

                        return null;
                    })}
                </div>
            </div>
        </div>
    );
};

export default AsmPage;