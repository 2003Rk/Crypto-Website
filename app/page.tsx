'use client'

import { useState, useEffect } from 'react'
import { ArrowRight, Shield, Eye, TrendingUp, Wallet } from 'lucide-react'
import Link from 'next/link'
import Logo from '@/components/Logo'
import { motion, Variants } from 'framer-motion'

// ✅ wrap Next.js Link so Framer Motion can animate it
const MotionLink = motion(Link)

// Constants for statistics
const STATS = {
  scamsDetected: 1300,
  users: 1000,
  walletsScanned: 10000,
}

export default function LandingPage() {
  const [counts, setCounts] = useState({
    scamsDetected: 0,
    users: 0,
    walletsScanned: 0,
  })

  const features = [
    {
      icon: Shield,
      title: 'Risk Analysis',
      description: 'Detect honeypots, rug pulls, and risky tokens automatically',
    },
    {
      icon: Eye,
      title: 'Real-time Monitoring',
      description: 'Track wallet balances and transactions with live blockchain data',
    },
    {
      icon: TrendingUp,
      title: 'Portfolio Insights',
      description: 'Get comprehensive analytics on your crypto holdings',
    },
  ]

  // Animate stats count-up
  useEffect(() => {
    const interval = setInterval(() => {
      setCounts((prev) => {
        const updated = { ...prev }
        let finished = true
        Object.keys(STATS).forEach((key) => {
          const k = key as keyof typeof STATS
          if (prev[k] < STATS[k]) {
            updated[k] = Math.min(prev[k] + Math.ceil(STATS[k] / 100), STATS[k])
            finished = false
          }
        })
        if (finished) clearInterval(interval)
        return updated
      })
    }, 20)
  }, [])

  // Framer Motion Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }
  const cardPopup: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 120, damping: 12 },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/40 via-30% to-black text-foreground relative overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-600/10 rounded-full blur-2xl"></div>
      </div>
      {/* Content wrapper with relative positioning */}
      <div className="relative z-10">
        <nav className="border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Logo size="md" />
              <Link href="/portfolio">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 8px 20px rgba(0,0,0,0.15)' }}
                  className="px-6 py-2 bg-primary text-primary-foreground font-medium rounded-lg transition"
                >
                  Get Started
                </motion.button>
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="max-w-7xl mx-auto text-center">
            {/* Headline */}
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-2"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 100, damping: 10, delay: 0.1 }}
            >
              Secure Your Crypto
            </motion.h1>

            <motion.span
              className="text-primary block text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 120, damping: 12, delay: 0.3 }}
            >
              Portfolio
            </motion.span>

            {/* Paragraph */}
            <motion.p
              className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 100, damping: 10, delay: 0.5 }}
            >
              VeriFil analyzes your Ethereum wallets to detect scams, honeypots, and risky tokens.
              Protect your investments with real-time risk assessment.
            </motion.p>

            {/* Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 100, damping: 10, delay: 0.7 }}
            >
              <MotionLink
                href="/wallets"
                whileHover={{ scale: 1.05, boxShadow: '0 8px 20px rgba(0,0,0,0.15)' }}
                className="bg-primary text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold transition flex items-center justify-center gap-2"
              >
                Start Analyzing
                <ArrowRight className="w-5 h-5" />
              </MotionLink>

              <motion.button
                whileHover={{ scale: 1.03, boxShadow: '0 6px 15px rgba(0,0,0,0.1)' }}
                className="px-6 py-4 border border-primary text-primary rounded-lg hover:bg-primary/10 transition font-medium ml-4"
              >
                Watch Demo
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {Object.entries(counts).map(([key, value], idx) => (
                <motion.div
                  key={key}
                  className="transition-transform hover:scale-105"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  variants={fadeUp}
                  transition={{ delay: idx * 0.2 }}
                >
                  <div className="text-3xl font-bold text-primary mb-2">
                    {value.toLocaleString()}
                  </div>
                  <div className="text-muted-foreground">
                    {key === 'walletsScanned'
                      ? 'Wallets Scanned'
                      : key === 'scamsDetected'
                        ? 'Scams Detected'
                        : 'Users'}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                Why Choose VeriFil?
              </motion.h2>
              <motion.p
                className="text-xl text-muted-foreground max-w-2xl mx-auto"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ delay: 0.2 }}
              >
                Advanced blockchain analysis tools to keep your crypto investments safe
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="text-center p-6 rounded-lg border border-border hover:bg-secondary/50 transition-colors hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={cardPopup}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            Ready to Secure Your Portfolio?
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ delay: 0.2 }}
          >
            Join thousands of users who trust VeriFil to protect their crypto investments
          </motion.p>
          <MotionLink
            href="/wallets"
            whileHover={{ scale: 1.05 }}
            className="bg-primary text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold inline-flex items-center gap-2"
          >
            <Wallet className="w-5 h-5" />
            Get Started Free
          </MotionLink>
        </section>

        {/* Footer */}
        <footer className="border-t border-border py-12 px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
          © 2025 VeriFil. All rights reserved. Built for crypto security.
        </footer>
      </div>
    </div >
  )
}
