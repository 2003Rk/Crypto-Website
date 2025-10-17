'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import {
  Wallet,
  Plus,
  RefreshCw,
  Search,
  PieChart,
  ArrowLeftRight,
  User,
  Menu,
  X,
  TrendingUp,
  DollarSign,
  Activity,
  ChevronRight,
  Eye,
  EyeOff
} from 'lucide-react'
import Link from 'next/link'

export default function WalletDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedWallet, setSelectedWallet] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [showBalance, setShowBalance] = useState(true)
  const [sortBy, setSortBy] = useState('highest_value')
  const [isSyncing, setIsSyncing] = useState(false)
  const [showAddWallet, setShowAddWallet] = useState(false)

  // Automatically toggle sidebar for large screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true)
      } else {
        setSidebarOpen(false)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const wallets = [
    { id: 1, address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb', balance: 45234.56, change24h: 12.5, tokens: 8, nfts: 3 },
    { id: 2, address: '0x8ba1f109551bD432803012645Ac136ddd64DBA72', balance: 23456.78, change24h: -5.2, tokens: 12, nfts: 0 },
    { id: 3, address: '0x9c2B6C3e1B4f5F3cD4A5B6C7D8E9F0A1B2C3D4E5', balance: 89012.34, change24h: 8.7, tokens: 15, nfts: 7 }
  ]

  const stats = [
    { label: 'Total Balance', value: '$157,703.68', change: '+8.3%', icon: DollarSign, trend: 'up' },
    { label: 'Total Wallets', value: '3', change: '+1 this week', icon: Wallet, trend: 'neutral' },
    { label: 'Active Tokens', value: '35', change: '+12.5%', icon: Activity, trend: 'up' }
  ]

  const navigationItems = [
    { icon: PieChart, label: 'Portfolio', href: '/portfolio', },
    { icon: Wallet, label: 'Wallets', href: '/wallets', active: true },
    { icon: ArrowLeftRight, label: 'Transactions', href: '/transactions' }
  ]

  const handleSync = () => {
    setIsSyncing(true)
    setTimeout(() => setIsSyncing(false), 2000)
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
  }

  const sidebarVariants: Variants = {
    open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    closed: { x: -300, transition: { type: 'spring', stiffness: 300, damping: 30 } }
  }
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check window width only on client
    const handleResize = () => setIsMobile(window.innerWidth < 1024)

    handleResize() // initial check
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground flex overflow-hidden">

      {/* Mobile Menu Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 rounded-xl bg-card border border-border shadow-lg"
      >
        <Menu className="w-5 h-5" />
      </motion.button>

      {/* Overlay */}
      <AnimatePresence>
        {sidebarOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={sidebarOpen ? 'open' : 'closed'}
        variants={sidebarVariants}
        className="fixed lg:static inset-y-0 left-0 z-50 w-64 xl:w-72 bg-card border-r border-border p-6 flex flex-col"
      >
        {/* Logo */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Wallet className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">WalletHub</span>
          </div>
          <button
            className="lg:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats Overview */}
        <div className="mb-6 p-4 rounded-xl bg-secondary/50 border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Total Portfolio</span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowBalance(!showBalance)}
              className="p-1 hover:bg-background rounded"
            >
              {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </motion.button>
          </div>
          <div className="text-2xl font-bold mb-1">{showBalance ? '$157,703.68' : '••••••'}</div>
          <div className="flex items-center gap-1 text-green-500">
            <TrendingUp className="w-4 h-4" /> <span>+8.3% (24h)</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 mb-6">
          {navigationItems.map((item, i) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i }}
              whileHover={{ x: 4 }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${item.active
                ? 'bg-secondary text-secondary-foreground shadow-md'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                }`}
            >
              <item.icon className="w-5 h-5" />
              <Link className="flex-1 text-left" href={item.href}>{item.label}</Link>
              {item.active && <ChevronRight className="w-4 h-4" />}
            </motion.button>
          ))}
        </nav>

        {/* Quick Actions */}
        <div className="space-y-2 mb-6">
          <p className="text-xs text-muted-foreground px-4 mb-2">Quick Actions</p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowAddWallet(true)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Add Wallet</span>
          </motion.button>
        </div>

        {/* User Profile */}
        <div className="mt-auto">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors cursor-pointer">
            <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">Account</div>
              <div className="text-xs text-muted-foreground">Free Plan</div>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">Wallets</h1>
              <p className="text-muted-foreground">Manage and monitor your crypto wallets</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSync}
              disabled={isSyncing}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w - 5 h-5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">{isSyncing ? 'Syncing...' : 'Sync All'}</span>
            </motion.button>
          </div>
          {/* Stats Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative overflow-hidden p-6 rounded-2xl bg-card border border-border cursor-pointer group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${stat.trend === 'up' ? 'bg-green-500/10' : 'bg-secondary'}`}>
                      <stat.icon className={`w-6 h-6 ${stat.trend === 'up' ? 'text-green-500' : 'text-muted-foreground'}`} />
                    </div>
                    <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-500' : 'text-muted-foreground'}`}>
                      {stat.change}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search wallets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-xl focus:ring-2 focus:ring-ring focus:outline-none transition-all"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-6 py-3 bg-card border border-border rounded-xl focus:ring-2 focus:ring-ring focus:outline-none cursor-pointer"
            >
              <option value="highest_value">Highest Value</option>
              <option value="lowest_value">Lowest Value</option>
              <option value="recent">Most Recent</option>
            </select>
          </div>

          {/* Wallet Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {wallets.map((wallet) => (
              <motion.div
                key={wallet.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedWallet(wallet.id)}
                className={`relative overflow-hidden p-6 rounded-2xl border-2 cursor-pointer transition-all ${selectedWallet === wallet.id
                  ? 'bg-secondary border-primary shadow-lg shadow-primary/20'
                  : 'bg-card border-border hover:border-border/50'
                  }`}
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -mr-20 -mt-20" />
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Wallet className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Wallet #{wallet.id}</div>
                      <div className="text-sm font-mono">
                        {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="text-sm text-muted-foreground mb-1">Balance</div>
                  <div className="text-2xl font-bold">${showBalance ? wallet.balance.toLocaleString() : '••••••'}</div>
                  <div className={`flex items-center gap-1 text-sm mt-1 ${wallet.change24h > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    <TrendingUp className={`w-4 h-4 ${wallet.change24h < 0 ? 'rotate-180' : ''}`} />
                    <span>{wallet.change24h > 0 ? '+' : ''}{wallet.change24h}%</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                      <Activity className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Tokens</div>
                      <div className="text-sm font-semibold">{wallet.tokens}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                      <PieChart className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">NFTs</div>
                      <div className="text-sm font-semibold">{wallet.nfts}</div>
                    </div>
                  </div>
                </div>
                {selectedWallet === wallet.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 right-4 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>

      {/* Add Wallet Modal */}
      <AnimatePresence>
        {showAddWallet && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setShowAddWallet(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-card border border-border rounded-2xl p-8 max-w-md w-full shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Add New Wallet</h2>
                  <button
                    onClick={() => setShowAddWallet(false)}
                    className="p-2 hover:bg-secondary rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Enter wallet address..."
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl mb-4 focus:ring-2 focus:ring-ring focus:outline-none"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
                >
                  Add Wallet
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
