"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useGetNewsByIdQuery } from "@/redux/api/newsApi";
import { Calendar, User, ArrowLeft, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import NewsLeftSide from "@/components/pages/news-page-components/NewsLeftSide";
import { mapRelatedNews } from "@/utils/mapRelatedNews";
import NewsMediaGallery from "../components/NewsMediaGallery";
import NewsContentRenderer from "../components/NewsContentRenderer";
import NewsDocuments from "../components/NewsDocuments";

const NewsDetail = () => {
    const params = useParams();
    const newsId = params.newsId as string;
    const { data: newsItem, isLoading, isError } = useGetNewsByIdQuery(newsId);

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [fullName, setFullName] = useState("");
    const [comments, setComments] = useState<
        { name: string; comment: string; date: string; rating: number }[]
    >([]);

    console.log(newsItem)

    if (isLoading) return <div className="text-center py-12">Loading...</div>;
    if (isError || !newsItem)
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">News Not Found</h1>
                    <p className="text-gray-600">The requested news article is not available.</p>
                </div>
            </div>
        );

    const handleSubmitFeedback = (e: React.FormEvent) => {
        e.preventDefault();
        if (!fullName.trim() || !comment.trim()) {
            alert("Please enter your full name and comment.");
            return;
        }

        const newComment = {
            name: fullName,
            comment,
            date: new Date().toISOString().split("T")[0],
            rating,
        };

        setComments([newComment, ...comments]);
        setComment("");
        setFullName("");
        setRating(0);
        alert("Thank you for your feedback! Your comment has been submitted.");
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="max-w-7xl mx-auto px-4 py-6">
                <button
                    onClick={() => window.history.back()}
                    className="flex items-center gap-2 py-2 text-gray-600 hover:text-golden-dark"
                >
                    <ArrowLeft size={14} /> Back to News
                </button>
                <div className="flex md:items-center flex-col md:flex-row md:gap-2 mt-1">
                    <div className="flex items-center gap-1 text-gray-500 text-sm">
                        <Calendar size={14} />
                        <span>{formatDate(newsItem.created_at)}</span>
                    </div>
                    <span className="text-gray-500 text-sm hidden md:block">•</span>
                    <div className="flex items-center gap-1 text-gray-500 text-sm">
                        <User size={14} />
                        <span>{newsItem.author}</span>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto md:px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <article className="rounded-lg shadow-sm overflow-hidden bg-white">
                            {/* Headline Media Gallery */}
                            <NewsMediaGallery
                                attachments={newsItem.attachments || []}
                                title={newsItem.title}
                            />

                            {/* Content */}
                            <div className="p-6">
                                <h1 className="text-3xl font-bold mb-4">{newsItem.title}</h1>

                                {/* Dynamic Content Renderer */}
                                <NewsContentRenderer content={newsItem.content} />

                                {/* Tags */}
                                {newsItem.tag_links && newsItem.tag_links.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-8 pt-6 border-t">
                                        <span className="text-gray-600 font-medium">Tags:</span>
                                        {newsItem.tag_links?.map((tagLink: any) => (
                                            <span
                                                key={tagLink.tag.tag_id}
                                                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 cursor-pointer"
                                            >
                                                #{tagLink.tag.name}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Footer Documents */}
                                <NewsDocuments attachments={newsItem.attachments || []} />
                            </div>
                        </article>

                        {/* Feedback Section */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900">Article Feedback</h2>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <MessageSquare size={18} />
                                    <span>{comments.length} Comments</span>
                                </div>
                            </div>

                            {/* Comment Form */}
                            <form onSubmit={handleSubmitFeedback} className="space-y-4 mb-8">
                                <Input
                                    placeholder="Full Name"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                                <Textarea
                                    placeholder="Your Thoughts"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    rows={4}
                                />
                                <Button type="submit" className="px-6 py-3 bg-golden-dark hover:bg-golden-darkHover">
                                    Submit Comment
                                </Button>
                            </form>

                            {/* Comments List */}
                            <div className="space-y-6">
                                {comments.map((item, idx) => (
                                    <div key={idx} className="border-b pb-6 last:border-0">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                <span className="text-blue-600 font-semibold">{item.name.charAt(0)}</span>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900">{item.name}</h4>
                                                <p className="text-sm text-gray-500">{item.date}</p>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 mt-3">{item.comment}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <NewsLeftSide relatedNews={mapRelatedNews(newsItem.relatedNews)} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default NewsDetail;