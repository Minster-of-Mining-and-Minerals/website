import type { Metadata } from "next";
import HeroSection from '@/components/pages/home-page-components/HeroSection'
import LatestNewsSection from '@/components/pages/home-page-components/LatestNewsSection'
import LatestEventSection from '@/components/pages/home-page-components/LatestEventSection'
import CardSection from '@/components/pages/home-page-components/CardSection'
import PartnersSection from '@/components/pages/home-page-components/PartnersSection'
import { OrganizationJsonLd } from '@/components/seo/OrganizationJsonLd'
import { buildPageMetadata } from '@/lib/seo'
import { PAGE_SEO } from '@/lib/seo-content'

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const seo = PAGE_SEO["/"];

    return buildPageMetadata({
        title: seo.title,
        description: seo.description,
        path: "/",
        locale,
    });
}

const page = () => {
    return (
        <div className='flex flex-col items-center' >
            <OrganizationJsonLd />
            <HeroSection />
            <LatestNewsSection />
            <LatestEventSection />
            <CardSection />
            <PartnersSection />
        </div>
    )
}

export default page