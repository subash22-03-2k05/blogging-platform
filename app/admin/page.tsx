'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'

interface DashboardStats {
  totalPosts: number
  totalViews: number
  totalReaders: number
  publishedThisMonth: number
}

export default function AdminDashboard() {
  const [stats] = useState<DashboardStats>({
    totalPosts: 145,
    totalViews: 28500,
    totalReaders: 3200,
    publishedThisMonth: 12,
  })

  const recentPosts = [
    { id: 1, title: 'The Future of AI', status: 'published', views: 1500, date: '2024-06-10' },
    { id: 2, title: 'Web Development Trends', status: 'published', views: 892, date: '2024-06-09' },
    { id: 3, title: 'Startup Guide 2024', status: 'draft', views: 0, date: '2024-06-08' },
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

  return (
    <>
      {/* Header */}
      <section className="section-padding bg-gradient-dark border-b border-border">
        <div className="container-app">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between items-center flex-wrap gap-6"
          >
            <div>
              <h1 className="font-space-grotesk text-h1 font-bold mb-2">Admin Dashboard</h1>
              <p className="text-text-secondary">Manage your blogging platform content</p>
            </div>
            <Link href="/admin/new-post" className="button-primary">
              Create New Post
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding">
        <div className="container-app">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {[
              { label: 'Total Posts', value: stats.totalPosts, icon: '📝' },
              { label: 'Total Views', value: stats.totalViews.toLocaleString(), icon: '👁️' },
              { label: 'Total Readers', value: stats.totalReaders.toLocaleString(), icon: '👥' },
              { label: 'Published This Month', value: stats.publishedThisMonth, icon: '📊' },
            ].map((stat, i) => (
              <motion.div key={i} variants={item} className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-text-secondary text-small font-semibold">{stat.label}</p>
                  <span className="text-h3">{stat.icon}</span>
                </div>
                <p className="text-h2 font-bold text-primary">{stat.value}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Recent Posts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-8"
          >
            <h2 className="font-space-grotesk text-h3 font-bold mb-6">Recent Posts</h2>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between p-4 bg-card rounded-lg border border-border hover:border-primary transition-colors">
                  <div className="flex-1">
                    <h4 className="font-semibold text-text-primary mb-1">{post.title}</h4>
                    <p className="text-text-secondary text-small">{post.date}</p>
                  </div>
                  <div className="flex items-center gap-6 text-right">
                    <div>
                      <p className="text-text-primary font-semibold">{post.views.toLocaleString()}</p>
                      <p className="text-text-secondary text-small">views</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-small font-semibold ${
                      post.status === 'published'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {post.status}
                    </span>
                    <Link href={`/admin/post/${post.id}/edit`} className="text-primary hover:text-secondary transition-colors">
                      Edit →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
