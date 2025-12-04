"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { GlassCard } from "@/components/glass-card"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

export default function ReportsPage() {
  const monthlyData = [
    { month: "Jan", income: 5000, expenses: 2000, savings: 3000 },
    { month: "Feb", income: 5200, expenses: 2100, savings: 3100 },
    { month: "Mar", income: 5500, expenses: 2300, savings: 3200 },
    { month: "Apr", income: 5300, expenses: 2150, savings: 3150 },
    { month: "May", income: 5800, expenses: 2400, savings: 3400 },
    { month: "Jun", income: 6000, expenses: 2500, savings: 3500 },
  ]

  const categoryData = [
    { name: "Food", value: 800 },
    { name: "Transport", value: 400 },
    { name: "Utilities", value: 600 },
    { name: "Entertainment", value: 300 },
    { name: "Other", value: 500 },
  ]

  const COLORS = ["#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b"]

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navbar user={{ name: "User" }} />

      <div className="pt-24 px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div className="mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-bold mb-2">Reports & Analytics</h1>
            <p className="text-muted-foreground">Detailed insights into your finances</p>
          </motion.div>

          {/* Summary Stats */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <GlassCard glow="primary">
              <p className="text-muted-foreground text-sm mb-1">Total Income</p>
              <p className="text-2xl font-bold text-green-400">$32,800</p>
            </GlassCard>
            <GlassCard glow="accent">
              <p className="text-muted-foreground text-sm mb-1">Total Expenses</p>
              <p className="text-2xl font-bold text-red-400">$13,250</p>
            </GlassCard>
            <GlassCard glow="primary">
              <p className="text-muted-foreground text-sm mb-1">Total Savings</p>
              <p className="text-2xl font-bold text-cyan-400">$19,550</p>
            </GlassCard>
            <GlassCard glow="accent">
              <p className="text-muted-foreground text-sm mb-1">Savings Rate</p>
              <p className="text-2xl font-bold text-emerald-400">59.6%</p>
            </GlassCard>
          </motion.div>

          {/* Charts Grid */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Income vs Expenses */}
            <GlassCard glow="primary">
              <h2 className="text-xl font-bold mb-6">Income vs Expenses</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "rgba(15,23,42,0.8)", border: "1px solid rgba(255,255,255,0.1)" }}
                    cursor={{ fill: "rgba(255,255,255,0.05)" }}
                  />
                  <Legend />
                  <Bar dataKey="income" fill="#10b981" />
                  <Bar dataKey="expenses" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </GlassCard>

            {/* Expense Categories */}
            <GlassCard glow="accent">
              <h2 className="text-xl font-bold mb-6">Expense Breakdown</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: $${value}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: "rgba(15,23,42,0.8)", border: "1px solid rgba(255,255,255,0.1)" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </GlassCard>

            {/* Savings Trend */}
            <GlassCard glow="primary" className="lg:col-span-2">
              <h2 className="text-xl font-bold mb-6">Savings Trend</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "rgba(15,23,42,0.8)", border: "1px solid rgba(255,255,255,0.1)" }}
                    cursor={{ stroke: "rgba(255,255,255,0.2)" }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="savings"
                    stroke="#06b6d4"
                    strokeWidth={2}
                    dot={{ fill: "#06b6d4", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </GlassCard>
          </motion.div>

          {/* Insights */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <GlassCard glow="accent">
              <h3 className="font-bold mb-2">Top Expense Category</h3>
              <p className="text-2xl font-bold text-orange-400">Food</p>
              <p className="text-xs text-muted-foreground mt-1">$800/month (30%)</p>
            </GlassCard>
            <GlassCard glow="primary">
              <h3 className="font-bold mb-2">Monthly Growth</h3>
              <p className="text-2xl font-bold text-green-400">+5.2%</p>
              <p className="text-xs text-muted-foreground mt-1">Savings growth YoY</p>
            </GlassCard>
            <GlassCard glow="accent">
              <h3 className="font-bold mb-2">Budget Status</h3>
              <p className="text-2xl font-bold text-cyan-400">On Track</p>
              <p className="text-xs text-muted-foreground mt-1">20% under budget</p>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
