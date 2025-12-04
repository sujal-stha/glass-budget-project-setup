"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { GlassCard } from "@/components/glass-card"
import { FABButton } from "@/components/fab-button"
import { Plus, Trash2 } from "lucide-react"
import AddExpenseModal from "@/components/add-expense-modal"

export default function ExpensesPage() {
  const [showModal, setShowModal] = useState(false)
  const [expenses, setExpenses] = useState([
    { id: 1, name: "Grocery Store", amount: 89.5, category: "Food", date: "2025-12-04", status: "completed" },
    { id: 2, name: "Gas Station", amount: 45.2, category: "Transport", date: "2025-12-02", status: "completed" },
    { id: 3, name: "Electricity Bill", amount: 120, category: "Utilities", date: "2025-12-01", status: "completed" },
    {
      id: 4,
      name: "Netflix Subscription",
      amount: 15.99,
      category: "Entertainment",
      date: "2025-11-30",
      status: "completed",
    },
    { id: 5, name: "Restaurant", amount: 62.5, category: "Food", date: "2025-11-28", status: "completed" },
  ])

  const [selectedFilter, setSelectedFilter] = useState("all")

  const categoryColors: Record<string, string> = {
    Food: "bg-orange-500/20 text-orange-300",
    Transport: "bg-blue-500/20 text-blue-300",
    Utilities: "bg-purple-500/20 text-purple-300",
    Entertainment: "bg-pink-500/20 text-pink-300",
    Shopping: "bg-green-500/20 text-green-300",
  }

  const categories = ["Food", "Transport", "Utilities", "Entertainment", "Shopping"]

  const handleAddExpense = (newExpense: any) => {
    setExpenses([
      { ...newExpense, id: Math.max(...expenses.map((e) => e.id), 0) + 1, status: "completed" },
      ...expenses,
    ])
    setShowModal(false)
  }

  const handleDeleteExpense = (id: number) => {
    setExpenses(expenses.filter((e) => e.id !== id))
  }

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0)
  const avgExpense = (totalExpenses / expenses.length).toFixed(2)

  const filteredExpenses =
    selectedFilter === "all" ? expenses : expenses.filter((exp) => exp.category === selectedFilter)

  const filterGlassStyle: React.CSSProperties = {
    backdropFilter: "blur(40px)",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "0.5rem",
  }

  const filterGlassPrimaryStyle: React.CSSProperties = {
    ...filterGlassStyle,
    boxShadow: "0 0 20px rgba(139, 92, 246, 0.3), inset 0 0 20px rgba(139, 92, 246, 0.1)",
  }

  const filterGlassAccentStyle: React.CSSProperties = {
    ...filterGlassStyle,
    boxShadow: "0 0 20px rgba(85, 200, 255, 0.3), inset 0 0 20px rgba(85, 200, 255, 0.1)",
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navbar user={{ name: "User" }} />

      <div className="pt-24 px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div className="mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-bold mb-2">Expenses</h1>
            <p className="text-muted-foreground">Track and manage your spending</p>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <GlassCard glow="primary">
              <p className="text-muted-foreground text-sm mb-1">Total Expenses</p>
              <p className="text-3xl font-bold">${totalExpenses.toFixed(2)}</p>
            </GlassCard>
            <GlassCard glow="accent">
              <p className="text-muted-foreground text-sm mb-1">Average Expense</p>
              <p className="text-3xl font-bold">${avgExpense}</p>
            </GlassCard>
            <GlassCard glow="primary">
              <p className="text-muted-foreground text-sm mb-1">This Month</p>
              <p className="text-3xl font-bold">{expenses.length} transactions</p>
            </GlassCard>
          </motion.div>

          {/* Filters */}
          <motion.div
            className="flex flex-wrap gap-2 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <button
              onClick={() => setSelectedFilter("all")}
              style={selectedFilter === "all" ? filterGlassPrimaryStyle : undefined}
              className={`px-4 py-2 rounded-lg transition-all ${
                selectedFilter === "all" ? "" : "bg-white/5 hover:bg-white/10"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                style={selectedFilter === cat ? filterGlassAccentStyle : undefined}
                className={`px-4 py-2 rounded-lg transition-all ${
                  selectedFilter === cat ? "" : "bg-white/5 hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Expenses List */}
          <motion.div
            className="grid gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {filteredExpenses.map((expense, index) => (
              <motion.div
                key={expense.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <GlassCard hover className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div
                      className={`w-12 h-12 rounded-lg ${categoryColors[expense.category] || "bg-white/10"} flex items-center justify-center font-bold`}
                    >
                      {expense.category.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{expense.name}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className={`px-2 py-1 rounded ${categoryColors[expense.category] || "bg-white/10"}`}>
                          {expense.category}
                        </span>
                        <span>{new Date(expense.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="font-bold text-red-400">${expense.amount.toFixed(2)}</p>
                    <button
                      onClick={() => handleDeleteExpense(expense.id)}
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

      <AddExpenseModal isOpen={showModal} onClose={() => setShowModal(false)} onAdd={handleAddExpense} />
    </main>
  )
}
