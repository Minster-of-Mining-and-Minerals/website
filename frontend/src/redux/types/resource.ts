export interface Resource {
    resource_id: string;
    sector: 'mining' | 'geology' | 'petroleum' | 'other';
    title: string;
    description: any;
    attachments?: {
        resource_attachment_id: string;
        resource_id: string;
        attachment_id: string;
        label: string;
        attachment?: {
            attachment_id: string;
            file_name: string;
            file_path: string;
            file_type: string;
            file_size: number;
        };
    }[];
    created_at?: string;
    updated_at?: string;
    deleted_at?: string | null;
}

export interface CreateResourcePayload {
    sector: string;
    title: string;
    description: any;
    attachments?: { attachment_id: string; label?: string }[];
}

export interface UpdateResourcePayload {
    sector?: string;
    title?: string;
    description?: any;
    attachments?: { attachment_id: string; label?: string }[];
}

export interface ResourceAccessPayload {
    resource_id: string;
}