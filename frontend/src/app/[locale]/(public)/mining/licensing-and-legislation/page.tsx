import React from 'react'
import Image from "next/image";
import { CheckCircle, FileText, Shield, Scale } from 'lucide-react';
import { Card } from '@/components/ui/card';

const legislationData = [
    {
        title: "Mining Licensing Framework",
        heading: "Structured regulatory framework for transparent and efficient mineral resource governance.",
        description: "Ethiopia has established a comprehensive legal framework for mining operations, designed to attract investment while ensuring environmental protection and community benefits. The licensing system categorizes permits based on mineral type, scale of operation, and investment size. All licenses require compliance with environmental impact assessments, community development plans, and periodic reporting.",
        image: "/home-1.jpg",
        features: [
            "Clear licensing procedures and timelines",
            "Online application and tracking system",
            "Transparent fee structure",
            "Technical and financial capability requirements",
            "Environmental compliance standards"
        ]
    },
]

const licenseTypes = [
    {
        icon: <FileText className="w-6 h-6" />,
        title: "Exploration License",
        duration: "2-3 years",
        description: "For geological surveys and mineral discovery activities",
        requirements: ["Technical team", "Work program", "Financial capability"]
    },
    {
        icon: <Shield className="w-6 h-6" />,
        title: "Mining License",
        duration: "15-25 years",
        description: "For commercial extraction and processing operations",
        requirements: ["Feasibility study", "Environmental plan", "Community agreement"]
    },
    {
        icon: <Scale className="w-6 h-6" />,
        title: "Artisanal License",
        duration: "1-5 years",
        description: "For small-scale traditional mining operations",
        requirements: ["Local registration", "Safety training", "Environmental commitment"]
    }
]

const keyLaws = [
    {
        title: "Mining Operations Proclamation",
        year: "2020",
        description: "Governing framework for all mining activities and licensing procedures"
    },
    {
        title: "Environmental Impact Assessment",
        year: "2021",
        description: "Mandatory assessment requirements for all mining operations"
    },
    {
        title: "Revenue Sharing Regulation",
        year: "2019",
        description: "Framework for revenue distribution between government and communities"
    }
]

const LicensingAndLegislationPage = () => {
    return (
        <div className='w-7xl mx-auto'>
            {/* Header Section */}
            <div className='mb-10 text-center'>
                <h1 className='text-4xl font-bold text-gray-900 mb-4'>
                    Licensing & Legislation
                </h1>
                <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
                    Transparent regulatory framework governing Ethiopia's mining sector with investor-friendly policies
                </p>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
                {/* Left Column - Main Content */}
                <div className='lg:col-span-7 space-y-8'>
                    {/* Featured Content Card */}
                    <div className='bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200'>
                        <div className='relative h-64 w-full'>
                            <Image
                                src={legislationData[0].image}
                                alt={legislationData[0].title}
                                fill
                                className='object-cover'
                                priority={true}
                            />
                            <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
                            <div className='absolute bottom-6 left-6'>
                                <h2 className='text-2xl font-bold text-white'>
                                    {legislationData[0].title}
                                </h2>
                            </div>
                        </div>
                        <div className='p-6'>
                            <p className='text-lg text-gray-700 mb-6'>
                                {legislationData[0].heading}
                            </p>
                            <p className='text-gray-600 mb-6'>
                                {legislationData[0].description}
                            </p>
                            <div className='space-y-3'>
                                {legislationData[0].features.map((feature, index) => (
                                    <div key={index} className='flex items-center gap-3'>
                                        <CheckCircle className='w-5 h-5 text-green-600 flex-shrink-0' />
                                        <span className='text-gray-700'>{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* License Types Grid */}
                    <div>
                        <h3 className='text-2xl font-bold text-gray-900 mb-6'>
                            License Categories
                        </h3>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                            {licenseTypes.map((license, index) => (
                                <div
                                    key={index}
                                    className='bg-white p-5 shadow-xl rounded-xl border border-gray-200 hover:border-blue-500 transition-colors shadow-sm'
                                >
                                    <div className='mb-2 flex space-x-2 text-blue-600'>
                                        {license.icon}
                                        <h4 className='font-bold text-lg text-gray-900'>
                                            {license.title}
                                        </h4>
                                    </div>

                                    <div className='inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-3'>
                                        Duration: {license.duration}
                                    </div>
                                    <p className='text-gray-600 mb-4'>
                                        {license.description}
                                    </p>
                                    <div className='space-y-2'>
                                        <p className='text-sm font-medium text-gray-700'>
                                            Key Requirements:
                                        </p>
                                        {license.requirements.map((req, idx) => (
                                            <div key={idx} className='flex items-center gap-2'>
                                                <div className='w-1.5 h-1.5 bg-blue-500 rounded-full'></div>
                                                <span className='text-sm text-gray-600'>{req}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column - Sidebar Content */}
                <div className='lg:col-span-5 space-y-8'>
                    {/* Key Legislation Panel */}
                    <div className='shadow-xl bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100'>
                        <h3 className='text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2'>
                            <Scale className='w-6 h-6' />
                            Key Legislation
                        </h3>
                        <div className='space-y-4'>
                            {keyLaws.map((law, index) => (
                                <div
                                    key={index}
                                    className='bg-white p-4 rounded-lg border border-blue-100 hover:border-blue-300 transition-colors'
                                >
                                    <div className='flex justify-between items-start mb-2'>
                                        <h4 className='font-semibold text-gray-900'>
                                            {law.title}
                                        </h4>
                                        <span className='px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded-full'>
                                            {law.year}
                                        </span>
                                    </div>
                                    <p className='text-gray-600 text-sm'>
                                        {law.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Regulatory Principles */}
                    <div className='shadow-xl bg-white rounded-xl border border-gray-200 p-6 shadow-sm'>
                        <h3 className='text-2xl font-bold text-gray-900 mb-6'>
                            Regulatory Principles
                        </h3>
                        <div className='space-y-4'>
                            {[
                                {
                                    title: "Transparency",
                                    desc: "All licensing procedures and decisions are publicly accessible"
                                },
                                {
                                    title: "Fairness",
                                    desc: "Equal opportunity for all qualified applicants"
                                },
                                {
                                    title: "Sustainability",
                                    desc: "Environmental protection and community development integrated"
                                },
                                {
                                    title: "Efficiency",
                                    desc: "Streamlined processes with clear timelines"
                                }
                            ].map((principle, index) => (
                                <div key={index} className='pb-4 border-b border-gray-100 last:border-0 last:pb-0'>
                                    <div className='flex items-center gap-3 mb-2'>
                                        <div className='w-3 h-3 bg-blue-500 rounded-full'></div>
                                        <h4 className='font-semibold text-gray-900'>{principle.title}</h4>
                                    </div>
                                    <p className='text-gray-600 text-sm ml-6'>{principle.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LicensingAndLegislationPage