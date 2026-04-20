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
<<<<<<< HEAD
    title: string;
    content: any; // Quill Delta JSON
    author?: string;
=======
    description: string;
>>>>>>> c6b5a12ca2fb87bcbe1c0e8702430b6289687674
    created_at: string;
    updated_at: string;
    deleted_at?: string;
    attachments?: AttachmentLink[];
    tag_links?: TagLink[];
    reactions?: any[];
    reads?: any[];
    metadata?: any;
<<<<<<< HEAD
    status: "draft" | "published" | "archived";
    published_at?: string;
=======
>>>>>>> c6b5a12ca2fb87bcbe1c0e8702430b6289687674
}

type QuillDelta = {
    ops: any[];
};


// Payloads
export interface CreateNewsPayload {
    title: string;
    author?: string;
<<<<<<< HEAD
    content: any; // Can be Quill Delta or HTML string
    attachments?: Array<{
        attachment_id: string;
        category: "headline" | "footer" | "body";
    }> | any[];
    tags?: string[];
    status?: "draft" | "published" | "archived";
    published_at?: string;
=======
    content: QuillDelta;
    attachments?: string[];
    tags?: string[];
>>>>>>> c6b5a12ca2fb87bcbe1c0e8702430b6289687674
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
<<<<<<< HEAD
    status?: "draft" | "published" | "archived";
    published_at?: string;
=======
>>>>>>> c6b5a12ca2fb87bcbe1c0e8702430b6289687674
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
