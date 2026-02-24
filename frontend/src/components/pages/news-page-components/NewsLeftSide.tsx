"use client";
import { ChevronRight } from "lucide-react";

type RelatedNewsItem = {
    id: string | number;
    title: string;
    description: string;
    media: string;
    date: string;
    category: string;
};

type NewsSidebarProps = {
    relatedNews: RelatedNewsItem[];
};

const NewsLeftSide = ({ relatedNews }: NewsSidebarProps) => {
    console.log("relatedNews: ", relatedNews);
    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b">
                Related News
            </h2>

            <div className="space-y-6">
                {relatedNews.map((item) => (
                    <a
                        key={item.id}
                        href={`/news/${item.id}`}
                        className="block group hover:bg-gray-50 p-3 rounded-lg transition-colors"
                    >
                        <div className="flex gap-3 mb-3">
                            <div className="flex-shrink-0">
                                <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                                    {/* IMAGE */}
                                    {item?.media?.type === "image" && (
                                        <img
                                            src={item?.media?.url}
                                            alt={item.title}
                                            className="object-cover h-full w-full"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                    )}

                                    {/* VIDEO */}
                                    {item?.media?.type === "video" && (
                                        <video
                                            src={item?.media?.url}
                                            className="h-full w-full object-cover"
                                            muted
                                            loop
                                            playsInline
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-1 line-clamp-2 text-sm">
                                    {item.title}
                                </h3>
                                <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                                    {item.description}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-500">{item.date}</span>
                                    <div className="flex items-center gap-1">
                                        <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded">
                                            {item.category}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                ))}
            </div>

            <a
                href="/news"
                className="mt-6 inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
                View All News
                <ChevronRight size={14} />
            </a>
        </div>
    );
};

export default NewsLeftSide;