import HeroSection from '@/components/common/HeroSection'
import LatestNewsSection from '@/components/common/LatestNewsSection'
import CardSection from '@/components/common/CardSection'
import PartnersSection from '@/components/common/PartnersSection'

const page = () => {
    return (
        <div className='flex flex-col items-center' >
            <HeroSection />
            <LatestNewsSection />
            <CardSection />
            <PartnersSection />
        </div>
    )
}

export default page