export interface Slider {
    slider_id: string;
    title: string;
    description?: string | null;
    attachment_id?: string | null;
    order: number;
    attachment?: {
        attachment_id: string;
        file_path?: string;
    };
    created_at: string;
    updated_at: string;
}

export interface CreateSliderPayload {
    title: string;
    description?: string;
    attachment_id?: string;
    order?: number;
}

export interface UpdateSliderPayload {
    title?: string;
    description?: string;
    attachment_id?: string;
    order?: number;
}