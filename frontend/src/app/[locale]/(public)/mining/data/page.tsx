import React from 'react'
import Image from "next/image";
import { BarChart3, PieChart, TrendingUp, Download, MapPin, Database, Filter, ChevronRight } from 'lucide-react';

const miningData = [
    {
        title: "Mineral Resource Dashboard",
        heading: "Comprehensive data analytics platform for Ethiopia's mining sector performance.",
        description: "Access real-time statistics, production metrics, and economic impact data from Ethiopia's mining industry. Our data portal provides investors, researchers, and policymakers with accurate, up-to-date information on mineral production, export revenues, employment figures, and sector growth trends.",
        image: "/data-dashboard.jpg",
        features: [
            "Real-time production statistics",
            "Export revenue tracking",
            "Employment data analytics",
            "Environmental compliance metrics",
            "Investment flow monitoring"
        ]
    },
]

const mineralCategories = [
    {
        icon: <TrendingUp className="w-5 h-5" />,
        title: "Metallic Minerals",
        production: "85,000 MT",
        growth: "+12.5%",
        description: "Gold, iron ore, copper, lead-zinc",
        topProducers: ["Legadembi Gold", "Midroc Gold", "National Mining Corp"]
    },
    {
        icon: <PieChart className="w-5 h-5" />,
        title: "Industrial Minerals",
        production: "2.3M MT",
        growth: "+8.2%",
        description: "Potash, limestone, gypsum, silica sand",
        topProducers: ["Ethiopian Potash", "Derba Cement", "National Cement"]
    },
    {
        icon: <MapPin className="w-5 h-5" />,
        title: "Construction Minerals",
        production: "15.8M MT",
        growth: "+15.3%",
        description: "Aggregates, dimension stones, clays",
        topProducers: ["Local SMEs", "Regional Enterprises", "Private Operators"]
    }
]

const keyMetrics = [
    {
        title: "Total Mineral Production",
        value: "18.2M MT",
        change: "+14.2%",
        period: "Last Fiscal Year",
        icon: <Database className="w-5 h-5" />,
        color: "from-blue-500 to-cyan-500"
    },
    {
        title: "Export Revenue",
        value: "$1.2B",
        change: "+22.5%",
        period: "Annual Contribution",
        icon: <TrendingUp className="w-5 h-5" />,
        color: "from-green-500 to-emerald-500"
    },
    {
        title: "Direct Employment",
        value: "45,000+",
        change: "+8.7%",
        period: "Jobs Created",
        icon: <BarChart3 className="w-5 h-5" />,
        color: "from-amber-500 to-orange-500"
    },
    {
        title: "Active Licenses",
        value: "1,250",
        change: "+5.3%",
        period: "Currently Active",
        icon: <Filter className="w-5 h-5" />,
        color: "from-purple-500 to-pink-500"
    }
]

const regionalData = [
    { region: "Oromia", production: "42%", revenue: "$510M", licenses: 450 },
    { region: "Amhara", production: "28%", revenue: "$340M", licenses: 320 },
    { region: "SNNPR", production: "15%", revenue: "$180M", licenses: 210 },
    { region: "Tigray", production: "8%", revenue: "$95M", licenses: 180 },
    { region: "Others", production: "7%", revenue: "$85M", licenses: 90 }
]

