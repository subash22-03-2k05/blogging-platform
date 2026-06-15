"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import BlogCard from '@/components/BlogCard'
import Hero from '@/components/Hero'
import { DEFAULT_CATEGORIES } from '@/lib/constants'
import { Post } from '@/types'

// Mock data for demonstration
const FEATURED_POSTS: Post[] = [
  {
    id: '1',
    title: 'The Future of AI: What to Expect in 2024',
    slug: 'future-of-ai-2024',
    excerpt: 'Exploring the latest trends and developments in artificial intelligence and machine learning',
    content: 'AI is evolving rapidly...',
    featured_image: 'https://images.unsplash.com/photo-1677442d019cecf8171d1bef1d859b0ed26a45db?w=1200&h=600&fit=crop',
    category: 'Artificial Intelligence',
    tags: ['AI', 'Technology', 'Future'],
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
    seo_title: 'The Future of AI',
    seo_description: 'Exploring AI trends',
    views: 1500,
    reading_time: 5,
    created_at: '2024-06-10',
    updated_at: '2024-06-10',
  },
  {
    id: '2',
    title: 'Building Scalable Web Applications',
    slug: 'scalable-web-apps',
    excerpt: 'Best practices for developing web applications that can handle millions of users',
    content: 'Scalability is crucial...',
    featured_image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=600&fit=crop',
    category: 'Programming',
    tags: ['Web Development', 'Scalability'],
    author_id: '1',
    status: 'published',
    seo_title: 'Scalable Web Applications',
    seo_description: 'Building scalable web apps',
    views: 1200,
    reading_time: 8,
    created_at: '2024-06-09',
    updated_at: '2024-06-09',
  },
  {
    id: '3',
    title: 'The Rise of Startups in 2024',
    slug: 'rise-of-startups-2024',
    excerpt: 'How new companies are disrupting traditional industries',
    content: 'Startups are changing...',
    featured_image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop',
    category: 'Startups',
    tags: ['Startups', 'Innovation'],
    author_id: '1',
    status: 'published',
    seo_title: 'Rise of Startups',
    seo_description: 'New startups disrupting industries',
    views: 950,
    reading_time: 6,
    created_at: '2024-06-08',
    updated_at: '2024-06-08',
  },
]

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

export default function Home() {
  const heroCta = (
    <>
      <Link href="/signup" className="button-primary">
        Get Started
      </Link>
      <Link href="/blog" className="button-secondary">
        Explore Blog
      </Link>
    </>
  )

  return (
    <>
      {/* Hero Section (component) */}
      <Hero
        title={
          <>
            Share Your <span className="gradient-text">Stories</span> with the World
          </>
        }
        subtitle="A premium blogging platform designed for creators, writers, and innovators. Share your thoughts, build your audience, and make an impact."
        cta={heroCta}
        image={FEATURED_POSTS[0].featured_image}
      />

      {/* Featured Articles Section */}
      <section className="section-padding">
        <div className="container-app">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-space-grotesk text-h2 font-bold mb-4">Featured Articles</h2>
            <p className="text-text-secondary text-body max-w-2xl mx-auto">
              Discover the latest insights from our community of writers and thought leaders
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {FEATURED_POSTS.map((post, i) => (
              <motion.div key={i} variants={item}>
                <BlogCard post={post} featured={i === 0} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Link href="/blog" className="button-primary">
              View All Articles
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="section-padding bg-surface">
        <div className="container-app">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-space-grotesk text-h2 font-bold mb-4">Explore Categories</h2>
            <p className="text-text-secondary text-body max-w-2xl mx-auto">
              Browse content across different topics and interests
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {DEFAULT_CATEGORIES.map((category) => (
              <motion.div key={category.id} variants={item}>
                <Link href={`/category/${category.slug}`}>
                  <div className="glass-card-hover p-8 text-center h-full">
                    <h4 className="font-space-grotesk text-h4 font-bold mb-2">{category.name}</h4>
                    <p className="text-text-secondary text-small">Explore {category.name}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section-padding">
        <div className="container-app">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="glass-card p-16 border-2 border-primary/20 hover:border-primary/40 transition-colors duration-300">
              <h2 className="font-space-grotesk text-h2 font-bold mb-4">Stay Updated</h2>
              <p className="text-text-secondary text-body mb-8">
                Subscribe to our newsletter and get the latest articles delivered to your inbox
              </p>
              <form className="flex gap-3 flex-col sm:flex-row">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 bg-card border border-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary transition-colors duration-300"
                  required
                />
                <button type="submit" className="button-primary whitespace-nowrap">
                  Subscribe
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
