export interface PetroleumObjective {
    petroleum_objective_id: string;
    type: 'headline' | 'others';
    title: string;
    description: string;
    content?: string;
    objectives: string[];

    attachments?: {
        petroleum_attachment_id: string;
        label: string;
        attachment_id: string;
        attachment?: any;
    }[];

    created_at: string;
    updated_at: string;
}

export interface CreatePetroleumObjectivePayload {
    title: string;
    type: 'headline' | 'others';
    description: string;
    content?: string;
    objectives?: string[];

    attachments?: {
        attachment_id: string;
        label: string;
    }[];
}

export interface UpdatePetroleumObjectivePayload {
    title?: string;
    type?: 'headline' | 'others';
    description?: string;
    content?: string;
    objectives?: string[];

    attachments?: {
        attachment_id: string;
        label: string;
    }[];
}