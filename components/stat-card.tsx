"use client"

import type React from "react"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface StatCardProps {
  icon: LucideIcon
  label: string
  value: string
  change?: string
  color?: "primary" | "accent" | "success" | "warning"
}

export function StatCard({ icon: Icon, label, value, change, color = "primary" }: StatCardProps) {
  const colorClass = {
    primary: "text-blue-400",
    accent: "text-cyan-400",
    success: "text-green-400",
    warning: "text-yellow-400",
  }[color]

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
    <motion.div style={glassStyle} className="p-6 space-y-4" whileHover={{ y: -4 }} transition={{ duration: 0.3 }}>
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-sm font-medium">{label}</p>
        <Icon className={`w-5 h-5 ${colorClass}`} />
      </div>
      <div>
        <p className="text-3xl font-bold text-foreground">{value}</p>
        {change && (
          <p className={`text-sm mt-1 ${change.startsWith("+") ? "text-green-400" : "text-red-400"}`}>{change}</p>
        )}
      </div>
    </motion.div>
  )
}
