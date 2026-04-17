"use client";

import React, { useState } from "react";
import { MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useGetNewsFeedbackCountQuery, useRecordNewsFeedbackMutation, useGetNewsFeedbacksQuery } from "@/redux/api/newsApi";
import { toast } from "sonner";
import { UserCircle2 } from "lucide-react";

interface NewsFeedbackProps {
    newsId: string;
}

const NewsFeedback: React.FC<NewsFeedbackProps> = ({ newsId }) => {
    const [fullname, setFullname] = useState("");
    const [thought, setThought] = useState("");

    const [recordFeedback, { isLoading }] = useRecordNewsFeedbackMutation();
    const { data: feedbackCount } = useGetNewsFeedbackCountQuery(newsId);
    const { data: feedbacks = [] } = useGetNewsFeedbacksQuery({ news_id: newsId });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!fullname.trim() || !thought.trim()) {
            return toast.error("Full name and thought are required.");
        }

        try {
            await recordFeedback({
                news_id: newsId,
                fullname,
                thought,
            }).unwrap();

            toast.success("Thank you! Your feedback has been submitted for review.");
            setFullname("");
            setThought("");
        } catch (error) {
            console.error("Feedback submit failed:", error);
            toast.error("Failed to submit feedback. Please try again.");
        }
    };

    return (
        <div id="feedback-section" className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Article Feedback</h2>
                    <div className="flex items-center gap-2 text-gray-600">
                        <MessageSquare size={18} />
                        <span>{feedbackCount?.feedback_count} Comments</span>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        placeholder="Full Name"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        className="focus-visible:ring-golden-dark"
                    />

                    <Textarea
                        placeholder="Your thoughts about this article..."
                        value={thought}
                        onChange={(e) => setThought(e.target.value)}
                        rows={4}
                        className="focus-visible:ring-golden-dark"
                    />

                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="bg-golden-dark hover:bg-golden-darkHover text-white px-8"
                        >
                            {isLoading ? "Submitting..." : "Post Comment"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewsFeedback;