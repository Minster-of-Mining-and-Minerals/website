export interface PartnerAttachment {
    attachment_id: string;
    category?: "logo" | "gallery" | "document";
}

export interface Partner {
    partner_id: string;
    title: string;
    description?: string;
    attachments?: {
        attachment: any;
        category: string;
    }[];
}

export interface CreatePartnerPayload {
    title: string;
    description?: string;
    attachments?: PartnerAttachment[];
}

export interface UpdatePartnerPayload {
    title?: string;
    description?: string;
    attachments?: PartnerAttachment[];
}