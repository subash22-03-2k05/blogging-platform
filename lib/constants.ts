// Constants
export const SITE_NAME = 'Blogging Platform'
export const SITE_DESCRIPTION = 'Premium futuristic blogging platform with authentication, CMS, SEO, and deployment'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

// API Endpoints
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

// Pagination
export const POSTS_PER_PAGE = 12
export const COMMENTS_PER_PAGE = 10

// Categories
export const DEFAULT_CATEGORIES = [
  { id: '1', name: 'Technology', slug: 'technology' },
  { id: '2', name: 'Artificial Intelligence', slug: 'ai' },
  { id: '3', name: 'Programming', slug: 'programming' },
  { id: '4', name: 'Startups', slug: 'startups' },
  { id: '5', name: 'Design', slug: 'design' },
  { id: '6', name: 'Marketing', slug: 'marketing' },
  { id: '7', name: 'Business', slug: 'business' },
  { id: '8', name: 'Productivity', slug: 'productivity' },
]

// Roles
export const USER_ROLES = {
  USER: 'user',
  AUTHOR: 'author',
  ADMIN: 'admin',
} as const

// Post Status
export const POST_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  SCHEDULED: 'scheduled',
} as const

// User Status
export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  BANNED: 'banned',
} as const
