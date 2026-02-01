import HeroSection from '@/components/common/HeroSection'
import LatestNewsSection from '@/components/common/LatestNewsSection'

const page = () => {
    return (
        <div className='flex flex-col items-center' >
            <HeroSection />
            <LatestNewsSection />

        </div>
    )
}

export default page