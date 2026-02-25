
export interface CreateLeadershipPayload {
    header?: string;
    parent_id?: string | null;
    name: string;
    title: string;
    description?: string;
    level?: number;
    attachments?: { attachment_id: string }[];
}

export interface UpdateLeadershipPayload {
    header?: string;
    parent_id?: string | null;
    name?: string;
    title?: string;
    description?: string;
    level?: number;
    attachment_ids?: string[];
}

// Leadership type
export interface Leadership {
    leadership_id: string;
    header: string;
    parent_id?: string | null;
    name: string;
    title: string;
    description?: string;
    level: number;
    is_active: boolean;
    attachments?: { attachment_id: string; file_path?: string }[];
    created_at: string;
    updated_at: string;
    deleted_at?: string | null;
}
