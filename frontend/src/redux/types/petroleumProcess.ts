export interface Step {
    step_id?: string;
    description: string;
    attachment_id: string;
    attachment?: any;
    order?: number;
}

export interface ProcessStep {
    process_step_id?: string;
    title: string;
    description?: string | null;
    content?: any;
    steps?: Step[];
}

export interface ProcessBlockAttachment {
    process_block_attachment_id?: string;
    attachment_id: string;
    label: string;
    attachment?: any;
}

export interface ProcessBlock {
    process_block_id?: string;
    title: string;
    description?: string | null;
    content?: any;
    attachments?: ProcessBlockAttachment[];
}

export interface PetroleumProcess {
    petroleum_process_id: string;
    title: string;
    description?: string | null;
    published: boolean;
    process_steps?: ProcessStep[];
    process_blocks?: ProcessBlock[];
}

/* ================= PAYLOADS ================= */

export type CreatePetroleumProcessPayload = {
    title: string;
    description?: string | null;
    process_steps?: ProcessStep[];
    process_blocks?: ProcessBlock[];
};

export type UpdatePetroleumProcessPayload = {
    title?: string;
    description?: string | null;
    process_steps?: ProcessStep[];
    process_blocks?: ProcessBlock[];
};