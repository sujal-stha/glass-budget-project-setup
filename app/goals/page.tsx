"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { GlassCard } from "@/components/glass-card"
import { FABButton } from "@/components/fab-button"
import { Plus, Target, Trash2 } from "lucide-react"
import AddGoalModal from "@/components/add-goal-modal"

export default function GoalsPage() {
  const [showModal, setShowModal] = useState(false)
  const [goals, setGoals] = useState([
    { id: 1, name: "Emergency Fund", target: 10000, current: 7200, deadline: "2025-12-31", priority: "high" },
    { id: 2, name: "Vacation", target: 5000, current: 2250, deadline: "2025-06-30", priority: "medium" },
    { id: 3, name: "New Laptop", target: 2000, current: 1760, deadline: "2025-03-31", priority: "high" },
    { id: 4, name: "Car Down Payment", target: 15000, current: 4500, deadline: "2026-12-31", priority: "low" },
  ])

  const handleAddGoal = (newGoal: any) => {
    setGoals([{ ...newGoal, id: Math.max(...goals.map((g) => g.id), 0) + 1 }, ...goals])
    setShowModal(false)
  }

  const handleDeleteGoal = (id: number) => {
    setGoals(goals.filter((g) => g.id !== id))
  }

  const priorityColors = {
    high: "border-red-400/50 bg-red-400/10",
    medium: "border-yellow-400/50 bg-yellow-400/10",
    low: "border-green-400/50 bg-green-400/10",
  }

  const priorityBadgeColors = {
    high: "bg-red-400/20 text-red-300",
    medium: "bg-yellow-400/20 text-yellow-300",
    low: "bg-green-400/20 text-green-300",
  }

  const totalTarget = goals.reduce((sum, goal) => sum + goal.target, 0)
  const totalCurrent = goals.reduce((sum, goal) => sum + goal.current, 0)
  const overallProgress = ((totalCurrent / totalTarget) * 100).toFixed(1)

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navbar user={{ name: "User" }} />

      <div className="pt-24 px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div className="mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-bold mb-2">Savings Goals</h1>
            <p className="text-muted-foreground">Track and achieve your financial goals</p>
          </motion.div>

          {/* Overall Progress */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <GlassCard glow="accent">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Overall Progress</h2>
                  <span className="text-2xl font-bold text-cyan-400">{overallProgress}%</span>
                </div>
                <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-400 to-blue-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${overallProgress}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>${totalCurrent.toFixed(2)} saved</span>
                  <span>${totalTarget.toFixed(2)} target</span>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Goals Grid */}
          <motion.div
            className="grid gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {goals.map((goal, index) => {
              const progress = ((goal.current / goal.target) * 100).toFixed(0)
              const daysLeft = Math.ceil(
                (new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
              )

              return (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <GlassCard hover className={`border ${priorityColors[goal.priority]}`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 rounded-lg bg-blue-400/20 flex items-center justify-center">
                          <Target className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-lg">{goal.name}</h3>
                            <span className={`text-xs px-2 py-1 rounded ${priorityBadgeColors[goal.priority]}`}>
                              {goal.priority.charAt(0).toUpperCase() + goal.priority.slice(1)} Priority
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{daysLeft} days left</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteGoal(goal.id)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-all"
                      >
                        <Trash2 className="w-4 h-4 text-muted-foreground hover:text-red-400" />
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-2">
                          <p className="text-sm font-medium">${goal.current.toFixed(2)}</p>
                          <p className="text-sm text-muted-foreground">${goal.target.toFixed(2)}</p>
                        </div>
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold">{progress}% Complete</span>
                        <span className="text-muted-foreground">By {new Date(goal.deadline).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>

      <FABButton onClick={() => setShowModal(true)}>
        <Plus className="w-6 h-6" />
      </FABButton>

      <AddGoalModal isOpen={showModal} onClose={() => setShowModal(false)} onAdd={handleAddGoal} />
    </main>
  )
}
