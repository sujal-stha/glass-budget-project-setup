"use client"

import type React from "react"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  glow?: "primary" | "accent" | "none"
}

export function GlassCard({ children, className = "", hover = true, glow = "none" }: GlassCardProps) {
  const glassStyle: React.CSSProperties = {
    backdropFilter: "blur(40px)",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "1rem",
    transition: "all 0.3s ease",
    ...(hover && {
      cursor: "pointer",
    }),
    ...(glow === "primary" && {
      boxShadow:
        "0 0 20px rgba(139, 92, 246, 0.3), inset 0 0 20px rgba(139, 92, 246, 0.1), 0 8px 32px rgba(0, 0, 0, 0.1)",
    }),
    ...(glow === "accent" && {
      boxShadow:
        "0 0 20px rgba(85, 200, 255, 0.3), inset 0 0 20px rgba(85, 200, 255, 0.1), 0 8px 32px rgba(0, 0, 0, 0.1)",
    }),
  }

  const hoverProps = hover
    ? {
        whileHover: { y: -2 },
        onHoverStart: (e: any) => {
          if (e.currentTarget) {
            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)"
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)"
          }
        },
        onHoverEnd: (e: any) => {
          if (e.currentTarget) {
            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)"
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)"
          }
        },
      }
    : {}

  return (
    <motion.div style={glassStyle} className={`p-6 ${className}`} transition={{ duration: 0.3 }} {...hoverProps}>
      {children}
    </motion.div>
  )
}
