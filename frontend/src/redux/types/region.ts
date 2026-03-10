// types/region.ts
export interface Region {
  region_id: string;
  code: string;
  name: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

export interface CreateRegionPayload {
  code: string;
  name: string;
}

export interface UpdateRegionPayload {
  code?: string;
  name?: string;
}
