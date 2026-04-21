// ===========================
// EVENT CATEGORY TYPES
// ===========================

/** Standalone category tag (like Tag in news) */
export interface EventCategory {
  event_category_id: string;
  name: string;
  created_at?: string;
}

/** Junction record returned when loading event's categories */
export interface EventCategoryLink {
  link_id: string;
  event_id: string;
  event_category_id: string;
  category?: EventCategory;
}

// ===========================
// PAYLOADS
// ===========================

/** Create a new standalone category */
export interface CreateEventCategoryPayload {
  name: string;
}

/** Update category name */
export interface UpdateEventCategoryPayload {
  name: string;
}
