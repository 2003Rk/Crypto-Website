'use client'

import { useState, useEffect } from 'react'
import { ArrowRight, Shield, Eye, TrendingUp, Wallet, Check, Zap, Lock } from 'lucide-react'
import StatsSection from '@/components/States'
import Link from 'next/link'
import Image from 'next/image'

// Constants for statistics
const STATS = {
  scamsDetected: 1300,
  users: 1000,
  walletsScanned: 10000,
}

export default function LandingPage() {
  const [counts, setCounts] = useState({
    scamsDetected: 0,
    users: 0,
    walletsScanned: 0,
  })

  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll for navbar animation with smooth transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const features = [
    {
      icon: Shield,
      title: 'Risk Analysis',
      description: 'Detect honeypots, rug pulls, and risky tokens automatically with advanced AI-powered detection',
    },
    {
      icon: Eye,
      title: 'Real-time Monitoring',
      description: 'Track wallet balances and transactions with live blockchain data across multiple chains',
    },
    {
      icon: TrendingUp,
      title: 'Portfolio Insights',
      description: 'Get comprehensive analytics on your crypto holdings with detailed performance metrics',
    },
  ]

  const benefits = [
    'Advanced scam detection algorithms',
    'Real-time blockchain monitoring',
    'Multi-wallet support',
    'Comprehensive risk reports',
    'Transaction history analysis',
    'Portfolio performance tracking',
  ]

  // Animate stats count-up
  useEffect(() => {
    const interval = setInterval(() => {
      setCounts((prev) => {
        const updated = { ...prev }
        let finished = true
        Object.keys(STATS).forEach((key) => {
          const k = key as keyof typeof STATS
          if (prev[k] < STATS[k]) {
            updated[k] = Math.min(prev[k] + Math.ceil(STATS[k] / 100), STATS[k])
            finished = false
          }
        })
        if (finished) clearInterval(interval)
        return updated
      })
    }, 20)
  }, [])

  return (
    <div className="min-h-screen relative text-white">
      {/* Global Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-0"
        style={{
          filter: 'brightness(0.4) contrast(1.1) saturate(1.2)',
          objectPosition: 'center center'
        }}
      >
        <source src="/backgroundvid.mp4" type="video/mp4" />
      </video>

      {/* Global dark overlay for better text readability */}
      <div className="fixed inset-0 bg-black/50 z-10"></div>

      {/* All content wrapper with higher z-index */}
      <div className="relative z-20">
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      {/* Navigation */}
      {/* Navigation */}
      <nav className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className={`transition-all duration-500 ease-in-out ${!isScrolled ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
            {/* Split navbar - two separate sections WITHOUT containers */}
            <div className="flex justify-between items-center gap-4">
              {/* Left section - Logo */}
              <div className="pl-0 py-9">
                <div className="flex items-center gap-2 ml-0">
                  <div className="w-20 h-10 rounded-lg flex items-center justify-center">
                    <img src="/verifil.svg" alt="VeriFil" className="w-20 h-11" />
                  </div>
                 
                </div>
              </div>

              {/* Right section - Menu and Button */}
              <div className="px-2 py-3">
                <div className="flex items-center gap-8">
                  <div className="hidden md:flex items-center gap-8">
                    <a href="#features" className="text-gray-300 hover:text-white transition-colors duration-150">Features</a>
                    <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors duration-150">How It Works</a>
                    <a href="#pricing" className="text-gray-300 hover:text-white transition-colors duration-150">Pricing</a>
                  </div>
                  <button className="px-6 py-2.5 bg-gradient-to-r from-purple-600 via-violet-600 to-purple-800 text-white font-medium rounded-full hover:shadow-lg hover:shadow-violet-500/50 hover:scale-105 transition-all duration-150">
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className={`absolute top-0 left-0 right-0 transition-all duration-500 ease-in-out ${isScrolled ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
            {/* Merged navbar - single section WITH container */}
            <div className="mx-auto max-w-5xl bg-black/80 backdrop-blur-md rounded-full border border-purple-500/30 shadow-lg shadow-purple-500/20">
              <div className="flex justify-between items-center h-16 px-6">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                    <img src="/verifil.svg" alt="VeriFil" className="w-10 h-10" />
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-violet-500 to-purple-600 bg-clip-text text-transparent">
                    VeriFil
                  </span>
                </div>
                <div className="hidden md:flex items-center gap-8">
                  <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
                  <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</a>
                  <a href="#security" className="text-gray-300 hover:text-white transition-colors">Security</a>
                </div>
                <Link href="/portfolio" className="px-6 py-2.5 bg-gradient-to-r from-purple-600 via-violet-600 to-purple-800 text-white font-medium rounded-full hover:shadow-lg hover:shadow-violet-500/50 hover:scale-105 transition-all duration-300">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>


      {/* Hero Section - Full Screen */}
      <section className="h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Floating Navigation Elements */}
        <div className="absolute top-0 left-0 right-0 z-30 p-6">
          <div className="flex justify-between items-center">
            {/* Logo - Top Left with more margin */}
            <div className="flex items-center ml-8 mt-4 animate-in fade-in slide-in-from-left-8 duration-1000 delay-200">
              
            </div>
          </div>
        </div>

        {/* Content - Left Aligned with Right Image */}
        <div className="w-full relative z-20 flex items-center gap-16 pl-16 pr-12">
          <div className="max-w-2xl text-left flex-shrink-0">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
              <span className="text-white">Verifil</span>
            </h1>
            <p className="text-xl md:text-2xl text-white mb-10 leading-relaxed font-light animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700">
              Advanced blockchain security that protects your crypto investments from scams, honeypots, and risky tokens with real-time analysis.
            </p>
            <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-900">
              <Link
                href="/wallets"
                className="bg-primary text-primary-foreground px-10 py-4 rounded-xl text-xl font-bold hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 flex items-center gap-3 shadow-2xl w-fit"
              >
                Start Analyzing
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button
                className="px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white/10 transition-all duration-300 font-semibold text-lg backdrop-blur-sm w-fit"
              >
                Watch Demo
              </button>
            </div>
          </div>

          {/* Demonstration Image - Positioned More to the Right */}
          <div className="flex-1 max-w-3xl ml-16 animate-in fade-in slide-in-from-right-12 duration-1200 delay-600">
            <Image
              src="/demonstration.png"
              alt="Verifil Dashboard Demonstration"
              width={800}
              height={600}
              className="w-full h-auto rounded-xl shadow-2xl"
            />
          </div>
        </div>
      </section>
      <StatsSection />
      {/* Features Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-950/30 via-black to-violet-950/30 -z-10"></div>
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-violet-600 rounded-full blur-3xl opacity-15 -z-10"></div>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-full text-gray-300 text-sm font-medium mb-4">
              Features
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You Need to
              <span className="block bg-gradient-to-r from-purple-500 via-violet-600 to-purple-700 bg-clip-text text-transparent">
                Stay Protected
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Advanced blockchain analysis tools powered by cutting-edge technology
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-violet-500/50 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-violet-500" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Threats Section */}
      <section id="security" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-violet-950/10 to-black -z-10"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-violet-600 rounded-full blur-3xl opacity-10 -z-10"></div>

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 text-sm font-medium mb-4">
              Security Threats
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Common Blockchain
              <span className="block bg-gradient-to-r from-red-500 via-orange-500 to-red-600 bg-clip-text text-transparent">
                Scams We Detect
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Stay protected from the most dangerous threats in the crypto space
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Honeypot Scam */}
            <div className="group relative overflow-hidden rounded-3xl border border-red-500/20 bg-gradient-to-br from-red-950/30 to-black hover:border-red-500/50 transition-all duration-300 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-8 h-full flex flex-col">
                <div className="w-16 h-16 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Lock className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Honeypot Tokens</h3>
                <p className="text-gray-300 leading-relaxed mb-4 flex-grow">
                  Tokens that allow buying but prevent selling. Scammers trap your funds by making it impossible to sell the token after purchase.
                </p>
                <div className="flex items-center gap-2 text-red-400 text-sm font-semibold">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  High Risk
                </div>
              </div>
            </div>

            {/* Rug Pull */}
            <div className="group relative overflow-hidden rounded-3xl border border-orange-500/20 bg-gradient-to-br from-orange-950/30 to-black hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-8 h-full flex flex-col">
                <div className="w-16 h-16 bg-orange-500/10 border border-orange-500/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-8 h-8 text-orange-500 rotate-180" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Rug Pulls</h3>
                <p className="text-gray-300 leading-relaxed mb-4 flex-grow">
                  Developers suddenly withdraw all liquidity from a project, leaving investors with worthless tokens and no way to sell.
                </p>
                <div className="flex items-center gap-2 text-orange-400 text-sm font-semibold">
                  <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                  Critical Risk
                </div>
              </div>
            </div>

            {/* Phishing Attacks */}
            <div className="group relative overflow-hidden rounded-3xl border border-yellow-500/20 bg-gradient-to-br from-yellow-950/30 to-black hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-8 h-full flex flex-col">
                <div className="w-16 h-16 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Eye className="w-8 h-8 text-yellow-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Phishing Attacks</h3>
                <p className="text-gray-300 leading-relaxed mb-4 flex-grow">
                  Fake websites and malicious smart contracts designed to steal your private keys and drain your wallet.
                </p>
                <div className="flex items-center gap-2 text-yellow-400 text-sm font-semibold">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
                  High Risk
                </div>
              </div>
            </div>

            {/* Pump and Dump */}
            <div className="group relative overflow-hidden rounded-3xl border border-pink-500/20 bg-gradient-to-br from-pink-950/30 to-black hover:border-pink-500/50 transition-all duration-300 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-8 h-full flex flex-col">
                <div className="w-16 h-16 bg-pink-500/10 border border-pink-500/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <ArrowRight className="w-8 h-8 text-pink-500 rotate-90" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Pump & Dump</h3>
                <p className="text-gray-300 leading-relaxed mb-4 flex-grow">
                  Coordinated schemes to artificially inflate token prices before selling off, leaving late investors with losses.
                </p>
                <div className="flex items-center gap-2 text-pink-400 text-sm font-semibold">
                  <span className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></span>
                  Medium Risk
                </div>
              </div>
            </div>

            {/* Fake Token Airdrops */}
            <div className="group relative overflow-hidden rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-950/30 to-black hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-8 h-full flex flex-col">
                <div className="w-16 h-16 bg-purple-500/10 border border-purple-500/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Wallet className="w-8 h-8 text-purple-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Fake Airdrops</h3>
                <p className="text-gray-300 leading-relaxed mb-4 flex-grow">
                  Malicious tokens sent to your wallet that require dangerous contract approvals, granting scammers access to your funds.
                </p>
                <div className="flex items-center gap-2 text-purple-400 text-sm font-semibold">
                  <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                  High Risk
                </div>
              </div>
            </div>

            {/* Smart Contract Exploits */}
            <div className="group relative overflow-hidden rounded-3xl border border-red-500/20 bg-gradient-to-br from-red-950/30 to-black hover:border-red-500/50 transition-all duration-300 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-8 h-full flex flex-col">
                <div className="w-16 h-16 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Contract Exploits</h3>
                <p className="text-gray-300 leading-relaxed mb-4 flex-grow">
                  Vulnerabilities in smart contract code that allow hackers to drain funds or manipulate token economics.
                </p>
                <div className="flex items-center gap-2 text-red-400 text-sm font-semibold">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  Critical Risk
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-violet-950/20 via-transparent to-violet-900/20 -z-10"></div>
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-violet-600 rounded-full blur-3xl opacity-15 -z-10"></div>
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-violet-500 rounded-full blur-3xl opacity-10 -z-10"></div>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Steps */}
            <div>
              <div className="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-full text-gray-300 text-sm font-medium mb-4">
                How It Works
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Get Protected in
                <span className="block bg-gradient-to-r from-purple-500 via-violet-600 to-purple-700 bg-clip-text text-transparent">
                  Three Simple Steps
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-12">
                Start securing your crypto portfolio in minutes with our intuitive platform
              </p>

              <div className="space-y-8">
                {[
                  { step: '01', title: 'Connect Your Wallet', desc: 'Simply enter your Ethereum wallet address' },
                  { step: '02', title: 'Analyze & Scan', desc: 'Our AI scans your portfolio for risks and threats' },
                  { step: '03', title: 'Get Protected', desc: 'Receive detailed reports and protection recommendations' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-600 via-violet-600 to-purple-800 rounded-2xl flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-violet-500/30">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                      <p className="text-gray-300">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Benefits list */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-12">
              <h3 className="text-2xl font-bold mb-8 text-white">Why Choose VeriFil?</h3>
              <div className="space-y-4">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-4 bg-black/50 border border-white/5 rounded-xl p-4 hover:border-violet-500/30 hover:shadow-md hover:shadow-violet-500/10 transition-all duration-300">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-600 via-violet-600 to-purple-800 rounded-lg flex items-center justify-center">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-200 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-black -z-10"></div>
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-violet-600 rounded-full blur-3xl opacity-25"></div>
        <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-violet-500 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-950/30 to-transparent"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Lock className="w-16 h-16 text-violet-500 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Secure Your Portfolio?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join thousands of users who trust VeriFil to protect their crypto investments with advanced security analysis
          </p>
          <Link href="/portfolio" className="px-10 py-5 bg-gradient-to-r from-purple-600 via-violet-600 to-purple-800 text-white rounded-full text-lg font-bold hover:shadow-2xl hover:shadow-violet-500/50 hover:scale-105 transition-all duration-300 inline-flex items-center gap-3">
            <Wallet className="w-6 h-6" />
            Get Started Free
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-gray-400 text-sm mt-6">No credit card required • Free forever</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 text-gray-400 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                  <img src="/verifil.svg" alt="VeriFil" className="w-10 h-10" />
                </div>
                <span className="text-2xl font-bold text-white">VeriFil</span>
              </div>
              <p className="text-sm">Secure your crypto portfolio with advanced blockchain analysis.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-violet-400 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-violet-400 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-violet-400 transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-violet-400 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-violet-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-violet-400 transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-violet-400 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-violet-400 transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-violet-400 transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-sm">
            <p>© 2025 VeriFil. All rights reserved. Built for crypto security.</p>
          </div>
        </div>
      </footer>
      </div>
    </div>
  )
}