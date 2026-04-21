// ===========================
// EVENT TYPES
// ===========================

import { EventCategoryLink } from "./eventCategory";

export interface EventAttachmentLink {
  attachment_id: string;
  attachment?: any;
}

export interface Event {
  event_id: string;
  title: string;
  description?: string;
  content?: any;

  start_time: string;
  end_time: string;

  location?: string;
  virtual_link?: string;

  organizer: string;

  status:
    | "draft"
    | "scheduled"
    | "published"
    | "ongoing"
    | "completed"
    | "archived"
    | "cancelled";

  computed_status?: string;

  publish_start?: string;
  publish_end?: string;
  published_at?: string;

  approved_by?: string;
  approved_at?: string;

  created_at: string;
  updated_at: string;
  deleted_at?: string;

  attachments?: EventAttachmentLink[];
  /** Single category association */
  event_category_id?: string;
  category?: any;
}


// ===========================
// PAYLOADS
// ===========================

export interface CreateEventPayload {
  title: string;
  description?: string;

  start_time: string;
  end_time: string;

  location?: string;
  virtual_link?: string;

  organizer: string;
  content?: any;

  attachments?: string[];   // attachment_ids
  event_category_id?: string;  // event_category_id from standalone table

  publish_start?: string;
  publish_end?: string;

  status?: Event["status"];
}

export interface UpdateEventPayload {
  title?: string;
  description?: string;

  start_time?: string;
  end_time?: string;

  location?: string;
  virtual_link?: string;

  organizer?: string;
  content?: any;

  attachment_ids?: string[];
  event_category_id?: string;  // replaces old category_ids array

  publish_start?: string;
  publish_end?: string;

  status?: Event["status"];
}