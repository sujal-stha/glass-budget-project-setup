"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, LogOut, Settings, Home, Wallet, TrendingUp, BarChart3, Target } from "lucide-react"
import { motion } from "framer-motion"

export function Navbar({ user }: { user?: any }) {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/expenses", label: "Expenses", icon: Wallet },
    { href: "/income", label: "Income", icon: TrendingUp },
    { href: "/reports", label: "Reports", icon: BarChart3 },
    { href: "/goals", label: "Goals", icon: Target },
  ]

  const glassStyle: React.CSSProperties = {
    backdropFilter: "blur(40px)",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  }

  return (
    <nav style={glassStyle} className="fixed top-0 w-full z-40 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold neon-text hover:opacity-80 transition">
          GlassBudget
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1">
          {user ? (
            <>
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-foreground/80 hover:text-foreground hover:bg-white/10 transition-all"
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{item.label}</span>
                  </Link>
                )
              })}
              <div className="flex items-center gap-2 ml-4 pl-4 border-l border-white/10">
                <Link
                  href="/settings"
                  className="p-2 rounded-lg text-foreground/80 hover:text-foreground hover:bg-white/10 transition"
                >
                  <Settings className="w-4 h-4" />
                </Link>
                <button className="p-2 rounded-lg text-foreground/80 hover:text-red-400 hover:bg-red-400/10 transition">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="px-4 py-2 text-foreground/80 hover:text-foreground transition">
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="bg-gradient-to-r from-cyan-400 to-blue-400 text-slate-950 px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-cyan-400/50 transition-all font-medium ml-2"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={glassStyle}
          className="md:hidden border-t border-white/10 p-4 space-y-2"
        >
          {user ? (
            <>
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-foreground/80 hover:text-foreground hover:bg-white/10 transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
              <div className="pt-2 border-t border-white/10 flex gap-2 mt-2">
                <Link
                  href="/settings"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-foreground/80 hover:text-foreground hover:bg-white/10 transition-all flex-1"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </Link>
                <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-foreground/80 hover:text-red-400 hover:bg-red-400/10 transition-all flex-1">
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="block px-3 py-2 text-foreground/80 hover:text-foreground">
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="block bg-gradient-to-r from-cyan-400 to-blue-400 text-slate-950 px-3 py-2 rounded-lg font-medium"
              >
                Get Started
              </Link>
            </>
          )}
        </motion.div>
      )}
    </nav>
  )
}
