export interface LicensingContact {
  licensing_contact_id: string;
  regional_office_id: string;
  name: string;
  email?: string;
  phone?: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

export interface RegionalOfficeContactCenter {
  regional_office_id: string;
  region_id: string;
  bureau_name: string;
  address?: string;
  director?: string;
  email?: string;
  phone?: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  licensing_contacts?: LicensingContact[];
}

export interface Region {
  region_id: string;
  code: string;
  name: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  regional_offices?: RegionalOfficeContactCenter[];
}

export interface CreateRegionalOfficePayload {
  region_id: string;
  bureau_name: string;
  address?: string;
  director?: string;
  email?: string;
  phone?: string;
  licensing_contacts?: {
    name: string;
    email?: string;
    phone?: string;
  }[];
}

export interface UpdateRegionalOfficePayload {
  region_id?: string;
  bureau_name?: string;
  address?: string;
  director?: string;
  email?: string;
  phone?: string;
  licensing_contacts?: {
    name: string;
    email?: string;
    phone?: string;
  }[];
}
