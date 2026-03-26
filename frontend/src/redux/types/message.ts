export interface Message {
  message_id: string;
  full_name: string;
  email_address: string;
  subject: string;
  message: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

export interface CreateMessagePayload {
  full_name: string;
  email_address: string;
  subject: string;
  message: string;
}
