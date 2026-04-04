export interface SnapshotSection {
    section_id?: string;
    title: string;
    content: string;
}

export interface Snapshot {
    snapshot_id: string;
    title: string;
    sector: "mining" | "geothermal" | "petroleum" | "others";
    description_one: string;
    description_two: string;
    attachment_id: string;
    attachment_description?: string | null;
    is_published: boolean;
    attachment?: {
        file_path: string;
    };
    sections?: SnapshotSection[];
    created_at?: string;
    updated_at?: string;
}

export interface CreateSnapshotPayload {
    title: string;
    sector: "mining" | "geothermal" | "petroleum" | "others";
    description_one: string;
    description_two: string;
    attachment_id: string;
    attachment_description?: string | null;
    sections?: SnapshotSection[];
}

export interface UpdateSnapshotPayload {
    title?: string;
    sector?: "mining" | "geothermal" | "petroleum" | "others";
    description_one?: string;
    description_two?: string;
    attachment_id?: string;
    attachment_description?: string | null;
    sections?: SnapshotSection[];
}