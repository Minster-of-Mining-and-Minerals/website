export interface NewsLink {
    news_id: string;
}

export interface Tag {
    tag_id: string;
    name: string;
    slug: string;
    created_at: string;
    news_links?: NewsLink[];
}

// Payloads
export interface CreateTagPayload {
    name: string;
    slug: string;
}

export interface UpdateTagPayload {
    name?: string;
    slug?: string;
}
