import PageHeader from '@/components/common/PageHeader'
import { Quote, Layers, Briefcase, Trophy, Users, Phone, Target, Eye, Gem } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const leaders = [
    {
        name: "Dr. Abebe Tesfaye",
        title: "Minister of Mines",
        photo: "/leaders/abebe.jpg",
        description: "Leading the ministry with a focus on sustainable resource management."
    },
    {
        name: "Eng. Selamawit Bekele",
        title: "Deputy Minister",
        photo: "/leaders/selamawit.jpg",
        description: "Oversees mining projects and regulatory compliance."
    },
    {
        name: "Mr. Yohannes Alemu",
        title: "Director of Exploration",
        photo: "/leaders/yohannes.jpg",
        description: "Responsible for mineral exploration and surveys."
    },
]

const page = () => {
    return (
        <div className="w-full flex flex-col items-center justify-center bg-gray-100 min-h-[40vh] mx-auto">

            {/* Hero / Page Header */}
            <PageHeader
                title="About MoM"
                icon={<Quote />}
                description="About the Ministry of Mines"
            />

            <section className="w-full py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Section Header */}
                    <div className="mb-10">
                        <h2 className="text-2xl sm:text-3xl font-bold text-golden-dark">
                            Background of the Ministry of Mines
                        </h2>
                        <div className="mt-3 h-1 w-20 bg-golden-dark rounded-full"></div>
                    </div>

                    {/* Content */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-gray-700 leading-relaxed text-base sm:text-lg">

                        {/* Image */}
                        <div>
                            <img
                                src="/home-4.jpg"
                                alt="Ministry of Mines"
                                className="rounded-xl object-cover w-full h-full"
                            />
                        </div>

                        {/* Text */}
                        <div className="flex flex-col gap-4">
                            <p>
                                The Ministry of Mines and Petroleum was reestablished by Proclamation
                                <span className="font-medium text-golden-dark"> 1097/2018 </span>
                                as a regulatory organ of the Mines and Petroleum Sector of the country,
                                including the granting of exploration and mining licenses.
                            </p>

                            <p>
                                As a priority sector under the country’s homegrown economic reform agenda,
                                the Ministry promotes private sector investment, streamlines regulatory
                                procedures, and strengthens institutional capacity through modern systems
                                such as the
                                <span className="font-medium text-golden-dark">
                                    {" "}digital mining cadaster
                                </span>.
                            </p>

                            {/* Show More Button */}
                            <div className="pt-4">
                                <Link
                                    href="/about/background"
                                    className="inline-flex items-center gap-2 text-golden-dark font-semibold "
                                >
                                    <span className='hover:underline'>Show more</span>
                                    <span aria-hidden   >→</span>
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </section>



            {/* Mission, Vision & Values */}
            <section className="w-full py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Section Header */}
                    <div className="mb-10 w-fit">
                        <h2 className="text-2xl sm:text-3xl font-bold text-golden-dark">
                            Mission & Vision
                        </h2>
                        <div className="mt-4 h-1 w-24 bg-golden-dark   rounded-full"></div>
                    </div>

                    {/* Cards */}
                    <div className="flex flex-col gap-8 ">

                        {/* Vision */}
                        <div className="group bg-white rounded-2xl p-8 shadow-sm border hover:shadow-md transition">
                            <div className="flex items-center mb-4">
                                <span className="w-14 h-14 flex items-center justify-center rounded-xl bg-golden-dark/10 text-golden-dark">
                                    <Eye size={28} />
                                </span>
                                <h3 className="text-3xl font-semibold text-center mb-2 text-golden-dark">
                                    Vision
                                </h3>

                            </div>




                            <p className="text-gray-700 text-left leading-relaxed text-base sm:text-lg">
                                To foresee the well developed Mineral Resources Contribution to the Foreign Currency Earnings increase by 10 fold, and be the Back Bone of the Industry in 2020-2023.
                            </p>
                        </div>

                        {/* Mission */}
                        <div className="group bg-white rounded-2xl p-8 shadow-sm border hover:shadow-md transition">
                            <div className="flex items-center justify-center mb-4">
                                <span className="w-14 h-14 flex items-center justify-center rounded-xl bg-golden-dark/10 text-golden-dark">
                                    <Target size={28} />
                                </span>
                            </div>
                            <h3 className="text-xl font-semibold text-center mb-4 text-golden-dark">
                                Mission
                            </h3>
                            <ul className="text-gray-700 text-sm sm:text-base leading-relaxed space-y-2 list-disc list-inside">
                                <li>Generate, manage, and deliver geoscience and geo-energy data.</li>
                                <li>Encourage private sector participation by creating conducive investment conditions.</li>
                                <li>Issue and administer mineral and petroleum licenses transparently.</li>
                                <li>Develop resources in an environmentally responsible manner.</li>
                                <li>Regulate precious and ornamental mineral markets in collaboration with stakeholders.</li>
                                <li>Expand mineral development to enhance foreign currency earnings and national growth.</li>
                            </ul>
                        </div>

                    </div>
                </div>
            </section>



            {/* Organizational Structure */}
            <section className="w-full py-12">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h3 className="text-2xl font-semibold mb-6 flex items-center justify-center gap-2">
                        <Layers /> Organizational Structure
                    </h3>
                    <p>Brief description of the hierarchy, departments, and leadership.</p>
                    {/* Optional: add an org chart or image here */}
                </div>
            </section>

            {/* Organizational Leaders */}
            <section className="w-full py-12 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <h3 className="text-2xl font-semibold mb-8 flex items-center justify-center gap-2">
                        <Users /> Organizational Leaders
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {leaders.map((leader, idx) => (
                            <div key={idx} className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden text-center p-6 flex flex-col items-center">
                                <img
                                    src={leader.photo}
                                    alt={leader.name}
                                    className="w-32 h-32 object-cover rounded-full mb-4"
                                />
                                <h4 className="text-lg font-semibold">{leader.name}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{leader.title}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{leader.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Key Functions / Responsibilities */}
            <section className="w-full py-12">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
                    <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-2">Mineral Exploration</h4>
                        <p>Oversee exploration and management of mineral resources.</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-2">Licensing & Regulation</h4>
                        <p>Issue licenses and ensure compliance with mining laws.</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-2">Investor Support</h4>
                        <p>Facilitate investment in mining projects and provide guidance.</p>
                    </div>
                </div>
            </section>

            {/* Achievements / Highlights */}
            <section className="w-full py-12 bg-white">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h3 className="text-2xl font-semibold mb-6 flex items-center justify-center gap-2">
                        <Trophy /> Achievements
                    </h3>
                    <p>Showcase of notable projects, awards, and mining milestones.</p>
                </div>
            </section>

            {/* Investment & Opportunities */}
            <section className="w-full py-12">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h3 className="text-2xl font-semibold mb-6 flex items-center justify-center gap-2">
                        <Briefcase /> Investment Opportunities
                    </h3>
                    <p>Information for investors: licenses, incentives, and mining resources.</p>
                </div>
            </section>

            {/* Contact / Get Involved */}
            <section className="w-full py-12 bg-white">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h3 className="text-2xl font-semibold mb-6 flex items-center justify-center gap-2">
                        <Phone /> Contact Us
                    </h3>
                    <p>Ministry contact info, inquiry forms, and partnership opportunities.</p>
                </div>
            </section>

        </div>
    )
}

export default page
