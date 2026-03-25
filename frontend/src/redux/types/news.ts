export interface AttachmentLink {
    attachment_id: string;
    category: string;
    attachment?: any;
}

export interface TagLink {
    tag_id: string;
    tag?: {
        name: string;
    };
}

export interface News {
    news_id: string;
    title: string;
    content: any; // Quill Delta JSON
    author?: string;
    created_at: string;
    updated_at: string;
    deleted_at?: string;
    attachments?: AttachmentLink[];
    tag_links?: TagLink[];
    reactions?: any[];
    reads?: any[];
    metadata?: any;
}

type QuillDelta = {
    ops: any[];
};


// Payloads
export interface CreateNewsPayload {
    title: string;
    author?: string;
    content: QuillDelta;
    attachments?: string[];
    tags?: string[];
}

export interface UpdateNewsPayload {
    title: string;
    author: string;
    content: any; // Your Quill Delta content
    attachment_ids?: Array<{
        attachment_id: string;
        category: "headline" | "footer" | "body";
    }>;
    tag_ids?: string[];
}

export interface NewsReactionPayload {
    news_id: string;
    reaction: "like" | "dislike";
}

export interface NewsReadPayload {
    news_id: string;
    read_time: number; // in seconds
}

// ===========================
// NEWS FEEDBACK TYPES
// ===========================

export interface NewsFeedback {
    news_feedback_id: string;
    news_id: string;
    fullname: string;
    thought: string;
    created_at: string;
}

export interface CreateNewsFeedbackPayload {
    news_id: string;
    fullname: string;
    thought: string;
}
