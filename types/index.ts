// User Types
export interface User {
  id: string;
  full_name: string;
  username: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin' | 'author';
  status: 'active' | 'inactive' | 'banned';
  bio?: string;
  social_profiles?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  created_at: string;
  updated_at: string;
  last_login?: string;
}

// Post Types
export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  category: string;
  tags: string[];
  author_id: string;
  author?: User;
  status: 'draft' | 'published' | 'scheduled';
  seo_title: string;
  seo_description: string;
  views: number;
  reading_time: number;
  created_at: string;
  updated_at: string;
  published_at?: string;
}

// Comment Types
export interface Comment {
  id: string;
  user_id: string;
  post_id: string;
  content: string;
  user?: User;
  created_at: string;
  updated_at?: string;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
  post_count: number;
}

// Newsletter Types
export interface Newsletter {
  id: string;
  email: string;
  subscribed_at: string;
}

// Bookmark Types
export interface Bookmark {
  id: string;
  user_id: string;
  post_id: string;
  created_at: string;
}

// Auth Types
export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}

// Pagination Types
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
