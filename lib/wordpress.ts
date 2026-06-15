import axios from 'axios'
import { Post, Category } from '@/types'

const WP_BASE = process.env.WORDPRESS_API_URL || ''

function getClient() {
  return axios.create({
    baseURL: WP_BASE,
    headers: { 'Content-Type': 'application/json' },
    timeout: 10000,
  })
}

export async function fetchPosts(page = 1, perPage = 10) {
  const client = getClient()
  const res = await client.get('/wp/v2/posts', {
    params: { page, per_page: perPage, _embed: true },
  })

  // Map WP posts to internal Post shape where possible
  const posts: Post[] = res.data.map((p: any) => ({
    id: String(p.id),
    title: p.title.rendered || '',
    slug: p.slug,
    excerpt: p.excerpt?.rendered?.replace(/<[^>]+>/g, '') || '',
    content: p.content?.rendered || '',
    featured_image: p._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
    category: p.categories?.[0] || '',
    tags: p.tags?.map((t: any) => String(t)) || [],
    author_id: String(p.author),
    status: p.status,
    seo_title: p.yoast_head_json?.title || p.title.rendered || '',
    seo_description: p.yoast_head_json?.description || p.excerpt?.rendered || '',
    views: p.meta?.views || 0,
    reading_time: Math.ceil((p.content?.rendered || '').length / 1000) || 1,
    created_at: p.date,
    updated_at: p.modified,
    published_at: p.date_gmt,
  }))

  const total = parseInt(res.headers['x-wp-total'] || '0', 10)
  return { posts, total }
}

export async function fetchPostBySlug(slug: string) {
  const client = getClient()
  const res = await client.get('/wp/v2/posts', {
    params: { slug, _embed: true },
  })
  const p = res.data?.[0]
  if (!p) return null
  const post: Post = {
    id: String(p.id),
    title: p.title.rendered || '',
    slug: p.slug,
    excerpt: p.excerpt?.rendered?.replace(/<[^>]+>/g, '') || '',
    content: p.content?.rendered || '',
    featured_image: p._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
    category: p.categories?.[0] || '',
    tags: p.tags?.map((t: any) => String(t)) || [],
    author_id: String(p.author),
    status: p.status,
    seo_title: p.yoast_head_json?.title || p.title.rendered || '',
    seo_description: p.yoast_head_json?.description || p.excerpt?.rendered || '',
    views: p.meta?.views || 0,
    reading_time: Math.ceil((p.content?.rendered || '').length / 1000) || 1,
    created_at: p.date,
    updated_at: p.modified,
    published_at: p.date_gmt,
  }
  return post
}

export async function fetchCategories() {
  const client = getClient()
  const res = await client.get('/wp/v2/categories', { params: { per_page: 100 } })
  const categories: Category[] = res.data.map((c: any) => ({
    id: String(c.id),
    name: c.name,
    slug: c.slug,
    description: c.description || '',
    image: undefined,
    post_count: c.count || 0,
  }))
  return categories
}

export default { fetchPosts, fetchPostBySlug, fetchCategories }
