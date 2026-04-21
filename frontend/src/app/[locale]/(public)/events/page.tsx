"use client";

import PageHeader from "@/components/pages/home-page-components/PageHeader";
import { Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useGetEventsQuery } from "@/redux/api/eventApi";
import { useGetEventCategoriesQuery } from "@/redux/api/eventCategoryApi";
import EventCard from "@/components/pages/events-page-components/EventCard";
import { extractExcerpt } from "@/utils/newsMapper";
import { getFileUrl } from "@/utils/fileUrl";

const EventsPage = () => {
    const { data: eventsData = [], isLoading, isError } = useGetEventsQuery({ status: "published" });
    const { data: categoriesData = [] } = useGetEventCategoriesQuery();

    const [activeCategory, setActiveCategory] = useState<string>("All Events");

    // Build a flat list of category names including "All Events"
    const categoryNames = ["All Events", ...categoriesData.map((c: any) => c.name)];

    // Filter events based on selected category
    const filteredEvents = activeCategory === "All Events"
        ? eventsData
        : eventsData.filter((item: any) => item.category?.name === activeCategory);

    return (
        <>
            <PageHeader
                title="Events"
                icon={<Calendar />}
                description="Events and schedules from the Ministry of Mines"
            />

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Page header */}
                <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-golden-dark">Events</h1>
                    <div className="mt-2 h-1 w-12 bg-golden-dark rounded-full" />
                    <p className="text-gray-600 mt-4 max-w-2xl">
                        Stay updated with the latest events, workshops, and seminars from the Ministry of Mines.
                    </p>
                </div>

                {/* Tag filter tabs */}
                <div className="relative flex gap-4 mb-8 flex-wrap">
                    {categoryNames.map((category) => {
                        const isActive = activeCategory === category;
                        return (
                            <div key={category} className="relative z-10">
                                <button
                                    onClick={() => setActiveCategory(category)}
                                    className={`relative z-10 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? "text-white" : "text-gray-700 hover:bg-golden-dark20"}`}
                                >
                                    {category}
                                </button>
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

                {/* Events grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredEvents.map((item: any) => {
                        const excerpt = extractExcerpt(item.content) || item.description || "";
                        const attachment = item.attachments?.[0]?.attachment;
                        const mediaUrl = attachment?.file_path ? getFileUrl(attachment.file_path) : null;
                        const media = mediaUrl ? { url: mediaUrl, type: "image" as "image" | "video" } : null; // assuming images for simplicity
                        
                        const startDate = new Date(item.start_time);
                        const displayDate = startDate.toLocaleDateString();
                        const displayTime = startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                        return (
                            <EventCard
                                key={item.event_id}
                                id={item.event_id}
                                title={item.title}
                                excerpt={excerpt}
                                media={media}
                                date={displayDate}
                                time={displayTime}
                                location={item.location || ""}
                                category={item.category?.name || "General"}
                                status={item.computed_status || item.status}
                            />
                        );
                    })}
                </div>
            </section>
        </>
    );
};

export default EventsPage;