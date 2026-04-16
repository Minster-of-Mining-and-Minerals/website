export interface MiningApplicationAttachment {
    attachment_id: string;
    overlay_text: string;
    overlay_icon: string;
}

export interface MiningApplicationType {
    icon: string;
    title: string;
    requirements: string[];
    steps: string[];
    action_label: string;
    action_url: string;
    color?: string | null;
}

export interface MiningApplicationProcess {
    mining_application_process_id: string;
    title: string;
    description?: string;
    objectives: string[];
    attachments: MiningApplicationAttachment[];
    application_types: MiningApplicationType[];
    publish: boolean;
    created_at: string;
    updated_at: string;
}

/* ================= PAYLOADS ================= */

export interface CreateMiningApplicationProcessPayload {
    title: string;
    description?: string;
    objectives?: string[];
    attachments?: MiningApplicationAttachment[];
    application_types?: MiningApplicationType[];
    publish?: boolean;
}

export interface UpdateMiningApplicationProcessPayload {
    title?: string;
    description?: string;
    objectives?: string[];
    attachments?: MiningApplicationAttachment[];
    application_types?: MiningApplicationType[];
    publish?: boolean;
}

export interface TogglePublishPayload {
    publish: boolean;
}