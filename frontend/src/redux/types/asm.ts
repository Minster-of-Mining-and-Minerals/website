/* ================= TYPES ================= */
export interface ASMObjective {
    icon?: string;
    title: string;
    description?: string;
    content?: string;
    foot_note?: string;
}

export interface ASMAttachment {
    attachment_id: string;
    label: string;
}

export interface ASMPreview {
    preview_id?: string;
    icon?: string;
    title: string;
    description?: string;
    attachment_id?: string | null;
    attachment?: any;
}

export interface ASM {
    asm_id: string;

    attachments?: any[];

    headlines?: ASMObjective[];
    strategic_objective?: ASMObjective[];
    economic_impact?: ASMObjective[];
    impact_contribution?: ASMObjective[];
    strategic_pillars?: ASMObjective[];
    key_initiatives?: ASMObjective[];
    objectives?: ASMObjective[];
    previews?: ASMPreview[];

    created_at: string;
    updated_at: string;
}

/* ================= PAYLOADS ================= */

export interface CreateASMPayload {
    attachments?: ASMAttachment[];

    headlines?: ASMObjective[];
    strategic_objective?: ASMObjective[];
    economic_impact?: ASMObjective[];
    impact_contribution?: ASMObjective[];
    strategic_pillars?: ASMObjective[];
    key_initiatives?: ASMObjective[];
    objectives?: ASMObjective[];
    previews?: ASMPreview[];
}

export type UpdateASMPayload = CreateASMPayload;