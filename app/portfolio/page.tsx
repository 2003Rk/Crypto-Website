'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import {
  PieChart,
  DollarSign,
  Shield,
  AlertTriangle,
  CheckCircle,
  Wallet,
  ArrowLeftRight,
  User,
  Eye,
  Menu,
  X,
  TrendingUp,
  Activity,
  RefreshCw,
  ChevronRight
} from 'lucide-react'
import Link from 'next/link'

export default function PortfolioPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const wallets = [
    {
      address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
      total_portfolio_value_usd: 45234.56,
      eth_balance: 12.5,
      total_token_value_usd: 32734.56,
      holdings_count: 8,
      transaction_count: 156
    },
    {
      address: '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
      total_portfolio_value_usd: 23456.78,
      eth_balance: 5.2,
      total_token_value_usd: 18256.78,
      holdings_count: 12,
      transaction_count: 203
    },
    {
      address: '0x9c2B6C3e1B4f5F3cD4A5B6C7D8E9F0A1B2C3D4E5',
      total_portfolio_value_usd: 89012.34,
      eth_balance: 28.7,
      total_token_value_usd: 88512.34,
      holdings_count: 15,
      transaction_count: 421
    }
  ]

  const topHoldings = [
    { name: 'Ethereum', symbol: 'ETH', balance: 46.4, value_usd: 78880 },
    { name: 'USD Coin', symbol: 'USDC', balance: 45000, value_usd: 45000 },
    { name: 'Wrapped Bitcoin', symbol: 'WBTC', balance: 0.8, value_usd: 35200 },
    { name: 'Uniswap', symbol: 'UNI', balance: 2500, value_usd: 15000 },
    { name: 'Chainlink', symbol: 'LINK', balance: 800, value_usd: 11200 }
  ]

  const navigationItems = [
    { icon: PieChart, label: 'Portfolio', href: '/portfolio', active: true },
    { icon: Wallet, label: 'Wallets', href: '/wallets', active: false },
    { icon: ArrowLeftRight, label: 'Transactions', href: '/transactions', active: false }
  ]

  const totalValue = wallets.reduce((sum, w) => sum + w.total_portfolio_value_usd, 0)
  const totalETH = wallets.reduce((sum, w) => sum + w.eth_balance, 0)
  const totalTokens = wallets.reduce((sum, w) => sum + w.total_token_value_usd, 0)
  const totalHoldings = wallets.reduce((sum, w) => sum + w.holdings_count, 0)
  const riskyWallets = wallets.filter((w) => w.total_portfolio_value_usd > 100000).length

  const ethPercentage = totalValue ? ((totalETH * 3500) / totalValue) * 100 : 0
  const tokenPercentage = 100 - ethPercentage

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  }

  const sidebarVariants: Variants = {
    open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    closed: { x: -300, transition: { type: 'spring', stiffness: 300, damping: 30 } }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/40 via-30% to-black text-foreground relative overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-600/10 rounded-full blur-2xl"></div>
      </div>
      {/* Content wrapper with relative positioning */}
      <div className="relative z-10 flex">
        {/* Mobile Menu Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden fixed top-4 right-4 z-50 p-3 rounded-xl bg-card border border-border shadow-lg"
        >
          <Menu className="w-5 h-5" />
        </motion.button>

        {/* Overlay */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <motion.aside
          initial={false}
          animate={sidebarOpen || isDesktop ? 'open' : 'closed'}
          variants={sidebarVariants}
          className="fixed lg:static inset-y-0 left-0 z-50 w-64 xl:w-72 bg-card border-r border-border p-6 flex flex-col"
        >

          {/* Logo */}
          <div className="flex items-center justify-between mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <img 
                src="/verifil.svg" 
                alt="Verifil Logo" 
                className="w-10 h-10"
              />
              <span className="text-xl font-bold">VeriFil</span>
            </motion.div>
            <button
              className="lg:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Status Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6 p-4 rounded-xl bg-secondary/50 border border-border"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">Portfolio Status</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-green-500 font-medium">Live</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between py-1.5 border-b border-border/50">
                <span className="text-xs text-muted-foreground">Total Value</span>
                <span className="text-sm font-semibold">${totalValue.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-border/50">
                <span className="text-xs text-muted-foreground">Wallets</span>
                <span className="text-sm font-semibold">{wallets.length}</span>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="text-xs text-muted-foreground">Last Sync</span>
                <span className="text-sm font-semibold">Just now</span>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <nav className="space-y-2 flex-1">
            <p className="text-xs text-muted-foreground px-4 mb-3 font-medium uppercase tracking-wider">Menu</p>

            {navigationItems.map((item, i) => (
              <Link key={item.label} href={item.href} className="w-full">
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                  whileHover={{ x: 4 }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${item.active
                    ? 'bg-secondary text-secondary-foreground shadow-md'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                    }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.active && <ChevronRight className="w-4 h-4" />}
                </motion.button>
              </Link>
            ))}
          </nav>

          {/* User Profile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-auto pt-6"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3 p-4 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors cursor-pointer"
            >
              <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">Account</div>
                <div className="text-xs text-muted-foreground">Free Plan</div>
              </div>
            </motion.div>
          </motion.div>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold mb-2">Portfolio Overview</h1>
                  <p className="text-muted-foreground">Complete view of your crypto holdings across all wallets</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsLoading(true)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                >
                  <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
                  <span>Refresh</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8"
            >
              {[
                { icon: DollarSign, label: 'Total Value', value: `$${totalValue.toLocaleString()}`, change: '+8.3%', color: 'text-green-400', bg: 'bg-green-500/10' },
                { icon: Wallet, label: 'ETH Balance', value: `${totalETH.toFixed(4)} ETH`, change: '+2.1%', color: 'text-blue-400', bg: 'bg-blue-500/10' },
                { icon: PieChart, label: 'Token Value', value: `$${totalTokens.toLocaleString()}`, change: '+12.5%', color: 'text-purple-400', bg: 'bg-purple-500/10' },
                { icon: Activity, label: 'Total Holdings', value: totalHoldings.toString(), change: '+5', color: 'text-orange-400', bg: 'bg-orange-500/10' }
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03, y: -4 }}
                  className="relative overflow-hidden p-6 rounded-2xl bg-card border border-border cursor-pointer group"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl ${stat.bg}`}>
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                      <span className={`text-xs font-semibold ${stat.color}`}>
                        {stat.change}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Portfolio Distribution & Risk Assessment */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Portfolio Distribution */}
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded-2xl bg-card border border-border"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Portfolio Distribution</h3>
                  <div className="p-2 rounded-lg bg-secondary">
                    <PieChart className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                        <span className="text-sm font-medium">Ethereum</span>
                      </div>
                      <span className="text-sm font-bold">{ethPercentage.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${ethPercentage}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="bg-blue-500 h-3 rounded-full"
                      />
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      ${(totalETH * 3500).toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-purple-500" />
                        <span className="text-sm font-medium">Tokens</span>
                      </div>
                      <span className="text-sm font-bold">{tokenPercentage.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${tokenPercentage}%` }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                        className="bg-purple-500 h-3 rounded-full"
                      />
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      ${totalTokens.toLocaleString()}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Risk Assessment */}
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded-2xl bg-card border border-border"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Risk Assessment</h3>
                  <div className="p-2 rounded-lg bg-secondary">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                    <div className="p-2 rounded-lg bg-green-500/20">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm mb-1">Portfolio Diversified</div>
                      <div className="text-xs text-muted-foreground">Good distribution across assets</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <div className="p-2 rounded-lg bg-blue-500/20">
                      <Shield className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm mb-1">Security Status</div>
                      <div className="text-xs text-muted-foreground">No detected threats</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                    <div className="p-2 rounded-lg bg-yellow-500/20">
                      <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm mb-1">High Value Wallets</div>
                      <div className="text-xs text-muted-foreground">{riskyWallets} wallets over $100k</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Top Holdings */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="mb-8 p-6 rounded-2xl bg-card border border-border"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Top Holdings</h3>
                <div className="p-2 rounded-lg bg-secondary">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div className="space-y-3">
                {topHoldings.map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                        <span className="text-lg font-bold">{h.symbol.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="font-semibold">{h.name}</div>
                        <div className="text-sm text-muted-foreground">{h.symbol}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">${h.value_usd.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">
                        {h.balance.toFixed(4)} {h.symbol}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Wallet Summary */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="p-6 rounded-2xl bg-card border border-border"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Wallet Summary</h3>
                <div className="p-2 rounded-lg bg-secondary">
                  <Wallet className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div className="space-y-3">
                {wallets.map((w, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                        <Wallet className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-semibold font-mono">
                          {w.address.slice(0, 6)}...{w.address.slice(-4)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {w.holdings_count} holdings • {w.transaction_count} transactions
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">${w.total_portfolio_value_usd.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">{w.eth_balance.toFixed(4)} ETH</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}