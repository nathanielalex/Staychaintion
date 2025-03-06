"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Copy,
  ExternalLink,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  CheckCircle,
  XCircle,
  ChevronDown,
  QrCode,
  Shield,
  AlertTriangle,
  Wallet,
  LineChart,
  RefreshCw,
  Filter,
  Search,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts"
import { cn } from "@/lib/utils"

// Sample data for the wallet
const walletData = {
  address: "5a7b3c9d1e8f2g6h4i5j7k8l9m0n1o2p3q4r5s6t7u8v9w0x",
  balance: 125.45,
  usdValue: 2509.0,
  securityLevel: "high",
  lastBackup: "2024-05-15T10:30:00Z",
}

// Sample data for the price chart
const priceData = [
  { date: "May 01", price: 18.2 },
  { date: "May 02", price: 17.8 },
  { date: "May 03", price: 19.5 },
  { date: "May 04", price: 19.2 },
  { date: "May 05", price: 20.1 },
  { date: "May 06", price: 19.8 },
  { date: "May 07", price: 21.2 },
  { date: "May 08", price: 22.5 },
  { date: "May 09", price: 23.1 },
  { date: "May 10", price: 22.8 },
  { date: "May 11", price: 24.2 },
  { date: "May 12", price: 25.0 },
  { date: "May 13", price: 24.5 },
  { date: "May 14", price: 23.8 },
  { date: "May 15", price: 25.5 },
]

// Sample transaction data
const transactions = [
  {
    id: "tx1",
    type: "receive",
    amount: 10.5,
    from: "3x7b3c9d1e8f2g6h4i5j7k8l9m0n1o2p3q4r5s6t7u8v9w0x",
    to: walletData.address,
    date: "2024-05-15T14:30:00Z",
    status: "completed",
    fee: 0.001,
  },
  {
    id: "tx2",
    type: "send",
    amount: 5.25,
    from: walletData.address,
    to: "8b7c4d2e1f9g3h5i6j8k7l2m1n3o4p5q6r7s8t9u1v2w3x4y",
    date: "2024-05-14T09:15:00Z",
    status: "completed",
    fee: 0.001,
  },
  {
    id: "tx3",
    type: "receive",
    amount: 25.0,
    from: "2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z",
    to: walletData.address,
    date: "2024-05-12T18:45:00Z",
    status: "completed",
    fee: 0.001,
  },
  {
    id: "tx4",
    type: "stake",
    amount: 50.0,
    from: walletData.address,
    to: "stake_contract",
    date: "2024-05-10T11:20:00Z",
    status: "completed",
    fee: 0.002,
  },
  {
    id: "tx5",
    type: "send",
    amount: 12.75,
    from: walletData.address,
    to: "9d8c7b6a5f4e3d2c1b0a9z8y7x6w5v4u3t2s1r",
    date: "2024-05-08T15:10:00Z",
    status: "pending",
    fee: 0.001,
  },
]

// Sample neuron (staking) data
const neurons = [
  {
    id: "neuron1",
    amount: 50.0,
    status: "locked",
    startDate: "2024-01-15T00:00:00Z",
    lockupPeriod: "6 months",
    maturityDate: "2024-07-15T00:00:00Z",
    rewards: 2.5,
  },
  {
    id: "neuron2",
    amount: 25.0,
    status: "locked",
    startDate: "2024-03-10T00:00:00Z",
    lockupPeriod: "12 months",
    maturityDate: "2025-03-10T00:00:00Z",
    rewards: 0.8,
  },
]

