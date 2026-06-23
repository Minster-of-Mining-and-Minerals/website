import type { Attachment } from "@/redux/api/attachementApi";

export type TenderStatus = "draft" | "published" | "closed";
export type DisplayStatus = "draft" | "open" | "closed";

export interface Tender {
  tender_id: string;
  title: string;
  reference_number?: string | null;
  description: string;
  published_date: string;
  closing_date: string;
  attachment_id?: string | null;
  attachment?: Attachment | null;
  status: TenderStatus;
  display_status?: DisplayStatus;
  created_at?: string;
  updated_at?: string;
}

export interface CreateTenderPayload {
  title: string;
  reference_number?: string | null;
  description: string;
  published_date: string;
  closing_date: string;
  attachment_id?: string | null;
  status?: TenderStatus;
}

export type UpdateTenderPayload = Partial<CreateTenderPayload>;
