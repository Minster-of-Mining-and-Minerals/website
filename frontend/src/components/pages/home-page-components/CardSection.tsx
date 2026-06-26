"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "../../ui/button";
import { useGetCardsQuery } from "@/redux/api/cardApi";
import { getImageUrl } from "@/utils/fileUrl";
import { CardBannerSkeleton } from "@/components/skeletons";

interface CardData {
    title: string;
    description: string;
    image: string;
    buttonText: string;
    button_url: string;
}

const CardSection = () => {
    const { data: cards, isLoading } = useGetCardsQuery();
    const [cardData, setCardData] = useState<CardData | null>(null);

    useEffect(() => {
        if (cards && cards.length > 0) {
            const firstCard = cards[0];
            setCardData({
                title: firstCard.title,
                description: firstCard.description || "",
                image: firstCard.attachment?.file_path ? getImageUrl(firstCard.attachment, "large") : "",
                buttonText: firstCard.button_name || "",
                button_url: firstCard.button_url || "#",
            });
        }
    }, [cards]);

    // Show loading state
    if (isLoading) {
        return <CardBannerSkeleton />;
    }

    // Don't render if no card data is available
    if (!cardData || !cardData.title) {
        return null;
    }

    return (
        <section className="w-full flex justify-center md:px-4 mb-20">
            <div
                className="relative w-full max-w-7xl md:rounded-3xl overflow-hidden shadow-xl"
            >
                {/* Background Image */}
                {cardData.image && (
                    <img
                        src={cardData.image}
                        alt={cardData.title}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                )}

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/50" />

                {/* Content */}
                <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 p-8 lg:p-14 text-white">

                    {/* Left Text */}
                    <div className="">
                        <h2 className="text-lg lg:text-3xl font-bold text-golden-classic mb-4 leading-snug">
                            {cardData.title}
                        </h2>

                        <p className="text-sm max-w-2xl lg:text-base text-gray-200 leading-relaxed">
                            {cardData.description}
                        </p>
                    </div>

                    {/* Right Button */}
                    <div className="flex gap-4">
                        <Link href={cardData.button_url} target={cardData.button_url.startsWith("http") ? "_blank" : undefined}>
                            <Button className="bg-golden-dark hover:bg-golden-darkHover px-9 py-2">
                                {cardData.buttonText}
                            </Button>
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default CardSection;