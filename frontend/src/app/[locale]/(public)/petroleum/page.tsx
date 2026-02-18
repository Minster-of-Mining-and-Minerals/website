import React from 'react'
import Image from "next/image";
const petroleumData = [
    {
        title: "Petroleum",
        heading: "Petroleum is the extraction of valuable minerals or other geological materials from the Earth.",
        description: "Ethiopia is endowed with a wide range of mineral resources, including gold, coal, iron ore, copper, potash, industrial minerals, and gemstones. The mining sector plays a significant role in the Ethiopian economy, contributing to export earnings, job creation, and rural development. The government has been implementing reforms to improve the mining sector, including the establishment of the Ministry of Mines and Petroleum, the development of a new mining law, and the promotion of foreign investment.",
        image: "/home-2.jpg",
    },
]

const PetroleumPage = () => {
    return (
        <div className='w-7xl mx-auto grid grid-cols-1 md:grid-cols-7 gap-8'>
            <div className="col-span-2 prose max-w-none flex flex-col gap-4 text-gray-500">
                <p className='text-gray-900'>
                    On this page, you can learn more about Ethiopia’s petroleum sector, including an overview of its natural resources, petroleum’s current economic contribution, the reforms which are taking place, and who the key actors are.
                </p>
                <p className='text-gray-500'>
                    On this page, you can learn more about Ethiopia’s petroleum sector, including an overview of its natural resources, petroleum’s current economic contribution, the reforms which are taking place, and who the key actors are.
                </p>
            </div>
            <div className="col-span-3 flex flex-col gap-4">
                <Image
                    src={petroleumData[0].image}
                    alt={petroleumData[0].title}
                    width={1200}
                    height={1200}
                    className="object-cover w-full"
                    priority={true}
                />
                <p className='text-gray-900'>
                    {petroleumData[0].heading}
                </p>
            </div>
            {/* Ministry's Core Mandate */}
            <div className="col-span-2 prose max-w-none flex flex-col gap-2 text-gray-500">
                <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-bold text-golden-dark">• Mandate</h2>
                    <p>
                        Lead Ethiopia's petroleum sector through sustainable resource development and economic value addition.
                    </p>
                </div>
                <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-bold text-golden-dark">• Strategic Focus</h2>
                    <p>
                        Ensure sustainable, transparent petroleum resource management and foster investment-friendly policies.
                    </p>
                </div>
                <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-bold text-golden-dark">• Key Priority</h2>
                    <p>
                        Maximize petroleum's contribution to the national economy through effective governance and value chain development.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PetroleumPage