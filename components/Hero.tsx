"use client"

import Image from 'next/image'
import { motion } from 'framer-motion'

type HeroProps = {
  title?: React.ReactNode
  subtitle?: string
  cta?: React.ReactNode
  image?: string
}

export default function Hero({
  title = 'Share Your Stories with the World',
  subtitle = 'A premium blogging platform designed for creators, writers, and innovators.',
  cta,
  image,
}: HeroProps) {
  return (
    <section className="section-padding bg-gradient-dark relative overflow-hidden">
      <div className="container-app">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          <div>
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-primary font-semibold text-small">Welcome to the Future of Blogging</span>
            </div>

            <h1 className="font-space-grotesk text-display mb-6 leading-tight">
              {title}
            </h1>

            <p className="text-text-secondary text-body mb-8 max-w-lg leading-relaxed">{subtitle}</p>

            <div className="flex gap-4 flex-wrap">{cta}</div>
          </div>

          <div className="relative">
            <div className="relative h-96 lg:h-full min-h-[500px] rounded-2xl overflow-hidden glass-card">
              {image ? (
                <Image src={image} alt="featured" fill className="object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-primary" />
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
