'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import {
  ArrowLeftRight,
  Search,
  Download,
  PieChart,
  Wallet,
  User,
  Menu,
  X,
  ExternalLink,
  ArrowUpRight,
  ArrowDownLeft,
  Hash,
  RefreshCw,
  Link,
  ChevronRight
} from 'lucide-react'

export default function TransactionsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedWallet, setSelectedWallet] = useState('0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [isLoading, setIsLoading] = useState(false)
  const [txPage, setTxPage] = useState(1)
  const [txPerPage, setTxPerPage] = useState(10)

  // Responsive sidebar
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
    { address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb', balance: 45234.56 },
    { address: '0x8ba1f109551bD432803012645Ac136ddd64DBA72', balance: 23456.78 },
    { address: '0x9c2B6C3e1B4f5F3cD4A5B6C7D8E9F0A1B2C3D4E5', balance: 89012.34 }
  ]

  const transactions = [
    { hash: '0x1a2b3c', from: wallets[0].address, to: wallets[1].address, value: 2.5, value_usd: 4250, token_symbol: 'ETH', timestamp: 1729180800 },
    { hash: '0x2b3c4d', from: wallets[1].address, to: wallets[0].address, value: 1500, value_usd: 1500, token_symbol: 'USDT', timestamp: 1729167200 },
    { hash: '0x3c4d5e', from: wallets[0].address, to: wallets[2].address, value: 0.8, value_usd: 1360, token_symbol: 'ETH', timestamp: 1729153600 },
    { hash: '0x4d5e6f', from: wallets[2].address, to: wallets[0].address, value: 500, value_usd: 500, token_symbol: 'USDC', timestamp: 1729140000 }
  ]

  const navigationItems = [
    { icon: PieChart, label: 'Portfolio', href: '/portfolio', active: false },
    { icon: Wallet, label: 'Wallets', href: '/wallets', active: false },
    { icon: ArrowLeftRight, label: 'Transactions', href: '/transactions', active: true }
  ]

  const formatAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`

  const getTransactionType = (tx: any) => {
    if (tx.from.toLowerCase() === selectedWallet.toLowerCase())
      return { type: 'sent', color: 'text-red-400', icon: ArrowUpRight, bg: 'bg-red-500/10', border: 'border-red-500/20' }
    if (tx.to.toLowerCase() === selectedWallet.toLowerCase())
      return { type: 'received', color: 'text-green-400', icon: ArrowDownLeft, bg: 'bg-green-500/10', border: 'border-green-500/20' }
    return { type: 'other', color: 'text-muted-foreground', icon: ArrowLeftRight, bg: 'bg-muted/10', border: 'border-border' }
  }

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch =
      tx.hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.to.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter =
      filterType === 'all' ||
      (filterType === 'sent' && tx.from.toLowerCase() === selectedWallet.toLowerCase()) ||
      (filterType === 'received' && tx.to.toLowerCase() === selectedWallet.toLowerCase()) ||
      (filterType === 'eth' && tx.token_symbol === 'ETH') ||
      (filterType === 'tokens' && tx.token_symbol !== 'ETH')
    return matchesSearch && matchesFilter
  })

  const paginatedTransactions = filteredTransactions.slice((txPage - 1) * txPerPage, txPage * txPerPage)

  const stats = [
    { label: 'Total Transactions', value: transactions.length, icon: Hash },
    { label: 'Sent', value: transactions.filter(t => t.from.toLowerCase() === selectedWallet.toLowerCase()).length, icon: ArrowUpRight },
    { label: 'Received', value: transactions.filter(t => t.to.toLowerCase() === selectedWallet.toLowerCase()).length, icon: ArrowDownLeft }
  ]

  // Animations
  const containerVariants: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }
  const itemVariants: Variants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } } }
  const sidebarVariants: Variants = { open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } }, closed: { x: -300, transition: { type: 'spring', stiffness: 300, damping: 30 } } }
  const tableRowVariants = { hidden: { opacity: 0, x: -20 }, visible: (i: number) => ({ opacity: 1, x: 0, transition: { delay: i * 0.05 } }) }
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
      {/* Mobile menu button */}
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
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Wallet className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">WalletHub</span>
          </div>
          <button className="lg:hidden p-2 hover:bg-secondary rounded-lg transition-colors" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="space-y-2 mb-6">
          {navigationItems.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
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
              <span className="flex-1">{item.label}</span>
              {item.active && <ChevronRight className="w-4 h-4" />}
            </motion.a>
          ))}
        </nav>
      </motion.aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold mb-2">Transactions</h1>
                <p className="text-muted-foreground">Track all your wallet activity in real-time</p>
              </div>
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsLoading(true)}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                >
                  <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline">Refresh</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  <Download className="w-5 h-5" />
                  <span className="hidden sm:inline">Export</span>
                </motion.button>
              </div>
            </div>

            {/* Stats Cards */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className="p-6 rounded-2xl bg-card border border-border"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
                      <div className="text-3xl font-bold">{stat.value}</div>
                    </div>
                    <div className="p-3 rounded-xl bg-secondary">
                      <stat.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Wallet Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6"
            >
              <label className="block text-sm font-medium mb-3">Select Wallet</label>
              <select
                value={selectedWallet}
                onChange={(e) => setSelectedWallet(e.target.value)}
                className="w-full px-4 py-3 bg-card border border-border rounded-xl focus:ring-2 focus:ring-ring focus:outline-none cursor-pointer transition-all"
              >
                {wallets.map((wallet) => (
                  <option key={wallet.address} value={wallet.address}>
                    {formatAddress(wallet.address)} - ${wallet.balance.toLocaleString()}
                  </option>
                ))}
              </select>
            </motion.div>

            {/* Search and Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by hash, from, or to address..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-xl focus:ring-2 focus:ring-ring focus:outline-none transition-all"
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-6 py-3 bg-card border border-border rounded-xl focus:ring-2 focus:ring-ring focus:outline-none cursor-pointer"
              >
                <option value="all">All Transactions</option>
                <option value="sent">Sent</option>
                <option value="received">Received</option>
                <option value="eth">ETH Only</option>
                <option value="tokens">Tokens Only</option>
              </select>
            </motion.div>
          </motion.div>

          {/* Transactions List */}
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <RefreshCw className="w-12 h-12 text-primary animate-spin mb-4" />
              <p className="text-lg text-muted-foreground">Loading transactions...</p>
            </motion.div>
          ) : paginatedTransactions.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                <ArrowLeftRight className="w-10 h-10 text-muted-foreground" />
              </div>
              <p className="text-lg text-muted-foreground">No transactions found</p>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-3"
            >
              {paginatedTransactions.map((tx, i) => {
                const txType = getTransactionType(tx)
                const TypeIcon = txType.icon
                return (
                  <motion.div
                    key={tx.hash}
                    custom={i}
                    variants={tableRowVariants}
                    whileHover={{ scale: 1.01, y: -2 }}
                    className="p-4 sm:p-6 rounded-2xl bg-card border border-border hover:border-border/50 transition-all cursor-pointer"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      {/* Type Badge */}
                      <div className={`flex items-center gap-3 px-4 py-2 rounded-xl ${txType.bg} border ${txType.border} min-w-fit`}>
                        <TypeIcon className={`w-5 h-5 ${txType.color}`} />
                        <span className={`text-sm font-semibold ${txType.color} uppercase`}>
                          {txType.type}
                        </span>
                      </div>

                      {/* Transaction Details */}
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Hash */}
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Hash</div>
                          <a
                            href={`https://etherscan.io/tx/${tx.hash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-sm text-primary hover:underline"
                          >
                            {formatAddress(tx.hash)}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>

                        {/* Value */}
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Value</div>
                          <div className="text-sm font-semibold">
                            {tx.value.toFixed(4)} {tx.token_symbol}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            ${tx.value_usd.toFixed(2)}
                          </div>
                        </div>

                        {/* From/To */}
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">
                            {txType.type === 'sent' ? 'To' : 'From'}
                          </div>
                          <div className="text-sm font-mono">
                            {formatAddress(txType.type === 'sent' ? tx.to : tx.from)}
                          </div>
                        </div>

                        {/* Time */}
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Time</div>
                          <div className="text-sm">
                            {new Date(tx.timestamp * 1000).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(tx.timestamp * 1000).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          )}

          {/* Pagination */}
          {filteredTransactions.length > txPerPage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-card border border-border"
            >
              <div className="text-sm text-muted-foreground">
                Showing {((txPage - 1) * txPerPage) + 1} to {Math.min(txPage * txPerPage, filteredTransactions.length)} of {filteredTransactions.length} transactions
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTxPage(Math.max(1, txPage - 1))}
                  disabled={txPage === 1}
                  className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <div className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground font-semibold">
                  {txPage}
                </div>
                <button
                  onClick={() => setTxPage(txPage + 1)}
                  disabled={txPage * txPerPage >= filteredTransactions.length}
                  className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}