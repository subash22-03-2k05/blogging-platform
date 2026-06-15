'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Post } from '@/types'
import { formatDate, calculateReadingTime } from '@/lib/utils'

// Mock single post
const MOCK_POST: Post = {
  id: '1',
  title: 'The Future of AI: What to Expect in 2024 and Beyond',
  slug: 'future-of-ai-2024',
  excerpt: 'Exploring the latest trends and developments in artificial intelligence and machine learning',
  content: `# Introduction

Artificial Intelligence is rapidly evolving and transforming various industries. In this comprehensive guide, we'll explore the major trends and developments to expect in 2024 and beyond.

## Key Trends

### 1. Generative AI Evolution
Generative AI models continue to improve in capability and efficiency. We're seeing more specialized models for specific use cases.

### 2. AI in Enterprise
Companies are increasingly adopting AI solutions for business automation and decision making.

### 3. Ethical AI
The focus on responsible AI development and deployment is growing stronger.

## Conclusion

The future of AI is both exciting and challenging. Organizations need to stay informed and adapt quickly to leverage these innovations.`,
  featured_image: 'https://images.unsplash.com/photo-1677442d019cecf8171d1bef1d859b0ed26a45db?w=1200&h=600&fit=crop',
  category: 'Artificial Intelligence',
  tags: ['AI', 'Technology', 'Future', 'Machine Learning'],
  author_id: '1',
  author: {
    id: '1',
    full_name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    role: 'author',
    status: 'active',
    bio: 'Tech writer and AI enthusiast',
    social_profiles: {
      twitter: 'https://twitter.com/johndoe',
      linkedin: 'https://linkedin.com/in/johndoe',
      github: 'https://github.com/johndoe',
    },
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
  },
  status: 'published',
  seo_title: 'The Future of AI: Trends and Developments in 2024',
  seo_description: 'Discover the latest trends in artificial intelligence and machine learning for 2024',
  views: 1500,
  reading_time: 8,
  created_at: '2024-06-10',
  updated_at: '2024-06-10',
  published_at: '2024-06-10',
}

