'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '#' },
        { label: 'Pricing', href: '#' },
        { label: 'Security', href: '#' },
        { label: 'Blog', href: '/blog' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Blog', href: '/blog' },
        { label: 'Careers', href: '#' },
        { label: 'Contact', href: '#' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '#' },
        { label: 'FAQ', href: '#' },
        { label: 'Community', href: '#' },
        { label: 'Status', href: '#' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy', href: '#' },
        { label: 'Terms', href: '#' },
        { label: 'Cookie Policy', href: '#' },
        { label: 'Sitemap', href: '#' },
      ],
    },
  ]

  return (
    <footer className="bg-surface border-t border-border">
      <div className="container-app section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <span className="text-background font-bold text-xl">B</span>
              </div>
              <span className="font-space-grotesk font-bold text-lg">Blogging</span>
            </Link>
            <p className="text-text-secondary text-small">
              Premium futuristic blogging platform with authentication, CMS, SEO, and deployment.
            </p>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <motion.div
              key={section.title}
              whileHover={{ y: -5 }}
              className="flex flex-col gap-4"
            >
              <h4 className="font-space-grotesk font-semibold text-text-primary">{section.title}</h4>
              <ul className="flex flex-col gap-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-text-secondary text-small hover:text-primary transition-colors duration-300">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mb-16 py-8 border-t border-b border-border">
          <div className="max-w-md">
            <h3 className="font-space-grotesk text-h4 font-bold mb-4">Subscribe to Newsletter</h3>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-card border border-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary transition-colors duration-300"
              />
              <button type="submit" className="button-primary">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-small text-text-secondary">
          <p>&copy; {currentYear} Blogging Platform. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors duration-300">
              Twitter
            </a>
            <a href="#" className="hover:text-primary transition-colors duration-300">
              GitHub
            </a>
            <a href="#" className="hover:text-primary transition-colors duration-300">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
