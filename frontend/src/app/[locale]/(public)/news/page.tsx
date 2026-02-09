"use client";

import PageHeader from "@/components/pages/home-page-components/PageHeader";
import { MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import NewsCard from "@/components/pages/news-page-components/NewsCard";
import { newsData } from "@/datas/news-mock-data";

const categories = ["All News", "Projects", "Training", "Policy"];

const NewsPage = () => {
    const [activeCategory, setActiveCategory] = useState("All News");

    const filteredNews =
        activeCategory === "All News"
            ? newsData
            : newsData.filter((item) => item.category === activeCategory);

    const readingTime = (text: string) => {
        const words = text.split(" ").length;
        return Math.ceil(words / 200); // 200 wpm avg reading speed
    };

    return (
        <>
            <PageHeader
                title="News"
                icon={<MessageCircle />}
                description="News and updates from the Ministry of Mines"
            />

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Page header */}
                <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-golden-dark">
                        News
                    </h1>
                    <div className="mt-2 h-1 w-12 bg-golden-dark rounded-full" />
                    <p className="text-gray-600 mt-4 max-w-2xl">
                        Stay updated with the latest news and announcements from the Ministry of Mines.

                        Here you can find information about our activities, projects, and initiatives.
                    </p>
                </div>

                {/* Category Tabs with moving background effect */}
                <div className="relative flex gap-4 mb-8 flex-wrap">
                    {categories.map((cat) => {
                        const isActive = activeCategory === cat;
                        return (
                            <div key={cat} className="relative z-10">
                                <button
                                    onClick={() => setActiveCategory(cat)}
                                    className={`relative z-10 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? "text-white" : "text-gray-700 hover:bg-golden-dark20"
                                        }`}
                                >
                                    {cat}
                                </button>
                                {/* Moving background */}
                                {isActive && (
                                    <motion.div
                                        layoutId="active-category"
                                        className="absolute inset-0 bg-golden-dark rounded-lg z-0"
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* News grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredNews.map((item) => (
                        <NewsCard
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            excerpt={item.excerpt}
                            image={item.image}
                            date={item.date}
                            category={item.category}
                            tags={item.tags}
                            readingTime={readingTime}
                        />
                    ))}
                </div>
            </section>
        </>
    );
};

export default NewsPage;