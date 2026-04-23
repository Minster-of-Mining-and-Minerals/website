export interface RouteTranslation {
    route_translation_id: string;
    language_code: string;
    label: string;
}

export interface Route {
    route_id: string;
    path: string | null;
    parent_id?: string | null;
    is_active: boolean;
    show_in_navbar: boolean;
    order: number;

    translations?: RouteTranslation[];
    children?: Route[];
}

// Payloads
export interface UpdateRouteLabelsPayload {
    translations: {
        language_code: string;
        label: string;
    }[];
}

export interface ToggleRouteStatusPayload {
    is_active: boolean;
}