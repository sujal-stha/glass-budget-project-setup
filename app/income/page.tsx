"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { GlassCard } from "@/components/glass-card"
import { FABButton } from "@/components/fab-button"
import { Plus, Trash2 } from "lucide-react"
import AddIncomeModal from "@/components/add-income-modal"

export default function IncomePage() {
  const [showModal, setShowModal] = useState(false)
  const [incomeItems, setIncomeItems] = useState([
    { id: 1, source: "Salary", amount: 4500, frequency: "Monthly", date: "2025-12-04", status: "completed" },
    { id: 2, source: "Freelance Work", amount: 500, frequency: "Weekly", date: "2025-12-03", status: "completed" },
    { id: 3, source: "Investment Returns", amount: 250, frequency: "Monthly", date: "2025-12-01", status: "completed" },
    { id: 4, source: "Bonus", amount: 1000, frequency: "Quarterly", date: "2025-11-30", status: "completed" },
  ])

  const handleAddIncome = (newIncome: any) => {
    setIncomeItems([
      { ...newIncome, id: Math.max(...incomeItems.map((i) => i.id), 0) + 1, status: "completed" },
      ...incomeItems,
    ])
    setShowModal(false)
  }

  const handleDeleteIncome = (id: number) => {
    setIncomeItems(incomeItems.filter((i) => i.id !== id))
  }

  const totalIncome = incomeItems.reduce((sum, inc) => sum + inc.amount, 0)
  const avgIncome = (totalIncome / incomeItems.length).toFixed(2)

  const sourceColors: Record<string, string> = {
    Salary: "bg-green-500/20 text-green-300",
    "Freelance Work": "bg-blue-500/20 text-blue-300",
    "Investment Returns": "bg-purple-500/20 text-purple-300",
    Bonus: "bg-yellow-500/20 text-yellow-300",
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navbar user={{ name: "User" }} />

      <div className="pt-24 px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div className="mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-bold mb-2">Income</h1>
            <p className="text-muted-foreground">Track all your income sources</p>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <GlassCard glow="primary">
              <p className="text-muted-foreground text-sm mb-1">Total Income</p>
              <p className="text-3xl font-bold text-green-400">${totalIncome.toFixed(2)}</p>
            </GlassCard>
            <GlassCard glow="accent">
              <p className="text-muted-foreground text-sm mb-1">Average Income</p>
              <p className="text-3xl font-bold text-cyan-400">${avgIncome}</p>
            </GlassCard>
            <GlassCard glow="primary">
              <p className="text-muted-foreground text-sm mb-1">Income Sources</p>
              <p className="text-3xl font-bold">{incomeItems.length}</p>
            </GlassCard>
          </motion.div>

          {/* Income List */}
          <motion.div
            className="grid gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {incomeItems.map((income, index) => (
              <motion.div
                key={income.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <GlassCard hover className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div
                      className={`w-12 h-12 rounded-lg ${sourceColors[income.source] || "bg-white/10"} flex items-center justify-center font-bold`}
                    >
                      {income.source.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{income.source}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className={`px-2 py-1 rounded ${sourceColors[income.source] || "bg-white/10"}`}>
                          {income.frequency}
                        </span>
                        <span>{new Date(income.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="font-bold text-green-400">${income.amount.toFixed(2)}</p>
                    <button
                      onClick={() => handleDeleteIncome(income.id)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-all"
                    >
                      <Trash2 className="w-4 h-4 text-muted-foreground hover:text-red-400" />
                    </button>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <FABButton onClick={() => setShowModal(true)}>
        <Plus className="w-6 h-6" />
      </FABButton>

      <AddIncomeModal isOpen={showModal} onClose={() => setShowModal(false)} onAdd={handleAddIncome} />
    </main>
  )
}