export default function BlogPostPage() {
  const readingTime = calculateReadingTime(MOCK_POST.content)

  return (
    <>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-dark relative overflow-hidden">
        <div className="container-app">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6 text-text-secondary">
              <Link href="/blog" className="hover:text-primary transition-colors">
                Blog
              </Link>
              <span>/</span>
              <Link href={`/category/${MOCK_POST.category.toLowerCase()}`} className="hover:text-primary transition-colors">
                {MOCK_POST.category}
              </Link>
            </div>

            {/* Category and Read Time */}
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-small font-semibold">
                {MOCK_POST.category}
              </span>
              <span className="text-text-secondary text-small">{readingTime} min read</span>
            </div>

            {/* Title */}
            <h1 className="font-space-grotesk text-display font-bold mb-6 leading-tight">
              {MOCK_POST.title}
            </h1>

            {/* Meta Info */}
            <div className="flex items-center gap-6 py-6 border-y border-border">
              <div className="flex items-center gap-4">
                <Image
                  src={MOCK_POST.author?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'}
                  alt={MOCK_POST.author?.full_name || 'Author'}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="text-text-primary font-semibold">{MOCK_POST.author?.full_name}</p>
                  <p className="text-text-secondary text-small">{formatDate(MOCK_POST.created_at)}</p>
                </div>
              </div>
              <div className="flex-1" />
              <div className="flex gap-4">
                <button className="px-4 py-2 rounded-lg bg-card border border-border hover:border-primary transition-colors">
                  Share
                </button>
                <button className="px-4 py-2 rounded-lg bg-card border border-border hover:border-primary transition-colors">
                  Bookmark
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative h-96 md:h-[500px] w-full"
      >
        <Image
          src={MOCK_POST.featured_image}
          alt={MOCK_POST.title}
          fill
          className="object-cover"
          priority
        />
      </motion.section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-app">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-3"
            >
              <div className="prose prose-invert max-w-none">
                <div className="text-text-secondary leading-relaxed space-y-6">
                  {MOCK_POST.content.split('\n\n').map((paragraph, i) => (
                    <p key={i} className={paragraph.startsWith('#') ? 'text-h4 font-bold text-text-primary mt-8' : ''}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-border">
                <h4 className="font-semibold text-text-primary mb-4">Tags</h4>
                <div className="flex flex-wrap gap-3">
                  {MOCK_POST.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/tag/${tag}`}
                      className="px-4 py-2 rounded-full bg-card border border-border hover:border-primary transition-colors text-small"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Author Bio */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-12 pt-8 border-t border-border"
              >
                <h4 className="font-semibold text-text-primary mb-6">About the Author</h4>
                <div className="glass-card p-8 flex gap-6">
                  <Image
                    src={MOCK_POST.author?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'}
                    alt={MOCK_POST.author?.full_name || 'Author'}
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-full flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h5 className="font-semibold text-text-primary mb-2">
                      {MOCK_POST.author?.full_name}
                    </h5>
                    <p className="text-text-secondary mb-4">
                      {MOCK_POST.author?.bio || 'Passionate writer and tech enthusiast'}
                    </p>
                    <div className="flex gap-4">
                      {MOCK_POST.author?.social_profiles?.twitter && (
                        <a href={MOCK_POST.author.social_profiles.twitter} className="text-primary hover:text-secondary transition-colors">
                          Twitter
                        </a>
                      )}
                      {MOCK_POST.author?.social_profiles?.linkedin && (
                        <a href={MOCK_POST.author.social_profiles.linkedin} className="text-primary hover:text-secondary transition-colors">
                          LinkedIn
                        </a>
                      )}
                      {MOCK_POST.author?.social_profiles?.github && (
                        <a href={MOCK_POST.author.social_profiles.github} className="text-primary hover:text-secondary transition-colors">
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              {/* Table of Contents */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card p-6 mb-8 sticky top-32"
              >
                <h4 className="font-semibold text-text-primary mb-4">Table of Contents</h4>
                <nav className="space-y-2">
                  <a href="#introduction" className="block text-small text-text-secondary hover:text-primary transition-colors">
                    Introduction
                  </a>
                  <a href="#key-trends" className="block text-small text-text-secondary hover:text-primary transition-colors ml-4">
                    Key Trends
                  </a>
                  <a href="#conclusion" className="block text-small text-text-secondary hover:text-primary transition-colors">
                    Conclusion
                  </a>
                </nav>
              </motion.div>

              {/* Share Section */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-card p-6"
              >
                <h4 className="font-semibold text-text-primary mb-4">Share This</h4>
                <div className="space-y-2">
                  <button className="w-full px-4 py-2 rounded-lg bg-card border border-border text-text-primary hover:border-primary transition-colors text-small">
                    Twitter
                  </button>
                  <button className="w-full px-4 py-2 rounded-lg bg-card border border-border text-text-primary hover:border-primary transition-colors text-small">
                    LinkedIn
                  </button>
                  <button className="w-full px-4 py-2 rounded-lg bg-card border border-border text-text-primary hover:border-primary transition-colors text-small">
                    Copy Link
                  </button>
                </div>
              </motion.div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="section-padding bg-surface">
        <div className="container-app">
          <h2 className="font-space-grotesk text-h2 font-bold mb-12 text-center">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card overflow-hidden hover:border-primary transition-colors cursor-pointer"
              >
                <div className="h-48 bg-card" />
                <div className="p-6">
                  <p className="text-primary text-small font-semibold mb-2">Related Article</p>
                  <h4 className="font-semibold text-text-primary mb-3">Related Article {i + 1}</h4>
                  <Link href="#" className="text-primary hover:text-secondary transition-colors text-small">
                    Read More →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
