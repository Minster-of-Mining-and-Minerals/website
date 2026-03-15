export interface SocialMedia {
  social_media_id: string;
  platform_name: string;
  icon: string;
  url: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

export interface CreateSocialMediaPayload {
  platform_name: string;
  icon: string;
  url: string;
}

export interface UpdateSocialMediaPayload {
  platform_name?: string;
  icon?: string;
  url?: string;
}
