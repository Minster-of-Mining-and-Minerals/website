import { FileText, Upload, Clock, Shield, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';



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

const ApplicationPage = () => {
    return (
        <div className='min-h-screen bg-gradient-to-b from-gray-50 to-white'>

            <div className='w-7xl mx-auto px-6 py-12'>


                {/* Application Process Timeline */}
                <div className='mb-16'>
                    <h3 className='text-3xl font-bold text-gray-900 mb-10 text-center'>
                        Application Process Timeline
                    </h3>
                    <div className='relative'>
                        {/* Timeline line */}
                        <div className='absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-green-500 hidden lg:block' />

                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                            {applicationProcess.map((process, index) => (
                                <div
                                    key={index}
                                    className={`relative ${index % 2 === 0 ? 'lg:text-right lg:pr-12' : 'lg:pl-12 lg:mt-24'}`}
                                >
                                    <div className='bg-white p-6 rounded-xl border border-gray-200 shadow-lg'>
                                        <div className='flex items-center justify-between lg:justify-start lg:flex-row-reverse gap-4 mb-4'>
                                            <div className='w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold text-lg'>
                                                {process.step}
                                            </div>
                                            <h4 className='text-xl font-bold text-gray-900'>{process.title}</h4>
                                        </div>
                                        <p className='text-gray-600 mb-3'>{process.description}</p>
                                        <div className='flex items-center gap-2 text-blue-600 font-medium'>
                                            <Clock className='w-4 h-4' />
                                            <span>{process.duration}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Required Documents & Quick Actions */}
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                    {/* Required Documents */}
                    <div className='bg-white rounded-xl border border-gray-200 p-8 shadow-lg'>
                        <h3 className='text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3'>
                            <FileText className='w-6 h-6 text-blue-600' />
                            Required Documents
                        </h3>
                        <div className='space-y-4'>
                            {requiredDocuments.map((doc, index) => (
                                <div
                                    key={index}
                                    className='flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors'
                                >
                                    <div className='flex items-center gap-3'>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${doc.mandatory ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                                            {doc.mandatory ? '!' : '✓'}
                                        </div>
                                        <div>
                                            <p className='font-medium text-gray-900'>{doc.title}</p>
                                            <p className='text-sm text-gray-500'>{doc.format} format</p>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${doc.mandatory ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                                        {doc.mandatory ? 'Required' : 'Optional'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className='space-y-6'>
                        <div className='bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200'>
                            <h3 className='text-2xl font-bold text-gray-900 mb-6'>Ready to Apply?</h3>
                            <div className='space-y-4'>
                                <button className='w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2'>
                                    <Upload className='w-5 h-5' />
                                    Start New Application
                                </button>
                                <button className='w-full border-2 border-blue-600 text-blue-600 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors'>
                                    Track Existing Application
                                </button>
                                <button className='w-full border border-gray-300 text-gray-700 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors'>
                                    Download Application Guide
                                </button>
                            </div>
                        </div>

                        {/* Support Info */}
                        <div className='bg-white rounded-xl border border-gray-200 p-6'>
                            <div className='flex items-start gap-3 mb-4'>
                                <AlertCircle className='w-6 h-6 text-amber-500 flex-shrink-0 mt-1' />
                                <div>
                                    <h4 className='font-bold text-gray-900 mb-2'>Need Assistance?</h4>
                                    <p className='text-gray-600 mb-3'>
                                        Our licensing support team is available to guide you through the application process.
                                    </p>
                                    <div className='space-y-2'>
                                        <p className='text-sm text-gray-500'>Email: licensing@mines.gov.et</p>
                                        <p className='text-sm text-gray-500'>Phone: +251 11 123 4567</p>
                                        <p className='text-sm text-gray-500'>Office Hours: 8:30 AM - 5:30 PM (EAT)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ApplicationPage