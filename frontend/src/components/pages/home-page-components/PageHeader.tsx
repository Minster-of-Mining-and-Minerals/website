import InteractiveGrid from '../../ui/interactive-grid'

const PageHeader = ({ title, icon, description }: { title: string, icon: React.ReactNode, description: string }) => {
    return (
        <InteractiveGrid>
            <div className="flex mt-10 mb-10 flex-col items-center justify-center gap-4 px-4">
                {/* Icon */}
                <span className="font-bold border rounded-xl border-gray-500 bg-gray-500/40 text-golden-dark w-[72px] h-[72px] flex items-center justify-center text-3xl sm:text-4xl md:text-5xl">
                    {icon}
                </span>

                {/* Title */}
                <h1 className="text-2xl md:3xl lg:text-5xl font-bold text-golden-classic text-center">
                    {title}
                </h1>

                {/* Description */}
                <p className="text-sm md:text-lg lg:text-xl text-golden-dark text-center max-w-3xl">
                    {description}
                </p>
            </div>
        </InteractiveGrid>
    )
}

export default PageHeader
