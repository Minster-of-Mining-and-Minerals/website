/* ================= STRATEGY ================= */

export interface InvestigationStrategy {
    investigation_strategy_id?: string;

    icon?: string;
    title: string;
    description?: string;
    content?: string;

    tags?: string[];

    attachment_id?: string | null;
    link?: string;

    bg_color?: string;
    fg_color?: string;
}

/* ================= ACTION ================= */

export interface InvestigationAction {
    investigation_action_id?: string;

    title: string;
    description: string;
    action: string;
    link: string;
}

/* ================= MAIN ================= */

export interface InvestigateEthiopia {
    investigate_ethiopia_id: string;

    headlines?: InvestigationStrategy[];
    strategic_minerals?: InvestigationStrategy[];
    autonomy?: InvestigationStrategy[];
    autonomous_institutions?: InvestigationStrategy[];
    strategic_pillars?: InvestigationStrategy[];
    ambition?: InvestigationStrategy[];
    global_proclamation?: InvestigationStrategy[];

    investigation_action?: InvestigationAction[];

    created_at: string;
    updated_at: string;
}

/* ================= PAYLOADS ================= */

export interface CreateInvestigateEthiopiaPayload {
    headlines?: InvestigationStrategy[];
    strategic_minerals?: InvestigationStrategy[];
    autonomy?: InvestigationStrategy[];
    autonomous_institutions?: InvestigationStrategy[];
    strategic_pillars?: InvestigationStrategy[];
    ambition?: InvestigationStrategy[];
    global_proclamation?: InvestigationStrategy[];

    investigation_action?: InvestigationAction[];
}

export type UpdateInvestigateEthiopiaPayload =
    CreateInvestigateEthiopiaPayload;