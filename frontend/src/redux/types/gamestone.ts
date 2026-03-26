export interface GamestoneAttachment {
    attachment_id: string;
}

export interface Gamestone {
    gamestone_id: string;
    title: string;
    description?: string;
    location?: string | null;
    attachment_id?: string | null;
    discovered_date?: string | null;
    parent_id?: string | null;

    attachment?: any; // main image
    attachments?: {
        attachment: any;
    }[];

    sub_items?: Gamestone[];
    parent?: Gamestone;

    created_at: string;
    updated_at: string;
    deleted_at?: string | null;
}

/* ================= PAYLOADS ================= */

export interface CreateGamestonePayload {
    title: string;
    description?: string;
    location?: string | null;
    attachment_id?: string | null;
    discovered_date?: string | null;
    parent_id?: string | null;

    attachments?: {
        attachment_id: string;
    }[];
}

export interface UpdateGamestonePayload {
    title?: string;
    description?: string;
    location?: string | null;
    attachment_id?: string | null;
    discovered_date?: string | null;
    parent_id?: string | null;

    attachments?: {
        attachment_id: string;
    }[];
}