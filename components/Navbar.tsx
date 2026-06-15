'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'Categories', href: '/categories' },
    { label: 'About', href: '/about' },
  ]

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-glass border-b border-border">
      <div className="container-app flex justify-between items-center h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
            <span className="text-background font-bold text-xl">B</span>
          </div>
          <span className="font-space-grotesk font-bold text-xl hidden sm:block">Blogging</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-12">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-text-secondary hover:text-primary transition-colors duration-300 font-medium">
              {item.label}
            </Link>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/signin" className="text-text-secondary hover:text-primary transition-colors duration-300 font-medium">
            Sign In
          </Link>
          <Link href="/signup" className="button-primary text-sm">
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1.5 w-6 h-6"
        >
          <span className={`h-0.5 w-full bg-primary transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`h-0.5 w-full bg-primary transition-all ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-full bg-primary transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-surface border-b border-border"
        >
          <div className="container-app py-8 flex flex-col gap-6">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-text-secondary hover:text-primary transition-colors duration-300 font-medium">
                {item.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-border flex flex-col gap-4">
              <Link href="/signin" className="text-text-secondary hover:text-primary transition-colors duration-300 font-medium">
                Sign In
              </Link>
              <Link href="/signup" className="button-primary text-center text-sm">
                Sign Up
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  )
}
