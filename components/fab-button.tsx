"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface FABButtonProps {
  onClick: () => void
  children: ReactNode
  className?: string
}

export function FABButton({ onClick, children, className = "" }: FABButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`fixed bottom-8 right-8 w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white shadow-lg ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
    >
      {children}
    </motion.button>
  )
}
