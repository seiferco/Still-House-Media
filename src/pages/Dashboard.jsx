import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Calendar, Users, CalendarX, LogOut, Plus, X, Mail, Phone,
  LayoutDashboard, TrendingUp, DollarSign, BedDouble, ChevronRight
} from 'lucide-react'
import StatCard from '../components/dashboard/StatCard'
import RevenueChart from '../components/dashboard/RevenueChart'

const fade = { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0, transition: { duration: 0.45 } } }

const API_URL = '/api'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [bookings, setBookings] = useState([])
  const [customers, setCustomers] = useState([])
  const [blockedDates, setBlockedDates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showBlockModal, setShowBlockModal] = useState(false)
  const [newBlock, setNewBlock] = useState({ listingId: 'cedar-ridge', start: '', end: '', note: '' })
  const [propertyName, setPropertyName] = useState('')
  const navigate = useNavigate()

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token')
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    // Fetch all data initially for the overview
    if (activeTab === 'overview') {
      fetchBookings()
      fetchCustomers()
      fetchBlockedDates()
    } else if (activeTab === 'bookings') fetchBookings()
    else if (activeTab === 'customers') fetchCustomers()
    else if (activeTab === 'blocked') fetchBlockedDates()
  }, [activeTab])

  const checkAuth = async () => {
    try {
      const res = await fetch(`${API_URL}/me`, {
        credentials: 'include',
        headers: getAuthHeaders()
      })
      if (!res.ok) throw new Error('Not authenticated')
      const data = await res.json()
      if (data.host?.primaryPropertyName) {
        setPropertyName(data.host.primaryPropertyName)
      }
      fetchBookings()
    } catch (err) {
      localStorage.removeItem('token')
      localStorage.removeItem('host')
      navigate('/login')
    }
  }

  const fetchBookings = async () => {
    try {
      const res = await fetch(`${API_URL}/dashboard/bookings`, {
        credentials: 'include',
        headers: getAuthHeaders()
      })
      if (!res.ok) throw new Error('Failed to fetch bookings')
      const data = await res.json()
      setBookings(data.bookings || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchCustomers = async () => {
    try {
      const res = await fetch(`${API_URL}/dashboard/customers`, {
        credentials: 'include',
        headers: getAuthHeaders()
      })
      if (!res.ok) throw new Error('Failed to fetch customers')
      const data = await res.json()
      setCustomers(data.customers || [])
    } catch (err) {
      setError(err.message)
    }
  }

  const fetchBlockedDates = async () => {
    try {
      const res = await fetch(`${API_URL}/dashboard/blocked-dates`, {
        credentials: 'include',
        headers: getAuthHeaders()
      })
      if (!res.ok) throw new Error('Failed to fetch blocked dates')
      const data = await res.json()
      setBlockedDates(data.blockedDates || [])
    } catch (err) {
      setError(err.message)
    }
  }

  const handleLogout = async () => {
    await fetch(`${API_URL}/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: getAuthHeaders()
    })
    localStorage.removeItem('token')
    localStorage.removeItem('host')
    navigate('/login')
  }

  const handleAddBlock = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`${API_URL}/dashboard/blocked-dates`, {
        method: 'POST',
        credentials: 'include',
        headers: getAuthHeaders(),
        body: JSON.stringify(newBlock)
      })
      if (!res.ok) throw new Error('Failed to add blocked date')
      setShowBlockModal(false)
      setNewBlock({ listingId: 'cedar-ridge', start: '', end: '', note: '' })
      fetchBlockedDates()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleRemoveBlock = async (blockId) => {
    try {
      const res = await fetch(`${API_URL}/dashboard/blocked-dates/${blockId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: getAuthHeaders()
      })
      if (!res.ok) throw new Error('Failed to remove blocked date')
      fetchBlockedDates()
    } catch (err) {
      setError(err.message)
    }
  }

  const formatDate = (dateStr) => {
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatDateRange = (start, end) => {
    return `${formatDate(start)} → ${formatDate(end)}`
  }

  // --- Metrics Calculation ---
  const totalRevenue = bookings
    .filter(b => b.status === 'confirmed' || b.status === 'paid')
    .reduce((sum, b) => sum + (b.total || 0), 0) / 100;

  const activeBookingsCount = bookings.filter(b => {
    const end = new Date(b.end);
    const now = new Date();
    return end >= now && b.status === 'confirmed';
  }).length;

  // Mock data for chart (replace with real aggregation later)
  const revenueData = [
    { label: 'Jun', value: 12500 },
    { label: 'Jul', value: 18200 },
    { label: 'Aug', value: 24500 },
    { label: 'Sep', value: 15800 },
    { label: 'Oct', value: 9400 },
    { label: 'Nov', value: totalRevenue > 0 ? totalRevenue : 12000 } // Use real total if available
  ];

  if (loading && bookings.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-slate-500 font-medium">Loading Dashboard...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-700 rounded-lg flex items-center justify-center text-white font-bold">
                H
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900 leading-none">Host Dashboard</h1>
                {propertyName && <p className="text-xs text-slate-500 mt-0.5">{propertyName}</p>}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <motion.div {...fade} className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-700 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            {error}
          </motion.div>
        )}

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto pb-4 mb-4 gap-2 no-scrollbar">
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'bookings', label: 'Bookings', icon: Calendar },
            { id: 'customers', label: 'Customers', icon: Users },
            { id: 'blocked', label: 'Calendar', icon: CalendarX }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${activeTab === tab.id
                  ? 'bg-zinc-900 text-white shadow-lg shadow-zinc-900/20'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  title="Total Revenue"
                  value={`$${totalRevenue.toLocaleString()}`}
                  icon={DollarSign}
                  trend={12.5}
                  trendLabel="vs last month"
                  color="green"
                />
                <StatCard
                  title="Active Bookings"
                  value={activeBookingsCount}
                  icon={Calendar}
                  trend={-2}
                  trendLabel="vs last month"
                  color="blue"
                />
                <StatCard
                  title="Occupancy Rate"
                  value="78%"
                  icon={BedDouble}
                  trend={5.4}
                  trendLabel="vs last month"
                  color="purple"
                />
                <StatCard
                  title="Avg. Nightly Rate"
                  value="$245"
                  icon={TrendingUp}
                  trend={0}
                  trendLabel="stable"
                  color="orange"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Chart */}
                <div className="lg:col-span-2">
                  <RevenueChart data={revenueData} />
                </div>

                {/* Recent Activity / Quick Actions */}
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl p-6 border border-zinc-100 shadow-sm">
                    <h3 className="font-semibold text-zinc-900 mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <button
                        onClick={() => { setActiveTab('blocked'); setShowBlockModal(true); }}
                        className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center">
                            <CalendarX size={16} />
                          </div>
                          <span className="font-medium text-slate-700">Block Dates</span>
                        </div>
                        <ChevronRight size={16} className="text-slate-400 group-hover:text-slate-600" />
                      </button>

                      <button
                        onClick={() => setActiveTab('bookings')}
                        className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center">
                            <Calendar size={16} />
                          </div>
                          <span className="font-medium text-slate-700">View Bookings</span>
                        </div>
                        <ChevronRight size={16} className="text-slate-400 group-hover:text-slate-600" />
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 border border-zinc-100 shadow-sm">
                    <h3 className="font-semibold text-zinc-900 mb-4">Recent Bookings</h3>
                    {bookings.length === 0 ? (
                      <p className="text-sm text-slate-500">No recent bookings</p>
                    ) : (
                      <div className="space-y-4">
                        {bookings.slice(0, 3).map(booking => (
                          <div key={booking.id} className="flex items-center gap-3 pb-3 border-b border-slate-50 last:border-0 last:pb-0">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-medium text-sm">
                              {booking.guestEmail ? booking.guestEmail[0].toUpperCase() : 'G'}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium text-slate-900 truncate">
                                {booking.guestEmail || 'Guest'}
                              </div>
                              <div className="text-xs text-slate-500">
                                {formatDate(booking.start)}
                              </div>
                            </div>
                            <div className="text-xs font-semibold text-teal-600 bg-teal-50 px-2 py-1 rounded-md">
                              {booking.status}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* BOOKINGS TAB */}
          {activeTab === 'bookings' && (
            <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-slate-900">All Bookings</h2>
                <span className="text-sm text-slate-500">{bookings.length} total</span>
              </div>

              {bookings.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                    <Calendar size={32} />
                  </div>
                  <h3 className="text-slate-900 font-medium mb-1">No bookings yet</h3>
                  <p className="text-slate-500 text-sm">When you get your first booking, it will show up here.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 font-medium">
                      <tr>
                        <th className="px-6 py-4">Property</th>
                        <th className="px-6 py-4">Dates</th>
                        <th className="px-6 py-4">Guest</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {bookings.map((booking) => (
                        <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-4 font-medium text-slate-900">{booking.listingTitle}</td>
                          <td className="px-6 py-4 text-slate-600">{formatDateRange(booking.start, booking.end)}</td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span className="text-slate-900">{booking.guestEmail || 'Unknown'}</span>
                              {booking.customerPhone && <span className="text-xs text-slate-400">{booking.customerPhone}</span>}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${booking.status === 'confirmed' || booking.status === 'paid'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                              }`}>
                              {booking.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right font-medium text-slate-900">
                            ${((booking.total || 0) / 100).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* CUSTOMERS TAB */}
          {activeTab === 'customers' && (
            <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <h2 className="text-lg font-semibold text-slate-900">Customer Database</h2>
              </div>
              {customers.length === 0 ? (
                <div className="p-12 text-center text-slate-500">No customers yet</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                  {customers.map((customer, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-slate-100 hover:border-teal-100 hover:shadow-md transition-all bg-white group">
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors">
                          {customer.email[0].toUpperCase()}
                        </div>
                        <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-1 rounded-md">
                          {customer.bookings.length} stays
                        </span>
                      </div>
                      <div className="font-medium text-slate-900 truncate mb-1">{customer.email}</div>
                      {customer.phone && <div className="text-sm text-slate-500 mb-3">{customer.phone}</div>}

                      <div className="text-xs text-slate-400 border-t border-slate-50 pt-3 mt-2">
                        Last stay: {formatDate(customer.bookings[0].start)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* BLOCKED DATES TAB */}
          {activeTab === 'blocked' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-slate-900">Calendar Management</h2>
                <button
                  onClick={() => setShowBlockModal(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 text-white hover:bg-zinc-800 transition shadow-lg shadow-zinc-900/20"
                >
                  <Plus size={18} />
                  Block Dates
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
                {blockedDates.length === 0 ? (
                  <div className="p-12 text-center text-slate-500">No blocked dates found</div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {blockedDates.map((block) => (
                      <div key={block.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className={`w-2 h-12 rounded-full ${block.isManual ? 'bg-blue-500' : 'bg-slate-300'}`}></div>
                          <div>
                            <div className="font-medium text-slate-900">{formatDateRange(block.start, block.end)}</div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-slate-500">{block.listingTitle}</span>
                              {block.note && (
                                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                                  {block.note}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {block.isManual ? (
                          <button
                            onClick={() => handleRemoveBlock(block.id)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Remove block"
                          >
                            <X size={18} />
                          </button>
                        ) : (
                          <span className="text-xs text-slate-400 italic px-3">Synced</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Add Block Modal */}
      {showBlockModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">Block Dates</h3>
              <button
                onClick={() => setShowBlockModal(false)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddBlock} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Listing</label>
                <select
                  value={newBlock.listingId}
                  onChange={(e) => setNewBlock({ ...newBlock, listingId: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="cedar-ridge">Cedar Ridge Retreat</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Start Date</label>
                  <input
                    type="date"
                    value={newBlock.start}
                    onChange={(e) => setNewBlock({ ...newBlock, start: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">End Date</label>
                  <input
                    type="date"
                    value={newBlock.end}
                    onChange={(e) => setNewBlock({ ...newBlock, end: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Note (optional)</label>
                <input
                  type="text"
                  value={newBlock.note}
                  onChange={(e) => setNewBlock({ ...newBlock, note: e.target.value })}
                  placeholder="e.g., Maintenance"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowBlockModal(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-zinc-900 text-white font-medium hover:bg-zinc-800 transition shadow-lg shadow-zinc-900/20"
                >
                  Block Dates
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}

