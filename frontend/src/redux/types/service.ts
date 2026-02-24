export interface Service {
    service_id: string;
    icon: string;
    title: string;
    content: string;
    created_at: string;
}

export interface CreateServicePayload {
    icon: string;
    title: string;
    content: string;
}

export interface UpdateServicePayload {
    icon?: string;
    title?: string;
    content?: string;
}