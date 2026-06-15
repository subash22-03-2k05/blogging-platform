'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { isValidEmail } from '@/lib/utils'

export default function SignUp() {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!formData.fullName.trim()) {
      setError('Full name is required')
      return
    }
    if (!formData.username.trim()) {
      setError('Username is required')
      return
    }
    if (!isValidEmail(formData.email)) {
      setError('Please enter a valid email')
      return
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName: formData.fullName, username: formData.username, email: formData.email, password: formData.password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Signup failed')
      // auto redirect to signin
      setLoading(false)
      window.location.href = '/signin'
    } catch (err: any) {
      setLoading(false)
      setError(err.message || 'Signup failed')
    }
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
            <h1 className="font-space-grotesk text-h2 font-bold mb-2">Create Account</h1>
            <p className="text-text-secondary">Join our community of creators</p>
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
              <label className="block text-small font-semibold text-text-primary mb-2">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-3 bg-card border border-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary transition-colors duration-300"
              />
            </div>

            <div>
              <label className="block text-small font-semibold text-text-primary mb-2">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="johndoe"
                className="w-full px-4 py-3 bg-card border border-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary transition-colors duration-300"
              />
            </div>

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
              <p className="text-text-secondary text-small mt-1">At least 8 characters</p>
            </div>

            <div>
              <label className="block text-small font-semibold text-text-primary mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-card border border-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary transition-colors duration-300"
              />
            </div>

            <button type="submit" disabled={loading} className="w-full button-primary py-3 mt-6">
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-text-secondary text-small mt-6">
            Already have an account?{' '}
            <Link href="/signin" className="text-primary hover:text-secondary transition-colors">
              Sign In
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
