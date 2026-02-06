"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { Calendar, User, ChevronRight, MessageSquare, Star, MapPin, Users, Target, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { mockNewsData } from '@/datas/news-mock-data';
import NewsLeftSide from '@/components/pages/news-page-components/NewsLeftSide';

const NewsIdPage = () => {
    const params = useParams();
    const newsId = params.newsId as string;

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [fullName, setFullName] = useState('');
    const [comments, setComments] = useState<Array<{
        name: string;
        comment: string;
        date: string;
        rating: number;
    }>>([
        {
            name: "Samuel Tekle",
            comment: "This is a crucial step for Ethiopia's development. Proper management of mineral resources can transform our economy.",
            date: "2026-02-04",
            rating: 5
        },
        {
            name: "Mining Engineer",
            comment: "Hope to see practical implementation of these discussions. The mining sector needs clear regulations and support.",
            date: "2026-02-03",
            rating: 4
        }
    ]);

    // Find the news item
    const newsItem = mockNewsData.find(item => item.id === newsId);

    if (!newsItem) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-800 mb-4">News Not Found</h1>
                        <p className="text-gray-600">The requested news article is not available.</p>
                    </div>
                </div>
            </div>
        );
    }

    const handleSubmitFeedback = (e: React.FormEvent) => {
        e.preventDefault();
        if (!fullName.trim() || !comment.trim()) {
            alert('Please enter your full name and comment.');
            return;
        }

        const newComment = {
            name: fullName,
            comment: comment,
            date: new Date().toISOString().split('T')[0],
            rating: rating
        };

        setComments([newComment, ...comments]);
        setComment('');
        setFullName('');
        setRating(0);

        alert('Thank you for your feedback! Your comment has been submitted.');
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <button
                                onClick={() => window.history.back()}
                                className="flex items-center gap-2  py-2 text-gray-600 hover:text-golden-dark "
                            >
                                <span><ArrowLeft size={14} /></span> Back to News
                            </button>
                            <div className="flex md:items-center flex-col md:flex-row md:gap-2 mt-1">
                                <div className="flex items-center gap-1 text-gray-500 text-sm">
                                    <Calendar size={14} />
                                    <span>{formatDate(newsItem.date)}</span>
                                </div>
                                <span className="text-gray-500 text-sm hidden md:block">•</span>
                                <div className="flex items-center gap-1 text-gray-500 text-sm">
                                    <User size={14} />
                                    <span>{newsItem.author}</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto md:px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <article className="rounded-lg shadow-sm overflow-hidden mb-8">
                            {/* Featured Image */}

                            <div className="relative h-96 w-full">
                                {/* Image with lower z-index */}
                                <div className="absolute inset-0 z-0">
                                    <div className="relative h-full w-full">
                                        <Image
                                            src={newsItem.image}
                                            alt={newsItem.title}
                                            fill
                                            className="object-cover"
                                            priority
                                        />
                                    </div>
                                </div>

                                {/* Gradient overlay - above image but below text */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10"></div>

                                {/* Text content - above everything */}
                                <div className="relative h-full flex items-center justify-center z-20">
                                    <div className="text-center text-white p-8 max-w-4xl">

                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="prose prose-lg max-w-none mb-8">
                                    <div dangerouslySetInnerHTML={{ __html: newsItem.content }} />
                                </div>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-8 pt-6 border-t">
                                    <span className="text-gray-600 font-medium">Tags:</span>
                                    {newsItem.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 cursor-pointer"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
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
                                <div>
                                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name
                                    </label>
                                    <Input
                                        type="text"
                                        id="fullName"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="w-full h-11 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                                        Your Thoughts
                                    </label>
                                    <Textarea
                                        id="comment"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        rows={4}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Write your comment here..."
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="px-6 py-3 bg-golden-dark hover:bg-golden-darkHover"
                                >
                                    Submit Comment
                                </Button>
                            </form>

                            {/* Comments List */}
                            <div className="space-y-6">
                                {comments.map((item, index) => (
                                    <div key={index} className="border-b pb-6 last:border-0">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                    <span className="text-blue-600 font-semibold">
                                                        {item.name.charAt(0)}
                                                    </span>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900">{item.name}</h4>
                                                    <p className="text-sm text-gray-500">{item.date}</p>
                                                </div>
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
                        <NewsLeftSide relatedNews={newsItem.relatedNews} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default NewsIdPage;