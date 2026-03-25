export interface Attachment {
    attachment_id: string;
    file_name?: string;
    file_path?: string;
    file_type?: string;
}

/* ================= CARD ================= */

export interface Card {
    card_id: string;
    title: string;
    description?: string | null;
    button_name?: string | null;
    button_url?: string | null;
    attachment_id?: string | null;
    attachment?: Attachment | null;
    created_at: string;
    updated_at: string;
}

/* ================= PAYLOADS ================= */

export interface CreateCardPayload {
    title: string;
    description?: string;
    button_name?: string;
    button_url?: string;
    attachment_id?: string;
}

export interface UpdateCardPayload {
    title?: string;
    description?: string;
    button_name?: string;
    button_url?: string;
    attachment_id?: string;
}