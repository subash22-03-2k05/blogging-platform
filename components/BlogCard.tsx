'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Post } from '@/types'
import { formatDate, calculateReadingTime } from '@/lib/utils'

interface BlogCardProps {
  post: Post
  featured?: boolean
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  const readingTime = calculateReadingTime(post.content)

  if (featured) {
    return (
      <motion.div
        whileHover={{ y: -10 }}
        className="group glass-card-hover overflow-hidden h-full flex flex-col"
      >
        <div className="relative h-64 overflow-hidden">
          <Image
            src={post.featured_image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </div>
        <div className="p-8 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-small font-semibold">
                {post.category}
              </span>
              <span className="text-text-secondary text-small">{readingTime} min read</span>
            </div>
            <h3 className="font-space-grotesk text-h3 font-bold mb-4 line-clamp-2 group-hover:text-primary transition-colors">
              {post.title}
            </h3>
            <p className="text-text-secondary mb-6 line-clamp-2">{post.excerpt}</p>
          </div>
          <div className="flex items-center justify-between pt-6 border-t border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-primary" />
              <div>
                <p className="text-text-primary text-small font-semibold">
                  {post.author?.full_name || 'Author'}
                </p>
                <p className="text-text-secondary text-small">{formatDate(post.created_at)}</p>
              </div>
            </div>
            <Link href={`/blog/${post.slug}`} className="text-primary hover:text-secondary transition-colors">
              →
            </Link>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group glass-card-hover overflow-hidden flex flex-col"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={post.featured_image}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2 py-1 rounded-md bg-primary/20 text-primary text-small font-semibold">
              {post.category}
            </span>
            <span className="text-text-secondary text-small">{readingTime}m</span>
          </div>
          <h3 className="font-space-grotesk text-h4 font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          <p className="text-text-secondary text-small mb-4 line-clamp-2">{post.excerpt}</p>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <p className="text-text-secondary text-small">{formatDate(post.created_at)}</p>
          <Link href={`/blog/${post.slug}`} className="text-primary hover:text-secondary transition-colors">
            Read →
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