const MiningDataPage = () => {
    return (
        <div className='w-7xl mx-auto'>
            {/* Header with Stats */}
            <div className='bg-gradient-to-r from-gray-200 to-gray-100 rounded-2xl p-8 mb-10 text-black shadow-lg'>
                <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6'>
                    <div>
                        <h1 className='text-4xl font-bold mb-4'>
                            Mining Sector Data Portal
                        </h1>
                        <p className='text-gray-900 max-w-2xl'>
                            Official statistics and analytics from Ethiopia's Ministry of Mines -
                            Real-time data for informed decision making
                        </p>
                    </div>
                    <div className='flex items-center gap-4'>
                        <div className='text-right'>
                            <p className='text-sm text-gray-600'>Last Updated</p>
                            <p className='text-lg font-semibold'>December 2023</p>
                        </div>
                        <div className='h-12 w-px bg-gray-700'></div>
                        <button className='flex items-center gap-2 bg-golden-dark text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors'>
                            <Download className="w-5 h-5" />
                            Download Report
                        </button>
                    </div>
                </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
                {/* Left Column - Main Content */}
                <div className='lg:col-span-8 space-y-8'>
                    {/* Key Metrics Grid */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                        {keyMetrics.map((metric, index) => (
                            <div
                                key={index}
                                className='bg-white rounded-xl border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-shadow'
                            >
                                <div className='flex items-start justify-between mb-4'>
                                    <div className={`p-2 rounded-lg bg-gradient-to-br ${metric.color} text-white`}>
                                        {metric.icon}
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${metric.change.startsWith('+')
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-red-100 text-red-700'
                                        }`}>
                                        {metric.change}
                                    </span>
                                </div>
                                <h3 className='text-2xl font-bold text-gray-900 mb-2'>{metric.value}</h3>
                                <p className='text-gray-900 font-medium mb-1'>{metric.title}</p>
                                <p className='text-sm text-gray-500'>{metric.period}</p>
                            </div>
                        ))}
                    </div>

                    {/* Featured Dashboard */}
                    <div className='bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200'>
                        <div className='p-6'>
                            <div className='flex justify-between items-start mb-6'>
                                <div>
                                    <h2 className='text-2xl font-bold text-gray-900 mb-2'>
                                        {miningData[0].title}
                                    </h2>
                                    <p className='text-gray-600'>
                                        {miningData[0].heading}
                                    </p>
                                </div>
                                <div className='flex items-center gap-2 text-blue-600 font-medium'>
                                    <Filter className='w-5 h-5' />
                                    <span>Interactive Dashboard</span>
                                </div>
                            </div>

                            <div className='mb-8'>
                                <div className='h-64 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg flex items-center justify-center'>
                                    <div className='text-center'>
                                        <BarChart3 className='w-16 h-16 text-gray-400 mx-auto mb-4' />
                                        <p className='text-gray-500 font-medium'>Interactive Data Visualization</p>
                                        <p className='text-sm text-gray-400'>Hover over charts for detailed insights</p>
                                    </div>
                                </div>
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                {miningData[0].features.map((feature, index) => (
                                    <div key={index} className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg'>
                                        <div className='w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center'>
                                            <Database className='w-4 h-4 text-blue-600' />
                                        </div>
                                        <span className='text-gray-700'>{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Regional Performance Table */}
                    <div className='bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden'>
                        <div className='p-6 border-b border-gray-200'>
                            <h3 className='text-2xl font-bold text-gray-900 flex items-center gap-2'>
                                <MapPin className='w-6 h-6 text-blue-600' />
                                Regional Production Data
                            </h3>
                            <p className='text-gray-600 mt-2'>
                                Mineral production and revenue distribution across Ethiopia's regions
                            </p>
                        </div>
                        <div className='overflow-x-auto'>
                            <table className='w-full'>
                                <thead className='bg-gray-50'>
                                    <tr>
                                        <th className='py-3 px-6 text-left text-sm font-semibold text-gray-900'>Region</th>
                                        <th className='py-3 px-6 text-left text-sm font-semibold text-gray-900'>Production Share</th>
                                        <th className='py-3 px-6 text-left text-sm font-semibold text-gray-900'>Revenue</th>
                                        <th className='py-3 px-6 text-left text-sm font-semibold text-gray-900'>Active Licenses</th>
                                        <th className='py-3 px-6 text-left text-sm font-semibold text-gray-900'>Trend</th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y divide-gray-200'>
                                    {regionalData.map((data, index) => (
                                        <tr key={index} className='hover:bg-gray-50 transition-colors'>
                                            <td className='py-4 px-6'>
                                                <div className='font-medium text-gray-900'>{data.region}</div>
                                            </td>
                                            <td className='py-4 px-6'>
                                                <div className='flex items-center gap-3'>
                                                    <div className='w-full bg-gray-200 rounded-full h-2'>
                                                        <div
                                                            className='bg-blue-600 h-2 rounded-full'
                                                            style={{ width: data.production }}
                                                        ></div>
                                                    </div>
                                                    <span className='font-semibold text-gray-900'>{data.production}</span>
                                                </div>
                                            </td>
                                            <td className='py-4 px-6'>
                                                <div className='font-semibold text-gray-900'>{data.revenue}</div>
                                            </td>
                                            <td className='py-4 px-6'>
                                                <div className='inline-flex items-center gap-1'>
                                                    <span className='font-medium text-gray-900'>{data.licenses}</span>
                                                    <span className='text-sm text-gray-500'>licenses</span>
                                                </div>
                                            </td>
                                            <td className='py-4 px-6'>
                                                <div className='flex items-center gap-1 text-green-600'>
                                                    <TrendingUp className='w-4 h-4' />
                                                    <span className='font-medium'>Growing</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Column - Sidebar Content */}
                <div className='lg:col-span-4 space-y-8'>
                    {/* Mineral Categories */}
                    <div className='bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100'>
                        <h3 className='text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2'>
                            <PieChart className='w-6 h-6' />
                            Mineral Categories
                        </h3>
                        <div className='space-y-4'>
                            {mineralCategories.map((category, index) => (
                                <div
                                    key={index}
                                    className='bg-white p-4 rounded-lg border border-blue-100 hover:border-blue-300 transition-colors'
                                >
                                    <div className='flex items-center justify-between mb-3'>
                                        <div className='flex items-center gap-2'>
                                            <div className='p-2 bg-blue-100 rounded-lg'>
                                                {category.icon}
                                            </div>
                                            <h4 className='font-bold text-gray-900'>{category.title}</h4>
                                        </div>
                                        <span className='px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full font-medium'>
                                            {category.growth}
                                        </span>
                                    </div>
                                    <div className='mb-3'>
                                        <p className='text-sm text-gray-600 mb-2'>{category.description}</p>
                                        <div className='flex items-center justify-between'>
                                            <span className='text-sm text-gray-500'>Annual Production</span>
                                            <span className='font-semibold text-gray-900'>{category.production}</span>
                                        </div>
                                    </div>
                                    <div className='pt-3 border-t border-gray-100'>
                                        <p className='text-sm font-medium text-gray-700 mb-2'>Top Producers:</p>
                                        <div className='flex flex-wrap gap-2'>
                                            {category.topProducers.map((producer, idx) => (
                                                <span key={idx} className='px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded'>
                                                    {producer}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Data Tools */}
                    <div className='bg-white rounded-xl border border-gray-200 p-6 shadow-sm'>
                        <h3 className='text-2xl font-bold text-gray-900 mb-6'>
                            Data Analysis Tools
                        </h3>
                        <div className='space-y-4'>
                            {[
                                {
                                    title: "Custom Report Generator",
                                    description: "Create tailored reports with selected metrics",
                                    icon: <Filter className="w-5 h-5" />
                                },
                                {
                                    title: "Export Data Portal",
                                    description: "Download datasets in multiple formats",
                                    icon: <Download className="w-5 h-5" />
                                },
                                {
                                    title: "Forecasting Model",
                                    description: "Predictive analytics for sector growth",
                                    icon: <TrendingUp className="w-5 h-5" />
                                },
                                {
                                    title: "GIS Mineral Mapping",
                                    description: "Interactive mineral distribution maps",
                                    icon: <MapPin className="w-5 h-5" />
                                }
                            ].map((tool, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className='flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors group'
                                >
                                    <div className='flex items-center gap-3'>
                                        <div className='p-2 bg-blue-100 rounded-lg text-blue-600'>
                                            {tool.icon}
                                        </div>
                                        <div>
                                            <p className='font-medium text-gray-900 group-hover:text-blue-600'>{tool.title}</p>
                                            <p className='text-sm text-gray-500'>{tool.description}</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                                </a>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            {/* Quick Stats Footer */}
            <div className='mt-12 pt-8 border-t border-gray-200'>
                <div className='flex flex-col md:flex-row justify-between items-center gap-6'>
                    <div>
                        <p className='text-sm text-gray-500 mb-2'>Data Source</p>
                        <p className='font-medium text-gray-900'>Ministry of Mines - Ethiopian Government</p>
                    </div>
                    <div className='flex items-center gap-6'>
                        <div className='text-center'>
                            <p className='text-2xl font-bold text-gray-900'>98.7%</p>
                            <p className='text-sm text-gray-500'>Data Accuracy</p>
                        </div>
                        <div className='h-8 w-px bg-gray-300'></div>
                        <div className='text-center'>
                            <p className='text-2xl font-bold text-gray-900'>24/7</p>
                            <p className='text-sm text-gray-500'>Data Availability</p>
                        </div>
                        <div className='h-8 w-px bg-gray-300'></div>
                        <div className='text-center'>
                            <p className='text-2xl font-bold text-gray-900'>API</p>
                            <p className='text-sm text-gray-500'>Developer Access</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MiningDataPage