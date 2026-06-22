"use client";

import { ChevronRight, UserCircle2, MessageSquare } from "lucide-react";
import { NewsFeedback } from "@/redux/types/news";
import PublicEmptyState from "@/components/common/PublicEmptyState";
import { useTranslations } from "next-intl";

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
    feedbacks?: NewsFeedback[];
};

const NewsLeftSide = ({ relatedNews, feedbacks = [] }: NewsSidebarProps) => {
    const t = useTranslations("empty_state");
    const displayedFeedbacks = feedbacks.slice(0, 5);
    const hasMoreFeedbacks = feedbacks.length > 5;

    return (
        <div className="space-y-8">
            {/* Related News Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-bold text-[#094C81] mb-6 pb-3 border-b flex items-center gap-2">
                    <div className="w-1.5 h-6 bg-golden-dark rounded-full"></div>
                    Related News
                </h2>

                <div className="space-y-6">
                    {relatedNews.length > 0 ? (
                        relatedNews.map((item) => (
                            <a
                                key={item.id}
                                href={`/news/${item.id}`}
                                className="block group hover:bg-gray-50 -mx-2 p-2 rounded-lg transition-colors border border-transparent hover:border-gray-100"
                            >
                                <div className="flex gap-3 mb-1">
                                    <div className="flex-shrink-0">
                                        <div className="relative w-16 h-16 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
                                            {item?.media ? (
                                                <>
                                                    {item.media.type === "image" ? (
                                                        <img
                                                            src={item.media.url}
                                                            alt={item.title}
                                                            className="object-cover h-full w-full group-hover:scale-110 transition-transform duration-300"
                                                        />
                                                    ) : (
                                                        <video
                                                            src={item.media.url}
                                                            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                            muted
                                                        />
                                                    )}
                                                </>
                                            ) : (
                                                <div className="text-gray-400">
                                                    <MessageSquare size={20} />
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
                        <PublicEmptyState
                            variant="inline"
                            title={t("related_news_title")}
                            hideDescription
                        />
                    )}
                </div>

                <a
                    href="/news"
                    className="mt-6 flex items-center justify-center gap-2 text-golden-dark hover:text-golden-darkHover font-semibold text-sm py-2 border border-golden-dark/20 rounded-lg hover:bg-golden-dark/5 transition-colors"
                >
                    View All News
                    <ChevronRight size={14} />
                </a>
            </div>

            {/* Published Feedbacks Section */}
            {feedbacks.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-lg font-bold text-[#094C81] mb-6 pb-3 border-b flex items-center gap-2">
                        <div className="w-1.5 h-6 bg-golden-dark rounded-full"></div>
                        Recent Feedbacks
                    </h2>

                    <div className="space-y-6">
                        {displayedFeedbacks.map((item) => (
                            <div key={item.news_feedback_id} className="group">
                                <div className="flex gap-3">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 rounded-full bg-golden-dark/10 flex items-center justify-center text-golden-dark border border-golden-dark/20">
                                            <UserCircle2 size={18} />
                                        </div>
                                    </div>
                                    <div className="flex-grow space-y-1">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-bold text-gray-900 text-xs truncate max-w-[120px]">
                                                {item.fullname}
                                            </h4>
                                            <span className="text-[10px] text-gray-400">
                                                {new Date(item.created_at).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric"
                                                })}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 text-[11px] leading-relaxed line-clamp-2 italic">
                                            "{item.thought}"
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {hasMoreFeedbacks && (
                        <button
                            onClick={() => {
                                const feedbackSection = document.getElementById('feedback-section');
                                if (feedbackSection) feedbackSection.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="mt-6 flex items-center justify-center gap-2 text-golden-dark hover:text-golden-darkHover font-semibold text-sm w-full py-2 border border-golden-dark/20 rounded-lg hover:bg-golden-dark/5 transition-colors"
                        >
                            View All Feedbacks ({feedbacks.length})
                            <ChevronRight size={14} />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default NewsLeftSide;