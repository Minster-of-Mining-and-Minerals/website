// types/miningRegulationProcess.ts

export interface Attachment {
    attachment_id: string;
    file_name?: string;
    file_url?: string;
    mime_type?: string;
    file_size?: number;
}

export interface MiningFramework {
    mining_framework_id: string;
    mining_regulation_process_id: string;
    title: string;
    description: string;
    objectives: string[];
    attachment_id: string | null;
    attachment_overlay_text: string;
    attachment_overlay_color: string;
    attachment?: Attachment;
    created_at: string;
    updated_at: string;
    deleted_at?: string;
}

export interface MiningGuidelineContent {
    mining_guideline_content_id: string;
    mining_guideline_id: string;
    type: "card" | "bullet" | "others";
    bg_color: string | null;
    icon: string | null;
    stamp: string | null;
    title: string;
    description: string | null;
    created_at: string;
    updated_at: string;
    deleted_at?: string;
}

export interface MiningGuidelineAttachment {
    mining_guideline_attachment_id: string;
    mining_guideline_id: string;
    attachment_id: string;
    label: string;
    attachment?: Attachment;
    created_at: string;
}

export interface MiningGuideline {
    mining_guideline_id: string;
    mining_regulation_process_id: string;
    icon: string | null;
    title: string;
    description: string | null;
    contents?: MiningGuidelineContent[];
    attachments?: MiningGuidelineAttachment[];
    created_at: string;
    updated_at: string;
    deleted_at?: string;
}

export interface MiningServiceCard {
    mining_service_card_id: string;
    mining_service_id: string;
    title: string;
    sub_title: string | null;
    sub_title_color: string;
    icon: string | null;
    description: string;
    requirements: string[];
    created_at: string;
    updated_at: string;
    deleted_at?: string;
}

export interface MiningService {
    mining_service_id: string;
    mining_regulation_process_id: string;
    title: string;
    description: string | null;
    service_cards?: MiningServiceCard[];
    created_at: string;
    updated_at: string;
    deleted_at?: string;
}

export interface MiningRegulationProcess {
    mining_regulation_process_id: string;
    title: string;
    description: string;
    publish: boolean;
    frameworks?: MiningFramework[];
    guidelines?: MiningGuideline[];
    services?: MiningService[];
    created_at: string;
    updated_at: string;
    deleted_at?: string;
}

/* ================= PAYLOAD TYPES ================= */

export interface CreateFrameworkPayload {
    title: string;
    description: string;
    objectives?: string[];
    attachment_id?: string | null;
    attachment_overlay_text?: string;
    attachment_overlay_color?: string;
}

export interface CreateGuidelineContentPayload {
    type?: "card" | "bullet" | "others";
    bg_color?: string | null;
    icon?: string | null;
    stamp?: string | null;
    title: string;
    description?: string | null;
}

export interface CreateGuidelineAttachmentPayload {
    attachment_id: string;
    label: string;
}

export interface CreateGuidelinePayload {
    icon?: string | null;
    title: string;
    description?: string | null;
    contents?: CreateGuidelineContentPayload[];
    attachments?: CreateGuidelineAttachmentPayload[];
}

export interface CreateServiceCardPayload {
    title: string;
    sub_title?: string | null;
    sub_title_color?: string;
    icon?: string | null;
    description: string;
    requirements?: string[];
}

export interface CreateServicePayload {
    title: string;
    description?: string | null;
    service_cards?: CreateServiceCardPayload[];
}

export interface CreateMiningRegulationProcessPayload {
    title: string;
    description: string;
    publish?: boolean;
    frameworks?: CreateFrameworkPayload[];
    guidelines?: CreateGuidelinePayload[];
    services?: CreateServicePayload[];
}

export interface UpdateFrameworkPayload extends Partial<CreateFrameworkPayload> {}
export interface UpdateGuidelinePayload extends Partial<CreateGuidelinePayload> {}
export interface UpdateServicePayload extends Partial<CreateServicePayload> {}

export interface UpdateMiningRegulationProcessPayload {
    title?: string;
    description?: string;
    publish?: boolean;
    frameworks?: UpdateFrameworkPayload[];
    guidelines?: UpdateGuidelinePayload[];
    services?: UpdateServicePayload[];
}

export interface TogglePublishPayload {
    publish: boolean;
}