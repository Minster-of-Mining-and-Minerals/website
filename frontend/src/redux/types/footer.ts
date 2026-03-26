export interface FooterSectionLink {
  label: string;
  url: string;
}

export interface FooterSection {
  footer_section_id: string;
  footer_id: string;
  section_name: string;
  links: FooterSectionLink[];
  created_at: string;
  updated_at: string;
}

export interface Footer {
  footer_id: string;
  title: string;
  text: string;
  content?: string;
  attachment_id?: string;
  sections?: FooterSection[];
  created_at: string;
  updated_at: string;
}

export interface CreateFooterPayload {
  title: string;
  text: string;
  content?: string;
  attachment_id?: string;
  sections?: {
    section_name: string;
    links: FooterSectionLink[];
  }[];
}

export interface UpdateFooterPayload {
  title?: string;
  text?: string;
  content?: string;
  attachment_id?: string;
  sections?: {
    footer_section_id?: string;
    section_name: string;
    links: FooterSectionLink[];
  }[];
}

export interface CreateFooterSectionPayload {
  footer_id: string;
  section_name: string;
  links: FooterSectionLink[];
}