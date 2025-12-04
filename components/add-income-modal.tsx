"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

interface AddIncomeModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (income: any) => void
}

export default function AddIncomeModal({ isOpen, onClose, onAdd }: AddIncomeModalProps) {
  const [formData, setFormData] = useState({
    source: "Salary",
    amount: "",
    frequency: "Monthly",
    date: new Date().toISOString().split("T")[0],
  })

  const sources = ["Salary", "Freelance Work", "Investment Returns", "Bonus", "Gifts", "Other"]
  const frequencies = ["Daily", "Weekly", "Bi-weekly", "Monthly", "Quarterly", "Annual"]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.source && formData.amount) {
      onAdd({
        source: formData.source,
        amount: Number.parseFloat(formData.amount),
        frequency: formData.frequency,
        date: formData.date,
      })
      setFormData({ source: "Salary", amount: "", frequency: "Monthly", date: new Date().toISOString().split("T")[0] })
    }
  }

  const glassStyle: React.CSSProperties = {
    backdropFilter: "blur(40px)",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "1rem",
    boxShadow:
      "0 0 20px rgba(85, 200, 255, 0.3), inset 0 0 20px rgba(85, 200, 255, 0.1), 0 8px 32px rgba(0, 0, 0, 0.1)",
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            style={glassStyle}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 rounded-2xl max-w-md w-full mx-4 z-50"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Add Income</h2>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Income Source</label>
                <select
                  value={formData.source}
                  onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-cyan-400 transition-colors"
                >
                  {sources.map((src) => (
                    <option key={src} value={src}>
                      {src}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Amount</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="0.00"
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Frequency</label>
                <select
                  value={formData.frequency}
                  onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-cyan-400 transition-colors"
                >
                  {frequencies.map((freq) => (
                    <option key={freq} value={freq}>
                      {freq}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-6 py-3 bg-gradient-to-r from-green-400 to-emerald-400 text-slate-950 font-bold rounded-lg hover:shadow-lg hover:shadow-green-400/50 transition-all"
              >
                Add Income
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
