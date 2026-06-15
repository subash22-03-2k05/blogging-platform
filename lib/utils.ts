// SEO Utilities
export const generateMetaTags = (
  title: string,
  description: string,
  image?: string,
  url?: string
) => ({
  title,
  description,
  openGraph: {
    title,
    description,
    images: image ? [{ url: image, width: 1200, height: 630 }] : [],
    url,
  },
  twitter: {
    card: 'summary_large_image' as const,
    title,
    description,
    images: image ? [image] : [],
  },
})

// Format reading time
export const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

// Format date
export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Format date for display
export const formatDateRelative = (date: string | Date): string => {
  const now = new Date()
  const postDate = new Date(date)
  const diffInSeconds = Math.floor((now.getTime() - postDate.getTime()) / 1000)

  if (diffInSeconds < 60) return 'just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)}mo ago`
  return `${Math.floor(diffInSeconds / 31536000)}y ago`
}

// Slugify
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

// Truncate text
export const truncate = (text: string, length: number): string => {
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}

// Extract excerpt from content
export const extractExcerpt = (content: string, length: number = 160): string => {
  const text = content.replace(/<[^>]*>/g, '')
  return truncate(text, length)
}

// Format number
export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

// Validate email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Generate excerpt from markdown
export const generateExcerpt = (markdown: string, wordCount: number = 20): string => {
  const text = markdown.replace(/[#*`]/g, '').trim()
  const words = text.split(/\s+/).slice(0, wordCount)
  return words.join(' ') + (words.length === wordCount ? '...' : '')
}
