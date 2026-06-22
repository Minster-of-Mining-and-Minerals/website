export interface Slider {
    slider_id: string;
    title: string;
    description?: string | null;
    attachment_id?: string | null;
    order: number;
    button_name?: string | null;
    button_url?: string | null;
    button2_name?: string | null;
    button2_url?: string | null;
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
    button_name?: string;
    button_url?: string;
    button2_name?: string;
    button2_url?: string;
}

export interface UpdateSliderPayload {
    title?: string;
    description?: string;
    attachment_id?: string;
    order?: number;
    button_name?: string;
    button_url?: string;
    button2_name?: string;
    button2_url?: string;
}