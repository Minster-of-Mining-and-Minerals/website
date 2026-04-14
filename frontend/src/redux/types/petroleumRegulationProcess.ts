export interface PetroleumRegulation {
    petroleum_regulation_id: string;
    order: number;
    title: string;
    description: string;
    content: any[];
    objectives: any[];
    bullet_points: any[];
    steps: any[];
}

export interface PetroleumDirective {
    petroleum_directive_id: string;
    order: number;
    title: string;
    description: string;
    type: "main" | "sub";
    action_label?: string;
    action?: string;
}

export interface PetroleumRegulationAttachment {
    petroleum_regulation_attachment_id: string;
    label: string;
    attachment_id: string;
    attachment?: any;
}

export interface PetroleumRegulationProcess {
    petroleum_regulation_process_id: string;
    published?: boolean;
    regulations: PetroleumRegulation[];
    directives: PetroleumDirective[];
    attachments: PetroleumRegulationAttachment[];
}

/* ========= PAYLOADS ========= */

export interface CreatePetroleumRegulationProcessPayload {
    regulations?: Partial<PetroleumRegulation>[];
    directives?: Partial<PetroleumDirective>[];
    attachments?: {
        attachment_id: string;
        label: string;
    }[];
}

export interface UpdatePetroleumRegulationProcessPayload
    extends CreatePetroleumRegulationProcessPayload { }