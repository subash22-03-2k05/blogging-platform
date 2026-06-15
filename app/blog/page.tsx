'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import BlogCard from '@/components/BlogCard'
import { Post } from '@/types'
import { useState } from 'react'

// Mock blog posts
const MOCK_POSTS: Post[] = Array.from({ length: 12 }, (_, i) => ({
  id: String(i + 1),
  title: `Article ${i + 1}: Exploring the Latest Trends`,
  slug: `article-${i + 1}`,
  excerpt: 'Discover insights into the latest trends and developments in the tech industry',
  content: 'This is the full article content...',
  featured_image: `https://images.unsplash.com/photo-${1600000000 + i}?w=1200&h=600&fit=crop`,
  category: ['Technology', 'Programming', 'AI', 'Design', 'Marketing'][i % 5],
  tags: ['trending', 'tech'],
  author_id: '1',
  author: {
    id: '1',
    full_name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    role: 'author',
    status: 'active',
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
  },
  status: 'published',
  seo_title: `Article ${i + 1}`,
  seo_description: 'Article description',
  views: Math.floor(Math.random() * 5000),
  reading_time: Math.floor(Math.random() * 10) + 3,
  created_at: new Date(Date.now() - i * 86400000).toISOString(),
  updated_at: new Date(Date.now() - i * 86400000).toISOString(),
}))

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState('')
  const postsPerPage = 9

  const filteredPosts = selectedCategory
    ? MOCK_POSTS.filter((post) => post.category === selectedCategory)
    : MOCK_POSTS

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const startIdx = (currentPage - 1) * postsPerPage
  const displayedPosts = filteredPosts.slice(startIdx, startIdx + postsPerPage)

  const categories = ['All', ...Array.from(new Set(MOCK_POSTS.map((p) => p.category)))]

  return (
    <>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-dark">
        <div className="container-app text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-space-grotesk text-h1 font-bold mb-4"
          >
            Blog & Articles
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary text-body max-w-2xl mx-auto"
          >
            Explore our collection of articles on technology, design, business, and more
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-app">
          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-4 mb-16 justify-center"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category === 'All' ? '' : category)
                  setCurrentPage(1)
                }}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  (!selectedCategory && category === 'All') || selectedCategory === category
                    ? 'bg-primary text-background'
                    : 'bg-card border border-border text-text-primary hover:border-primary'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Posts Grid */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          >
            {displayedPosts.map((post) => (
              <motion.div key={post.id} variants={item}>
                <BlogCard post={post} />
              </motion.div>
            ))}
          </motion.div>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center gap-2"
            >
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg bg-card border border-border text-text-primary hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    currentPage === page
                      ? 'bg-primary text-background'
                      : 'bg-card border border-border text-text-primary hover:border-primary'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg bg-card border border-border text-text-primary hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </>
  )
}
