import HeroSection from '@/components/common/HeroSection'

const page = () => {
    return (
        <div className='flex flex-col items-center' >
            <HeroSection />
            {Array.from({ length: 100 }).map((_, index) => (
                <div key={index} className='w-10 h-10 bg-primary rounded-full' >
                    {index}
                </div>
            ))}
        </div>
    )
}

export default page