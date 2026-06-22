"use client";
import { useGetEventByIdQuery } from "@/redux/api/eventApi";
import { Calendar, MapPin, ArrowLeft, Clock, User, Globe } from "lucide-react";
import React from "react";
import { useParams } from "next/navigation";
import { mapRelatedNews } from "@/utils/mapRelatedNews";
import { formatLongDate, formatTime } from "@/utils/datetime";
import EventMediaGallery from "./components/EventMediaGallery";
import NewsContentRenderer from "@/features/components/NewsContentRenderer";
import NewsDocuments from "../components/NewsDocuments";
import EventLeftSide from "@/components/pages/events-page-components/EventLeftSide";
// import EventLeftSide from "@/components/pages/events-page-components/EventLeftSide";
// import NewsDocuments from "@/features/news/components/NewsDocuments";

const EventDetail = () => {
    const params = useParams();
    const eventId = params.eventId as string;
    const { data: eventItem, isLoading, isError } = useGetEventByIdQuery(eventId, {
        skip: !eventId
    });

    if (isLoading) return <div className="text-center py-12">Loading...</div>;
    
    if (isError || !eventItem) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Event Not Found</h1>
                    <p className="text-gray-600">The requested event is not available or has been removed.</p>
                </div>
            </div>
        );
    }

    // Status color mapping
    const getStatusColor = (status: string) => {
        switch(status?.toLowerCase()) {
            case 'ongoing': return 'bg-green-600/90';
            case 'upcoming': return 'bg-blue-600/90';
            case 'completed': return 'bg-gray-700/90';
            case 'cancelled': return 'bg-red-600/90';
            case 'scheduled': return 'bg-blue-500/90';
            default: return 'bg-golden-dark/90';
        }
    };
    
    const displayStatus = (eventItem as any).computed_status || eventItem.status;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="max-w-7xl mx-auto px-4 py-6">
                <button
                    onClick={() => window.history.back()}
                    className="flex items-center gap-2 py-2 text-gray-600 hover:text-golden-dark"
                >
                    <ArrowLeft size={14} /> Back to Events
                </button>
                <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 mt-2">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full text-white ${getStatusColor(displayStatus)}`}>
                         {(displayStatus || "").charAt(0).toUpperCase() + (displayStatus || "").slice(1)}
                    </span>
                    <div className="flex items-center gap-1 text-gray-500 text-sm border-l md:pl-4 pl-0 border-transparent md:border-gray-300">
                        <Calendar size={14} className="text-golden-dark" />
                        <span>{formatLongDate(eventItem.start_time)}</span>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto md:px-4 py-4 md:py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <article className="rounded-lg shadow-sm overflow-hidden bg-white px-2">
                            {/* Headline Media Gallery - Repurposed from News */}
                            <EventMediaGallery
                                attachments={eventItem.attachments || []}
                                title={eventItem.title}
                            />

                            {/* Content */}
                            <div className="p-4 md:p-6">
                                <div className="mb-6 flex flex-wrap gap-2">
                                     {eventItem.category?.name && (
                                         <span className="px-3 py-1 bg-[#094C81]/10 text-[#094C81] text-xs font-semibold rounded-md">
                                             {eventItem.category.name}
                                         </span>
                                     )}
                                </div>
                                <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 leading-snug">{eventItem.title}</h1>
                                
                                {/* Event Quick Info Card */}
                                <div className="bg-gray-50 rounded-xl p-5 mb-8 border border-gray-100 flex flex-col md:flex-row flex-wrap gap-y-4 gap-x-8">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-0.5 p-2 bg-white rounded-lg shadow-sm text-golden-dark">
                                            <Clock size={18} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">Time</p>
                                            <p className="text-sm font-medium text-gray-900">
                                                {formatLongDate(eventItem.start_time)} at {formatTime(eventItem.start_time)}
                                            </p>
                                            {(eventItem.start_time !== eventItem.end_time) && (
                                                <p className="text-sm text-gray-600">
                                                    to {formatLongDate(eventItem.end_time)} at {formatTime(eventItem.end_time)}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    
                                    {eventItem.location && (
                                        <div className="flex items-start gap-3">
                                            <div className="mt-0.5 p-2 bg-white rounded-lg shadow-sm text-golden-dark">
                                                <MapPin size={18} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">Location</p>
                                                <p className="text-sm font-medium text-gray-900 max-w-[200px]">{eventItem.location}</p>
                                            </div>
                                        </div>
                                    )}

                                    {eventItem.virtual_link && (
                                         <div className="flex items-start gap-3">
                                         <div className="mt-0.5 p-2 bg-white rounded-lg shadow-sm text-golden-dark">
                                             <Globe size={18} />
                                         </div>
                                         <div>
                                             <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">Virtual</p>
                                             <a href={eventItem.virtual_link} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-blue-600 hover:underline max-w-[200px] block truncate">
                                                Join Meeting
                                             </a>
                                         </div>
                                     </div>
                                    )}

                                    {eventItem.organizer && (
                                        <div className="flex items-start gap-3">
                                            <div className="mt-0.5 p-2 bg-white rounded-lg shadow-sm text-golden-dark">
                                                <User size={18} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">Organizer</p>
                                                <p className="text-sm font-medium text-gray-900 max-w-[200px]">{eventItem.organizer}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Dynamic Content Renderer */}
                                <div className="mt-8 pt-6 border-t border-gray-100">
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">About this Event</h2>
                                    <NewsContentRenderer content={eventItem.content} />
                                </div>

                                {/* Footer Documents */}
                                <NewsDocuments attachments={eventItem.attachments || []} />
                            </div>
                        </article>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <EventLeftSide
                             // Reuse mapRelatedNews for events as the data structure is very similar
                            relatedEvents={mapRelatedNews((eventItem as any).relatedEvents)} 
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default EventDetail;
