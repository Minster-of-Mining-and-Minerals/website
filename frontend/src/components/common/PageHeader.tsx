import React from 'react'
import GridBackground from '../ui/grid-background'

const PageHeader = ({ title, icon, description }: { title: string, icon: React.ReactNode, description: string }) => {
    return (
        <GridBackground>
            <div className="flex flex-col items-center justify-center gap-4 px-4">
                {/* Icon */}
                <span className="font-bold border rounded-xl border-gray-500 bg-gray-500/40 text-golden-dark w-[72px] h-[72px] flex items-center justify-center text-3xl sm:text-4xl md:text-5xl">
                    {icon}
                </span>

                {/* Title */}
                <h1 className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-golden-dark text-center">
                    {title}
                </h1>

                {/* Description */}
                <p className="text-base sm:text-lg md:text-xl text-golden-dark text-center max-w-3xl">
                    {description}
                </p>
            </div>
        </GridBackground>
    )
}

export default PageHeader
