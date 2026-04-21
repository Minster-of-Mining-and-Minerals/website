import HeroSection from '@/components/pages/home-page-components/HeroSection'
import LatestNewsSection from '@/components/pages/home-page-components/LatestNewsSection'
import LatestEventSection from '@/components/pages/home-page-components/LatestEventSection'
import CardSection from '@/components/pages/home-page-components/CardSection'
import PartnersSection from '@/components/pages/home-page-components/PartnersSection'

const page = () => {
    return (
        <div className='flex flex-col items-center' >
            <HeroSection />
            <LatestNewsSection />
            <LatestEventSection />
            <CardSection />
            <PartnersSection />
        </div>
    )
}

export default page