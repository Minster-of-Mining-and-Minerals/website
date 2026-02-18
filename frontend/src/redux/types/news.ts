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
    description: string;
    created_at: string;
    updated_at: string;
    deleted_at?: string;
    attachments?: AttachmentLink[];
    tag_links?: TagLink[];
    reactions?: any[];
    reads?: any[];
    metadata?: any;
}

// Payloads
export interface CreateNewsPayload {
    description: string;
    attachment_ids?: string[];
    tag_ids?: string[];
}

export interface UpdateNewsPayload {
    description?: string;
    attachment_ids?: string[];
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
