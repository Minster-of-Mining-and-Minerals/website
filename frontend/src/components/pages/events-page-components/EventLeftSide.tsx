import { ChevronRight, Calendar as CalendarIcon } from "lucide-react";

type RelatedEventItem = {
    id: string | number;
    title: string;
    description: string;
    media: string;
    date: string;
    category: string;
};

type EventSidebarProps = {
    relatedEvents: RelatedEventItem[];
};

const EventLeftSide = ({ relatedEvents }: EventSidebarProps) => {

    return (
        <div className="space-y-8">
            {/* Related Events Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-bold text-[#094C81] mb-6 pb-3 border-b flex items-center gap-2">
                    <div className="w-1.5 h-6 bg-golden-dark rounded-full"></div>
                    More Events
                </h2>

                <div className="space-y-6">
                    {relatedEvents.length > 0 ? (
                        relatedEvents.map((item) => (
                            <a
                                key={item.id}
                                href={`/events/${item.id}`}
                                className="block group hover:bg-gray-50 -mx-2 p-2 rounded-lg transition-colors border border-transparent hover:border-gray-100"
                            >
                                <div className="flex gap-3 mb-1">
                                    <div className="flex-shrink-0">
                                        <div className="relative w-16 h-16 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
                                            {item?.media ? (
                                                <>
                                                    {(item.media as any).type === "image" ? (
                                                        <img
                                                            src={(item.media as any).url}
                                                            alt={item.title}
                                                            className="object-cover h-full w-full group-hover:scale-110 transition-transform duration-300"
                                                        />
                                                    ) : (
                                                        <video
                                                            src={(item.media as any).url}
                                                            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                            muted
                                                        />
                                                    )}
                                                </>
                                            ) : (
                                                <div className="text-gray-400">
                                                    <CalendarIcon size={20} />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-gray-900 group-hover:text-golden-dark mb-1 line-clamp-2 text-sm leading-snug">
                                            {item.title}
                                        </h3>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] text-gray-500 font-medium">{item.date}</span>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))
                    ) : (
                        <p className="text-sm text-gray-500 italic">No related events found.</p>
                    )}
                </div>

                <a
                    href="/events"
                    className="mt-6 flex items-center justify-center gap-2 text-golden-dark hover:text-golden-darkHover font-semibold text-sm py-2 border border-golden-dark/20 rounded-lg hover:bg-golden-dark/5 transition-colors"
                >
                    View All Events
                    <ChevronRight size={14} />
                </a>
            </div>
        </div>
    );
};

export default EventLeftSide;
