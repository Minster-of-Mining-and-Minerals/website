// ===========================
// EVENT CATEGORY TYPES
// ===========================

export interface EventCategory {
  event_category_id: string;
  event_id: string;
  category: string;
}

export interface CreateEventCategoryPayload {
  event_id: string;
  categories: string[];
}

export interface ReplaceEventCategoryPayload {
  event_id: string;
  categories: string[];
}

export interface UpdateEventCategoryPayload {
  category: string;
}
