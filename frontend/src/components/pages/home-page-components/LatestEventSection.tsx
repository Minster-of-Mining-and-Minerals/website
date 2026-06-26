"use client";

import Image from "next/image";
import { ArrowRight, Calendar as CalendarIcon, Clock, MapPin } from "lucide-react";
import { FeaturedCarouselSkeleton } from "@/components/skeletons";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { Button } from "../../ui/button";
import { useGetEventsQuery } from "@/redux/api/eventApi";
import { getImageUrl } from "@/utils/fileUrl";
import Link from "next/link";
import { extractExcerpt } from "@/utils/newsMapper";
import { formatDate, formatTimeShort } from "@/utils/datetime";

type EventItem = {
    id: string;
    title: string;
    description: string;
    image: string;
    date: string;
    time: string;
    location: string;
    status: string;
};

export default function LatestEventSection() {
    const { data: apiEvents, isLoading } = useGetEventsQuery({ status: "published" });
    const [eventItems, setEventItems] = useState<EventItem[]>([]);
    const [active, setActive] = useState(0);

    useEffect(() => {
        if (apiEvents && apiEvents.length > 0) {
            // Sort by start_time ascending (upcoming events first)
            const upcomingEvents = [...apiEvents].filter((e: any) => 
                e.computed_status !== "archived" && 
                e.computed_status !== "completed" && 
                e.computed_status !== "cancelled"
            );
            upcomingEvents.sort((a: any, b: any) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime());

            const mapped: EventItem[] = upcomingEvents.slice(0, 6).map((e: any) => {
                const attachment = e.attachments?.[0]?.attachment;
                
                return {
                    id: e.event_id,
                    title: e.title,
                    description: (extractExcerpt(e.content) || e.description || "").substring(0, 200) + "...",
                    image: attachment?.file_path ? getImageUrl(attachment, "large") : "/placeholder-news.jpg",
                    date: formatDate(e.start_time),
                    time: formatTimeShort(e.start_time),
                    location: e.location || "Location not specified",
                    status: e.computed_status || e.status
                };
            });
            
            // Fallback to recent events if no upcoming
            if (mapped.length === 0) {
                 const recentEvents = [...apiEvents].sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
                 const recentMapped: EventItem[] = recentEvents.slice(0, 6).map((e: any) => {
                    const attachment = e.attachments?.[0]?.attachment;
                    
                    return {
                        id: e.event_id,
                        title: e.title,
                        description: (extractExcerpt(e.content) || e.description || "").substring(0, 200) + "...",
                        image: attachment?.file_path ? getImageUrl(attachment, "large") : "/placeholder-news.jpg",
                        date: formatDate(e.start_time),
                        time: formatTimeShort(e.start_time),
                        location: e.location || "Location not specified",
                        status: e.computed_status || e.status
                    };
                });
                setEventItems(recentMapped);
            } else {
                setEventItems(mapped);
            }
        }
    }, [apiEvents]);

    // 🔁 Auto slide every 10s
    useEffect(() => {
        if (eventItems.length > 0) {
            const interval = setInterval(() => {
                setActive((prev) => (prev === eventItems.length - 1 ? 0 : prev + 1));
            }, 10000);
            return () => clearInterval(interval);
        }
    }, [eventItems.length]);

    if (isLoading) {
        return <FeaturedCarouselSkeleton />;
    }

    if (eventItems.length === 0) return null;

    const item = eventItems[active];

    return (
        <section className="w-full pb-20 pt-10">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <div className="mb-10 flex justify-between items-center">
                    <div className="flex flex-col">
                        <p className="text-sm font-medium text-gray-500">Upcoming Activities</p>
                        <h2 className="text-2xl sm:text-3xl font-bold text-golden-dark">
                            Latest Events
                        </h2>
                        <div className="mt-3 h-1 w-20 bg-golden-dark rounded-full"></div>
                    </div>
                    <div className="flex items-center">
                        <Link
                            href="/events"
                            className="flex items-center gap-2 bg-golden-dark hover:bg-golden-darkHover text-white px-4 md:px-5 py-2 md:py-3 rounded-md md:rounded-2xl shadow-md transition-all transform"
                        >
                            <span className="font-medium text-xs md:text-base">Find All Events</span>
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>

                {/* Main Card */}
                <div className="relative bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {/* Image */}
                        <div className="relative h-[250px] md:h-[400px]">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="object-cover h-full w-full"
                            />
                            {/* Date Badge */}
                            <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded-xl shadow-lg flex flex-col items-center justify-center">
                                <span className="text-sm font-bold text-golden-dark">{new Date(item.date).toLocaleString('default', { month: 'short' }).toUpperCase()}</span>
                                <span className="text-2xl font-black text-gray-900 leading-none">{new Date(item.date).getDate()}</span>
                            </div>
                            
                            {/* Status */}
                            <span className={`absolute top-4 right-4 text-xs md:text-sm font-medium px-4 py-1 rounded-full shadow text-white ${
                                item.status === 'ongoing' ? 'bg-green-600' : 
                                item.status === 'upcoming' ? 'bg-blue-600' : 
                                item.status === 'completed' ? 'bg-gray-700' :
                                'bg-gray-600'
                            }`}>
                                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                            </span>
                        </div>

                        {/* Content */}
                        <div className="p-4 md:p-8 flex flex-col justify-center gap-4 bg-gray-50/50">
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 line-clamp-2">
                                {item.title}
                            </h3>
                            
                            <div className="flex flex-col gap-2 my-2">
                                <div className="flex items-center text-sm md:text-base text-gray-600">
                                    <Clock className="w-5 h-5 mr-3 text-golden-dark" />
                                    <span>{item.date} • {item.time}</span>
                                </div>
                                <div className="flex items-center text-sm md:text-base text-gray-600">
                                    <MapPin className="w-5 h-5 mr-3 text-golden-dark" />
                                    <span className="line-clamp-1">{item.location}</span>
                                </div>
                            </div>

                            <p className="text-gray-600 leading-relaxed text-sm md:text-base line-clamp-3">
                                {item.description}
                            </p>

                            <Link href={`/events/${item.id}`} className="mt-2">
                                <Button className="bg-golden-dark hover:bg-golden-darkHover inline-flex items-center gap-2 w-fit px-6 py-3 rounded-md text-white text-sm font-medium transition">
                                    Event Details <ArrowRight size={16} />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Thumbnails */}
                {eventItems.length > 1 && (
                    <div className="mt-6 flex w-full md:justify-center md:items-center gap-4 overflow-x-auto py-2 px-4 md:px-0 scroll-smooth snap-x snap-mandatory">
                        {eventItems.map((n, i) => (
                            <button
                                key={n.id}
                                onClick={() => setActive(i)}
                                className={clsx(
                                    "relative flex-shrink-0 w-32 h-20 rounded-xl overflow-hidden border transition group",
                                    active === i
                                        ? "border-golden-dark ring-2 ring-golden-dark/30 shadow-md"
                                        : "border-transparent opacity-70 hover:opacity-100 hover:shadow-sm"
                                )}
                            >
                                <img
                                    src={n.image}
                                    alt={n.title}
                                    className="object-cover w-full h-full"
                                />
                                <div className={`absolute inset-0 bg-black transition-opacity ${active === i ? 'bg-opacity-10' : 'bg-opacity-40 group-hover:bg-opacity-20'}`}></div>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
