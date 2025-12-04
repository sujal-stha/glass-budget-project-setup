"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { DollarSign, TrendingUp, Target, PieChart, Plus } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { StatCard } from "@/components/stat-card"
import { GlassCard } from "@/components/glass-card"
import { FABButton } from "@/components/fab-button"

export default function DashboardPage() {
  const [showAddModal, setShowAddModal] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navbar user={{ name: "User" }} />

      <div className="pt-24 px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div className="mb-12" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-bold mb-2">Welcome back, User</h1>
            <p className="text-muted-foreground">Here's your financial overview</p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <StatCard icon={DollarSign} label="Total Income" value="$12,450" change="+12.5%" color="success" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatCard icon={TrendingUp} label="Total Expenses" value="$5,240" change="-8.2%" color="accent" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatCard icon={Target} label="Remaining" value="$7,210" change="+20.7%" color="primary" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatCard icon={PieChart} label="Savings Rate" value="57.9%" color="success" />
            </motion.div>
          </motion.div>

          {/* Main Content Grid */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Recent Transactions */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <GlassCard glow="primary">
                <h2 className="text-xl font-bold mb-6">Recent Transactions</h2>
                <div className="space-y-4">
                  {[
                    { name: "Grocery Store", amount: "-$89.50", category: "Food", date: "Today" },
                    { name: "Freelance Payment", amount: "+$500", category: "Income", date: "Yesterday" },
                    { name: "Gas Station", amount: "-$45.20", category: "Transport", date: "2 days ago" },
                    { name: "Salary Deposit", amount: "+$4,500", category: "Income", date: "3 days ago" },
                  ].map((tx, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center justify-between pb-4 border-b border-border/50 last:border-0"
                      whileHover={{ x: 4 }}
                    >
                      <div>
                        <p className="font-medium text-foreground">{tx.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {tx.category} • {tx.date}
                        </p>
                      </div>
                      <p className={`font-bold ${tx.amount.startsWith("+") ? "text-green-400" : "text-red-400"}`}>
                        {tx.amount}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* Savings Goals */}
            <motion.div variants={itemVariants}>
              <GlassCard glow="accent">
                <h2 className="text-xl font-bold mb-6">Savings Goals</h2>
                <div className="space-y-4">
                  {[
                    { name: "Emergency Fund", progress: 72 },
                    { name: "Vacation", progress: 45 },
                    { name: "New Laptop", progress: 88 },
                  ].map((goal, i) => (
                    <motion.div key={i} whileHover={{ x: 2 }}>
                      <div className="flex justify-between mb-2">
                        <p className="text-sm font-medium">{goal.name}</p>
                        <p className="text-xs text-muted-foreground">{goal.progress}%</p>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-accent to-primary"
                          initial={{ width: 0 }}
                          animate={{ width: `${goal.progress}%` }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <FABButton onClick={() => setShowAddModal(true)}>
        <Plus className="w-6 h-6" />
      </FABButton>
    </main>
  )
}
