
export interface Profile {
  id: string;
  username: string;
  display_name: string;
  avatar_url?: string;
}

export interface Project {
  id: string;
  user_id: string;
  title: string;
  slug?: string;
  client?: string;
  start_date?: string;
  end_date?: string;
  role?: string;
  description?: string;
  cover_image?: string;
  status: 'completed' | 'in_progress' | 'concept';
  is_published: boolean;
  category?: string;
  external_url?: string;
  created_at: string;
  updated_at: string;
  profiles?: Profile;
}

export interface ProjectMedia {
  id: string;
  project_id: string;
  media_type: 'image' | 'video' | 'before_after';
  url: string;
  caption?: string;
  alt_text?: string;
  display_order: number;
  metadata?: any;
  created_at: string;
}

export interface ProjectTimeline {
  id: string;
  project_id: string;
  milestone_date: string;
  title: string;
  description?: string;
  media_id?: string;
  display_order: number;
  created_at: string;
}

export interface ProjectTool {
  id: string;
  project_id: string;
  name: string;
  category?: string;
  logo_url?: string;
  skill_level?: number;
  created_at: string;
}

export interface ProjectAnalytic {
  id: string;
  project_id: string;
  metric_name: string;
  metric_value: string;
  description?: string;
  display_type?: 'number' | 'percentage' | 'currency' | 'chart';
  chart_data?: any;
  testimonial_author?: string;
  testimonial_role?: string;
  testimonial_content?: string;
  external_link?: string;
  external_link_text?: string;
  display_order: number;
  created_at: string;
}
