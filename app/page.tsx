"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, TrendingUp, DollarSign, Target, PieChart, Check } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function LandingPage() {
  const [isHovered, setIsHovered] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  }

  const features = [
    { icon: DollarSign, title: "Smart Tracking", desc: "Track every expense automatically" },
    { icon: TrendingUp, title: "Growth Analysis", desc: "Visualize your progress" },
    { icon: Target, title: "Goal Setting", desc: "Achieve your financial dreams" },
  ]

  const benefits = [
    "Real-time expense tracking",
    "Advanced analytics and reports",
    "Savings goal management",
    "Multi-currency support",
    "Secure data encryption",
    "Mobile-friendly design",
  ]

  const glassStyle: React.CSSProperties = {
    backdropFilter: "blur(40px)",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "1rem",
  }

  const glassHoverPrimaryStyle: React.CSSProperties = {
    ...glassStyle,
    boxShadow:
      "0 0 20px rgba(139, 92, 246, 0.3), inset 0 0 20px rgba(139, 92, 246, 0.1), 0 8px 32px rgba(0, 0, 0, 0.1)",
  }

  const glassHoverAccentStyle: React.CSSProperties = {
    ...glassStyle,
    boxShadow:
      "0 0 20px rgba(85, 200, 255, 0.3), inset 0 0 20px rgba(85, 200, 255, 0.1), 0 8px 32px rgba(0, 0, 0, 0.1)",
  }

  return (
    <main className="min-h-screen overflow-hidden">
      <Navbar user={null} />

      {/* Hero Section */}
      <motion.section
        className="relative pt-32 pb-20 px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div variants={itemVariants}>
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="neon-text">Financial Freedom</span>
                <span className="block text-foreground">Simplified</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Take control of your finances with GlassBudget. Track expenses, set goals, and watch your wealth grow
                with our modern, intelligent personal finance platform.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-blue-400 hover:shadow-lg hover:shadow-cyan-400/50 text-slate-950 px-6 py-3 rounded-lg font-medium transition-all"
                >
                  Start Free <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  style={glassStyle}
                  className="px-6 py-3 rounded-lg font-medium inline-flex items-center gap-2 transition hover:bg-white/10"
                >
                  Learn More
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div variants={itemVariants} className="relative">
            <div className="space-y-4">
              {features.map((feature, i) => {
                const Icon = feature.icon
                return (
                  <motion.div key={i} style={glassStyle} className="p-4 flex items-center gap-4" whileHover={{ x: 10 }}>
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-400/20 to-blue-400/20 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{feature.title}</p>
                      <p className="text-sm text-muted-foreground">{feature.desc}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="py-20 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-muted-foreground text-lg">Everything you need to master your money</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: DollarSign, title: "Expense Tracking", desc: "Categorize and monitor spending" },
              { icon: TrendingUp, title: "Income Reports", desc: "Visualize earnings and trends" },
              { icon: Target, title: "Savings Goals", desc: "Set and achieve financial goals" },
              { icon: PieChart, title: "Analytics", desc: "Deep insights into spending" },
            ].map((feature, i) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={i}
                  style={glassStyle}
                  className="p-6 space-y-4 rounded-2xl"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Icon className="w-8 h-8 text-cyan-400" />
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.section>

      {/* Benefits Section */}
      <motion.section
        className="py-20 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-5xl mx-auto">
          <div style={glassHoverPrimaryStyle} className="p-12 rounded-2xl">
            <h2 className="text-3xl font-bold mb-8">Why Choose GlassBudget?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                  <p className="text-foreground">{benefit}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-20 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div style={glassHoverAccentStyle} className="p-12 space-y-6 rounded-2xl">
            <h2 className="text-3xl font-bold">Ready to take control?</h2>
            <p className="text-muted-foreground text-lg">
              Join thousands of users already managing their finances smarter with GlassBudget
            </p>
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:shadow-lg hover:shadow-cyan-400/50 text-slate-950 px-8 py-3 rounded-lg font-medium transition-all"
            >
              Start Your Journey <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </motion.section>

      <Footer />
    </main>
  )
}
