"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Mail, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function VerifyEmailPage() {
  const glassStyle: React.CSSProperties = {
    backdropFilter: "blur(40px)",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "1rem",
    boxShadow:
      "0 0 20px rgba(85, 200, 255, 0.3), inset 0 0 20px rgba(85, 200, 255, 0.1), 0 8px 32px rgba(0, 0, 0, 0.1)",
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <div className="flex justify-center">
          <div
            style={{
              ...glassStyle,
              padding: "2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Mail className="w-12 h-12 text-cyan-400" />
          </div>
        </div>
        <h1 className="text-3xl font-bold neon-text">Verify Your Email</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          We've sent a verification link to your email address. Click the link to confirm your account and get started
          with GlassBudget.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={glassStyle}
        className="p-8 rounded-2xl"
      >
        <p className="text-center text-sm text-muted-foreground mb-6">
          Didn't receive the email? Check your spam folder or try signing up again.
        </p>
        <Link
          href="/auth/signup"
          className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-cyan-400 to-blue-400 hover:shadow-lg hover:shadow-cyan-400/50 text-slate-950 font-bold py-2.5 rounded-lg transition-all"
        >
          Back to Sign Up <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </div>
  )
}
