"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { GlassCard } from "@/components/glass-card"
import { Bell, Lock, Palette, User, LogOut, Moon, Sun } from "lucide-react"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: true,
    darkMode: true,
    currency: "USD",
    language: "English",
  })

  const [userInfo, setUserInfo] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
  })

  const handleToggleSetting = (key: string) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSaveUserInfo = () => {
    alert("User info saved!")
  }

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
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div className="mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-bold mb-2">Settings</h1>
            <p className="text-muted-foreground">Manage your account and preferences</p>
          </motion.div>

          {/* Settings Sections */}
          <motion.div className="grid gap-6" variants={containerVariants} initial="hidden" animate="visible">
            {/* Account Settings */}
            <motion.div variants={itemVariants}>
              <GlassCard glow="primary">
                <div className="flex items-center gap-3 mb-6">
                  <User className="w-6 h-6 text-blue-400" />
                  <h2 className="text-xl font-bold">Account Settings</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      value={userInfo.name}
                      onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      value={userInfo.email}
                      onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <input
                      type="tel"
                      value={userInfo.phone}
                      onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                  <button
                    onClick={handleSaveUserInfo}
                    className="w-full py-2 bg-gradient-to-r from-cyan-400 to-blue-400 text-slate-950 font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-400/50 transition-all"
                  >
                    Save Changes
                  </button>
                </div>
              </GlassCard>
            </motion.div>

            {/* Notification Settings */}
            <motion.div variants={itemVariants}>
              <GlassCard glow="accent">
                <div className="flex items-center gap-3 mb-6">
                  <Bell className="w-6 h-6 text-cyan-400" />
                  <h2 className="text-xl font-bold">Notifications</h2>
                </div>

                <div className="space-y-4">
                  {[
                    { key: "notifications", label: "Push Notifications" },
                    { key: "emailAlerts", label: "Email Alerts" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between">
                      <label className="font-medium">{item.label}</label>
                      <button
                        onClick={() => handleToggleSetting(item.key)}
                        className={`relative w-12 h-6 rounded-full transition-all ${
                          settings[item.key as keyof typeof settings] ? "bg-cyan-400" : "bg-white/20"
                        }`}
                      >
                        <motion.div
                          className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"
                          animate={{
                            x: settings[item.key as keyof typeof settings] ? 24 : 0,
                          }}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* Appearance Settings */}
            <motion.div variants={itemVariants}>
              <GlassCard glow="primary">
                <div className="flex items-center gap-3 mb-6">
                  <Palette className="w-6 h-6 text-purple-400" />
                  <h2 className="text-xl font-bold">Appearance</h2>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="font-medium">Dark Mode</label>
                    <button
                      onClick={() => handleToggleSetting("darkMode")}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                        settings.darkMode ? "bg-blue-400/20 text-blue-300" : "bg-yellow-400/20 text-yellow-300"
                      }`}
                    >
                      {settings.darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                      {settings.darkMode ? "Enabled" : "Disabled"}
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Currency</label>
                    <select
                      value={settings.currency}
                      onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-cyan-400 transition-colors"
                    >
                      <option>USD</option>
                      <option>EUR</option>
                      <option>GBP</option>
                      <option>JPY</option>
                      <option>CAD</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Language</label>
                    <select
                      value={settings.language}
                      onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-cyan-400 transition-colors"
                    >
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                      <option>Chinese</option>
                    </select>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Security Settings */}
            <motion.div variants={itemVariants}>
              <GlassCard glow="accent">
                <div className="flex items-center gap-3 mb-6">
                  <Lock className="w-6 h-6 text-emerald-400" />
                  <h2 className="text-xl font-bold">Security</h2>
                </div>

                <button className="w-full py-2 px-4 bg-white/10 hover:bg-white/20 rounded-lg transition-all font-medium mb-3">
                  Change Password
                </button>
                <button className="w-full py-2 px-4 bg-white/10 hover:bg-white/20 rounded-lg transition-all font-medium">
                  Two-Factor Authentication
                </button>
              </GlassCard>
            </motion.div>

            {/* Logout */}
            <motion.div variants={itemVariants}>
              <button className="w-full py-3 px-4 bg-gradient-to-r from-red-400 to-pink-400 text-slate-950 font-bold rounded-lg hover:shadow-lg hover:shadow-red-400/50 transition-all flex items-center justify-center gap-2">
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
