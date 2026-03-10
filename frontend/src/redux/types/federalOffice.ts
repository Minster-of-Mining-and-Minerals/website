// types/federalOffice.ts
export interface FederalOffice {
  federal_office_id: string;
  office_address: string;
  phone?: string;
  email?: string;
  map_location?: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

export interface CreateFederalOfficePayload {
  office_address: string;
  phone?: string;
  email?: string;
  map_location?: string;
}

export interface UpdateFederalOfficePayload {
  office_address?: string;
  phone?: string;
  email?: string;
  map_location?: string;
}
