import type { Metadata } from "next";
import InvestigatingInEthiopiaPage from '@/components/pages/investigate-ethiopia-page-components/InvestigatingInEthiopiaPage'
import React from 'react'
import { buildPageMetadata } from '@/lib/seo'
import { PAGE_SEO } from '@/lib/seo-content'

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const seo = PAGE_SEO["/investigating-in-ethiopia"];

    return buildPageMetadata({
        title: seo.title,
        description: seo.description,
        path: "/investigating-in-ethiopia",
        locale,
    });
}

function page() {
    return (
        <div><InvestigatingInEthiopiaPage /></div>
    )
}

export default page