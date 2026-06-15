import { NextResponse } from 'next/server'
import { fetchPosts } from '@/lib/wordpress'

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') || '1', 10)
    const per_page = parseInt(url.searchParams.get('per_page') || '10', 10)
    const { posts, total } = await fetchPosts(page, per_page)
    return NextResponse.json({ posts, total })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to fetch posts' }, { status: 500 })
  }
}
