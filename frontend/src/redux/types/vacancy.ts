import type { Attachment } from "@/redux/api/attachementApi";

export type VacancyStatus = "draft" | "published" | "closed";
export type DisplayStatus = "draft" | "open" | "closed";
export type EmploymentType = "full_time" | "contract" | "part_time";

export interface Vacancy {
  vacancy_id: string;
  job_title: string;
  department?: string | null;
  location?: string | null;
  employment_type: EmploymentType;
  positions?: number | null;
  description: string;
  requirements?: string | null;
  published_date: string;
  application_deadline: string;
  attachment_id?: string | null;
  attachment?: Attachment | null;
  status: VacancyStatus;
  display_status?: DisplayStatus;
  created_at?: string;
  updated_at?: string;
}

export interface CreateVacancyPayload {
  job_title: string;
  department?: string | null;
  location?: string | null;
  employment_type?: EmploymentType;
  positions?: number | null;
  description: string;
  requirements?: string | null;
  published_date: string;
  application_deadline: string;
  attachment_id?: string | null;
  status?: VacancyStatus;
}

export type UpdateVacancyPayload = Partial<CreateVacancyPayload>;

export const EMPLOYMENT_TYPE_LABELS: Record<EmploymentType, string> = {
  full_time: "Full Time",
  contract: "Contract",
  part_time: "Part Time",
};
