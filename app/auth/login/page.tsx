"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const supabase = createClient()

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1 },
    }),
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        setError(signInError.message)
        return
      }

      router.push("/dashboard")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const glassStyle: React.CSSProperties = {
    backdropFilter: "blur(40px)",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "1rem",
    boxShadow:
      "0 0 20px rgba(139, 92, 246, 0.3), inset 0 0 20px rgba(139, 92, 246, 0.1), 0 8px 32px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-2"
      >
        <h1 className="text-3xl font-bold neon-text">Welcome Back</h1>
        <p className="text-muted-foreground">Sign in to manage your finances</p>
      </motion.div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm"
        >
          {error}
        </motion.div>
      )}

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        style={glassStyle}
        className="p-8 space-y-5 rounded-2xl hover:bg-white/10 hover:border-white/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Email */}
        <motion.div custom={0} variants={inputVariants} initial="hidden" animate="visible">
          <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2.5 text-foreground placeholder-muted-foreground focus:outline-none focus:border-cyan-400 focus:bg-white/15 transition-all"
              placeholder="your@email.com"
              required
              disabled={loading}
            />
          </div>
        </motion.div>

        {/* Password */}
        <motion.div custom={1} variants={inputVariants} initial="hidden" animate="visible">
          <label className="block text-sm font-medium text-foreground mb-2">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-10 py-2.5 text-foreground placeholder-muted-foreground focus:outline-none focus:border-cyan-400 focus:bg-white/15 transition-all disabled:opacity-50"
              placeholder="••••••••"
              required
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition disabled:opacity-50"
              disabled={loading}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </motion.div>

        {/* Remember me & Forgot Password */}
        <motion.div
          custom={2}
          variants={inputVariants}
          initial="hidden"
          animate="visible"
          className="flex justify-between items-center"
        >
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-white/20 bg-white/5 accent-cyan-400"
              disabled={loading}
            />
            <span>Remember me</span>
          </label>
          <Link href="#" className="text-sm text-cyan-400 hover:text-cyan-300 transition">
            Forgot password?
          </Link>
        </motion.div>

        {/* Submit */}
        <motion.button
          custom={3}
          variants={inputVariants}
          initial="hidden"
          animate="visible"
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-cyan-400 to-blue-400 hover:shadow-lg hover:shadow-cyan-400/50 text-slate-950 font-bold py-2.5 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
        >
          {loading ? (
            <>
              <Loader className="w-4 h-4 animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              Sign In <ArrowRight className="w-4 h-4" />
            </>
          )}
        </motion.button>
      </motion.form>

      {/* Divider */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex items-center gap-4"
      >
        <div className="flex-1 h-px bg-border/50" />
        <span className="text-xs text-muted-foreground">OR</span>
        <div className="flex-1 h-px bg-border/50" />
      </motion.div>

      {/* Sign up link */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center text-muted-foreground text-sm"
      >
        Don't have an account?{" "}
        <Link href="/auth/signup" className="text-cyan-400 hover:text-cyan-300 font-medium transition">
          Sign up for free
        </Link>
      </motion.p>
    </div>
  )
}
