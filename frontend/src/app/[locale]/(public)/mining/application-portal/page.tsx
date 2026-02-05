import React from 'react'
import Image from "next/image";
import { FileText, Upload, Clock, Shield, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const applicationData = [
    {
        title: "Mining License Application Portal",
        heading: "Streamlined digital platform for transparent and efficient mining license applications.",
        description: "The Ministry of Mines provides a comprehensive online portal for all mining-related license applications. Our digital system ensures transparency, reduces processing times, and provides real-time tracking of application status. From exploration permits to large-scale mining licenses, all applications are managed through this secure platform.",
        image: "/home-1.jpg",
        benefits: [
            "24/7 online application submission",
            "Real-time application status tracking",
            "Digital document upload and management",
            "Automated fee calculation and payment",
            "Secure and encrypted data handling"
        ]
    },
]

const applicationTypes = [
    {
        icon: <FileText className="w-5 h-5" />,
        title: "Exploration Permit",
        processingTime: "30-45 days",
        fee: "ETB 5,000 - 50,000",
        steps: ["Initial inquiry", "Document submission", "Technical review", "Approval"],
        color: "from-blue-500 to-cyan-500"
    },
    {
        icon: <Shield className="w-5 h-5" />,
        title: "Mining License",
        processingTime: "60-90 days",
        fee: "ETB 100,000 - 1M+",
        steps: ["Pre-application meeting", "EIA submission", "Committee review", "Final approval"],
        color: "from-green-500 to-emerald-500"
    },
    {
        icon: <Upload className="w-5 h-5" />,
        title: "Renewal Application",
        processingTime: "15-30 days",
        fee: "ETB 10,000 - 100,000",
        steps: ["Renewal notice", "Compliance check", "Performance review", "Renewal"],
        color: "from-amber-500 to-orange-500"
    }
]

const applicationProcess = [
    { step: 1, title: "Account Registration", description: "Create your verified applicant account", duration: "Instant" },
    { step: 2, title: "Application Form", description: "Complete the digital application form", duration: "1-2 days" },
    { step: 3, title: "Document Upload", description: "Submit required supporting documents", duration: "1-3 days" },
    { step: 4, title: "Fee Payment", description: "Pay applicable fees online", duration: "Instant" },
    { step: 5, title: "Review Process", description: "Technical and compliance review", duration: "30-90 days" },
    { step: 6, title: "Decision & License", description: "Receive decision and download license", duration: "1-2 days" }
]

const requiredDocuments = [
    { title: "Company Registration", format: "PDF", mandatory: true },
    { title: "Technical Proposal", format: "PDF", mandatory: true },
    { title: "Environmental Impact Assessment", format: "PDF", mandatory: true },
    { title: "Financial Capability Proof", format: "PDF/Excel", mandatory: true },
    { title: "Community Development Plan", format: "PDF", mandatory: false },
    { title: "Safety Management Plan", format: "PDF", mandatory: true }
]

const ApplicationPortalPage = () => {

    return (
        <div className='min-h-screen bg-gradient-to-b from-gray-50 to-white'>
            {/* Hero Header */}
            <div className='bg-gradient-to-r from-golden-dark to-golden-dark text-white'>
                <div className='w-7xl mx-auto px-6 py-16'>
                    <div className='max-w-4xl'>
                        <h1 className='text-5xl font-bold mb-6'>
                            Mining License Application Portal
                        </h1>
                        <p className='text-xl text-blue-100 mb-8'>
                            Digital gateway for transparent and efficient mining license applications with the Ministry of Mines
                        </p>
                        <a
                            href="#apply-now"
                            className='inline-flex items-center gap-2 bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg'
                        >
                            Start New Application
                            <ArrowRight className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>

            <div className='w-7xl mx-auto px-6 py-12'>
                {/* Portal Overview */}
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16'>
                    <div>
                        <div className='mb-8'>
                            <h2 className='text-3xl font-bold text-gray-900 mb-4'>
                                Welcome to the Digital Application Portal
                            </h2>
                            <p className='text-lg text-gray-600'>
                                The Ministry of Mines is committed to digital transformation, providing investors with a seamless online experience for all mining license applications. Our portal ensures transparency, efficiency, and accessibility throughout the application process.
                            </p>
                        </div>

                        <div className='space-y-6'>
                            {applicationData[0].benefits.map((benefit, index) => (
                                <div key={index} className='flex items-start gap-3'>
                                    <CheckCircle className='w-6 h-6 text-green-500 flex-shrink-0 mt-1' />
                                    <div>
                                        <p className='font-medium text-gray-900'>{benefit}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='relative h-96 rounded-2xl overflow-hidden shadow-2xl'>
                        <Image
                            src={applicationData[0].image}
                            alt="Application Portal Interface"
                            fill
                            className='object-cover'
                            priority
                        />
                        <div className='absolute inset-0 bg-gradient-to-tr from-blue-900/70 to-transparent' />
                        <div className='absolute bottom-8 left-8'>
                            <div className='inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full'>
                                <Clock className='w-5 h-5 text-blue-600' />
                                <span className='font-semibold text-gray-900'>Average Processing Time Reduced by 40%</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Application Types */}
                <div className='mb-16'>
                    <h3 className='text-3xl font-bold text-gray-900 mb-10 text-center'>
                        Available Application Types
                    </h3>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                        {applicationTypes.map((type, index) => (
                            <div
                                key={index}
                                className='group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1'
                            >
                                <div className={`h-2 bg-gradient-to-r ${type.color}`} />
                                <div className='p-6'>
                                    <div className='flex items-center gap-3 mb-4'>
                                        <div className={`p-2 rounded-lg bg-gradient-to-br ${type.color} text-white`}>
                                            {type.icon}
                                        </div>
                                        <h4 className='text-xl font-bold text-gray-900'>{type.title}</h4>
                                    </div>

                                    <div className='space-y-4 mb-6'>
                                        <div className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'>
                                            <span className='text-gray-600'>Processing Time</span>
                                            <span className='font-semibold text-gray-900'>{type.processingTime}</span>
                                        </div>
                                        <div className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'>
                                            <span className='text-gray-600'>Application Fee</span>
                                            <span className='font-semibold text-gray-900'>{type.fee}</span>
                                        </div>
                                    </div>

                                    <div className='space-y-2'>
                                        <p className='text-sm font-medium text-gray-700 mb-2'>Application Steps:</p>
                                        {type.steps.map((step, idx) => (
                                            <div key={idx} className='flex items-center gap-2'>
                                                <div className='w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold'>
                                                    {idx + 1}
                                                </div>
                                                <span className='text-gray-600'>{step}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <Link href={`/mining/application-portal/${type.title}`} >
                                        <Button className='w-full mt-6 bg-golden-dark text-white py-3 rounded-lg font-medium hover:bg-golden-dark transition-colors'>Start {type.title}</Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ApplicationPortalPage