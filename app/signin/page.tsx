'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { isValidEmail } from '@/lib/utils'

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!isValidEmail(formData.email)) {
      setError('Please enter a valid email')
      return
    }
    if (!formData.password) {
      setError('Password is required')
      return
    }

    setLoading(true)
    // TODO: Implement signin API call
    setTimeout(() => {
      setLoading(false)
      alert('Sign in successful! Redirecting to dashboard...')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center px-4 py-20">
      <div className="container-app max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card p-12 border-2 border-primary/20"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-space-grotesk text-h2 font-bold mb-2">Welcome Back</h1>
            <p className="text-text-secondary">Sign in to your account</p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-small"
            >
              {error}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-small font-semibold text-text-primary mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full px-4 py-3 bg-card border border-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary transition-colors duration-300"
              />
            </div>

            <div>
              <label className="block text-small font-semibold text-text-primary mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-card border border-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary transition-colors duration-300"
              />
            </div>

            <div className="flex items-center justify-between py-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-border bg-card accent-primary"
                />
                <span className="text-small text-text-secondary">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-primary hover:text-secondary transition-colors text-small">
                Forgot password?
              </Link>
            </div>

            <button type="submit" disabled={loading} className="w-full button-primary py-3 mt-6">
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-text-secondary text-small">OR</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Social Login */}
          <div className="space-y-2">
            <button className="w-full px-4 py-3 bg-card border border-border rounded-lg text-text-primary hover:border-primary transition-colors duration-300">
              Continue with GitHub
            </button>
            <button className="w-full px-4 py-3 bg-card border border-border rounded-lg text-text-primary hover:border-primary transition-colors duration-300">
              Continue with Google
            </button>
          </div>

          {/* Footer */}
          <p className="text-center text-text-secondary text-small mt-6">
            Don't have an account?{' '}
            <Link href="/signup" className="text-primary hover:text-secondary transition-colors">
              Sign Up
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