export default function WalletPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isCopied, setIsCopied] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [transactionFilter, setTransactionFilter] = useState("all")

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletData.address)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const refreshBalance = () => {
    setIsRefreshing(true)
    // Simulate refresh
    setTimeout(() => setIsRefreshing(false), 1500)
  }

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.to.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter =
      transactionFilter === "all" ||
      tx.type === transactionFilter ||
      (transactionFilter === "pending" && tx.status === "pending")

    return matchesSearch && matchesFilter
  })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-7xl mx-auto px-4 py-8">
      <motion.div variants={item} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">ICP Wallet</h1>
          <p className="text-gray-500">Manage your Internet Computer Protocol assets</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={refreshBalance} className="flex items-center" disabled={isRefreshing}>
            <RefreshCw className={cn("w-4 h-4 mr-2", isRefreshing && "animate-spin")} />
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </Button>
          <a href="/">
            <Button className="bg-blue-600 hover:bg-blue-700">
                <Wallet className="w-4 h-4 mr-2" />
                Connect Hardware Wallet
            </Button>
          </a>
        </div>
      </motion.div>

      <motion.div variants={item}>
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="staking">Staking</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Wallet Overview Card */}
            <Card className="p-6 relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/2 z-0"></div>

              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-700 mb-1">Wallet Address</h2>
                    <div className="flex items-center space-x-2">
                      <code className="bg-gray-100 px-3 py-1 rounded text-sm font-mono truncate max-w-xs md:max-w-md">
                        {walletData.address}
                      </code>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button size="icon" onClick={copyToClipboard} className="h-8 w-8">
                              {isCopied ? (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{isCopied ? "Copied!" : "Copy address"}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button size="icon" className="h-8 w-8">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View on explorer</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>

                  <div className="flex flex-col items-start md:items-end">
                    <p className="text-sm text-gray-500">Available Balance</p>
                    <div className="flex items-baseline space-x-2">
                      <h3 className="text-3xl font-bold text-blue-600">{walletData.balance}</h3>
                      <span className="text-lg font-medium text-gray-700">ICP</span>
                    </div>
                    <p className="text-sm text-gray-500">≈ ${walletData.usdValue.toLocaleString()}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <Button className="bg-blue-600 hover:bg-blue-700 h-auto py-4 flex flex-col items-center">
                        <ArrowUpRight className="h-5 w-5 mb-1" />
                        <span>Send</span>
                      </Button>
                      <Button variant="outline" className="h-auto py-4 flex flex-col items-center">
                        <ArrowDownLeft className="h-5 w-5 mb-1" />
                        <span>Receive</span>
                      </Button>
                      <Button variant="outline" className="h-auto py-4 flex flex-col items-center">
                        <QrCode className="h-5 w-5 mb-1" />
                        <span>Show QR</span>
                      </Button>
                      <Button variant="outline" className="h-auto py-4 flex flex-col items-center">
                        <LineChart className="h-5 w-5 mb-1" />
                        <span>Swap</span>
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                      {transactions.slice(0, 3).map((tx) => (
                        <div key={tx.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div
                              className={`rounded-full p-2 ${
                                tx.type === "receive"
                                  ? "bg-green-100 text-green-600"
                                  : tx.type === "send"
                                    ? "bg-blue-100 text-blue-600"
                                    : "bg-purple-100 text-purple-600"
                              }`}
                            >
                              {tx.type === "receive" ? (
                                <ArrowDownLeft className="h-4 w-4" />
                              ) : tx.type === "send" ? (
                                <ArrowUpRight className="h-4 w-4" />
                              ) : (
                                <Clock className="h-4 w-4" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium capitalize">{tx.type}</p>
                              <p className="text-xs text-gray-500">{new Date(tx.date).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`font-medium ${tx.type === "receive" ? "text-green-600" : "text-gray-700"}`}>
                              {tx.type === "receive" ? "+" : "-"}
                              {tx.amount} ICP
                            </p>
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                tx.status === "completed"
                                  ? "bg-green-50 text-green-700 border-green-200"
                                  : "bg-yellow-50 text-yellow-700 border-yellow-200"
                              }`}
                            >
                              {tx.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                      <Button
                        variant="ghost"
                        className="w-full text-blue-600 hover:text-blue-700"
                        onClick={() => setActiveTab("transactions")}
                      >
                        View All Transactions
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Price Chart */}
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">ICP Price History</h3>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      15 Days
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>7 Days</DropdownMenuItem>
                    <DropdownMenuItem>15 Days</DropdownMenuItem>
                    <DropdownMenuItem>30 Days</DropdownMenuItem>
                    <DropdownMenuItem>90 Days</DropdownMenuItem>
                    <DropdownMenuItem>1 Year</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={priceData}>
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                      domain={["dataMin - 1", "dataMax + 1"]}
                    />
                    <RechartsTooltip
                      formatter={(value: number) => [`$${value}`, "Price"]}
                      labelFormatter={(label) => `Date: ${label}`}
                    />
                    <Area
                      type="monotone"
                      dataKey="price"
                      stroke="#2563eb"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorPrice)"
                      activeDot={{ r: 6 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <h2 className="text-lg font-semibold">Transaction History</h2>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search transactions..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        <Filter className="mr-2 h-4 w-4" />
                        {transactionFilter === "all"
                          ? "All Types"
                          : transactionFilter.charAt(0).toUpperCase() + transactionFilter.slice(1)}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setTransactionFilter("all")}>All Types</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTransactionFilter("send")}>Send</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTransactionFilter("receive")}>Receive</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTransactionFilter("stake")}>Stake</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTransactionFilter("pending")}>Pending</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="space-y-4">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((tx) => (
                    <motion.div
                      key={tx.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col md:flex-row md:items-center md:justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-3 mb-3 md:mb-0">
                        <div
                          className={`rounded-full p-2 ${
                            tx.type === "receive"
                              ? "bg-green-100 text-green-600"
                              : tx.type === "send"
                                ? "bg-blue-100 text-blue-600"
                                : "bg-purple-100 text-purple-600"
                          }`}
                        >
                          {tx.type === "receive" ? (
                            <ArrowDownLeft className="h-5 w-5" />
                          ) : tx.type === "send" ? (
                            <ArrowUpRight className="h-5 w-5" />
                          ) : (
                            <Clock className="h-5 w-5" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center">
                            <p className="font-medium capitalize">{tx.type}</p>
                            <Badge
                              variant="outline"
                              className={`ml-2 ${
                                tx.status === "completed"
                                  ? "bg-green-50 text-green-700 border-green-200"
                                  : "bg-yellow-50 text-yellow-700 border-yellow-200"
                              }`}
                            >
                              {tx.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500">{new Date(tx.date).toLocaleString()}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-8 mb-3 md:mb-0">
                        <div>
                          <p className="text-xs text-gray-500">From</p>
                          <p className="text-sm font-mono truncate max-w-[150px]">{tx.from}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">To</p>
                          <p className="text-sm font-mono truncate max-w-[150px]">{tx.to}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Fee</p>
                          <p className="text-sm">{tx.fee} ICP</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between md:justify-end md:space-x-4">
                        <div className="text-right">
                          <p className={`font-medium ${tx.type === "receive" ? "text-green-600" : "text-gray-700"}`}>
                            {tx.type === "receive" ? "+" : "-"}
                            {tx.amount} ICP
                          </p>
                          <p className="text-xs text-gray-500">≈ ${(tx.amount * 20).toFixed(2)}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No transactions found</p>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="staking" className="space-y-6">
            <Card className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-lg font-semibold">Neurons (Staking)</h2>
                  <p className="text-sm text-gray-500">Manage your staked ICP and earn rewards</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">Create New Neuron</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Total Staked</h3>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-blue-600">75.0</span>
                    <span className="ml-1 text-gray-700">ICP</span>
                  </div>
                  <p className="text-sm text-gray-500">≈ $1,500.00</p>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Total Rewards</h3>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-green-600">3.3</span>
                    <span className="ml-1 text-gray-700">ICP</span>
                  </div>
                  <p className="text-sm text-gray-500">≈ $66.00</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-md font-semibold">Your Neurons</h3>

                {neurons.map((neuron) => (
                  <motion.div
                    key={neuron.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border rounded-lg p-4 hover:border-blue-200 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <div className="flex items-center">
                          <h4 className="font-medium">{neuron.id}</h4>
                          <Badge className="ml-2 bg-blue-100 text-blue-700 border-blue-200">{neuron.status}</Badge>
                        </div>
                        <p className="text-sm text-gray-500">
                          Created on {new Date(neuron.startDate).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-gray-500">Amount</p>
                          <p className="font-medium">{neuron.amount} ICP</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Lockup Period</p>
                          <p className="font-medium">{neuron.lockupPeriod}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Rewards</p>
                          <p className="font-medium text-green-600">+{neuron.rewards} ICP</p>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Manage
                        </Button>
                        <Button variant="outline" size="sm" className="text-blue-600">
                          Spawn
                        </Button>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t">
                      <div className="flex justify-between items-center">
                        <p className="text-sm">Maturity Date: {new Date(neuron.maturityDate).toLocaleDateString()}</p>
                        <p className="text-sm text-blue-600">Dissolve Delay: {neuron.lockupPeriod}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}

                <div className="text-center py-6">
                  <p className="text-gray-500 mb-4">Learn more about staking ICP and earning rewards</p>
                  <Button variant="outline">Staking Guide</Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-lg font-semibold">Security Settings</h2>
                  <p className="text-sm text-gray-500">Manage your wallet security</p>
                </div>
                <Badge
                  className={`${
                    walletData.securityLevel === "high"
                      ? "bg-green-100 text-green-700 border-green-200"
                      : "bg-yellow-100 text-yellow-700 border-yellow-200"
                  }`}
                >
                  {walletData.securityLevel === "high" ? "High Security" : "Medium Security"}
                </Badge>
              </div>

              <div className="space-y-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="rounded-full bg-blue-100 p-2">
                      <Shield className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Security Checklist</h3>
                      <p className="text-sm text-gray-600 mb-4">Complete these steps to secure your wallet</p>

                      <div className="space-y-3">
                        <div className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          <span>Backup recovery phrase</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          <span>Set up password protection</span>
                        </div>
                        <div className="flex items-center">
                          <XCircle className="h-5 w-5 text-red-500 mr-2" />
                          <span>Enable two-factor authentication</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          <span>Verify recovery email</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Backup & Recovery</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Last backup: {new Date(walletData.lastBackup).toLocaleDateString()}
                    </p>
                    <div className="flex space-x-2">
                      <Button variant="outline">Backup Now</Button>
                      <Button variant="outline">Recovery Options</Button>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Authentication</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Enhance your wallet security with additional authentication methods
                    </p>
                    <div className="flex space-x-2">
                      <Button variant="outline">Change Password</Button>
                      <Button className="bg-blue-600 hover:bg-blue-700">Enable 2FA</Button>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <div className="flex items-start space-x-3">
                    <div className="rounded-full bg-yellow-100 p-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Security Tips</h3>
                      <ul className="text-sm text-gray-600 mt-2 space-y-2 list-disc pl-5">
                        <li>Never share your recovery phrase or private keys with anyone</li>
                        <li>Be cautious of phishing attempts and always verify website URLs</li>
                        <li>Consider using a hardware wallet for large amounts</li>
                        <li>Keep your device's software and antivirus up to date</li>
                        <li>Use a unique, strong password for your wallet</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  )
}

