import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, Users, CalendarX, LogOut, Plus, X, Mail, Phone } from 'lucide-react'

const fade = { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0, transition: { duration: 0.45 } } }

const API_URL = '/api'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('bookings')
  const [bookings, setBookings] = useState([])
  const [customers, setCustomers] = useState([])
  const [blockedDates, setBlockedDates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showBlockModal, setShowBlockModal] = useState(false)
  const [newBlock, setNewBlock] = useState({ listingId: 'cedar-ridge', start: '', end: '', note: '' })
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
    if (activeTab === 'bookings') fetchBookings()
    if (activeTab === 'customers') fetchCustomers()
    if (activeTab === 'blocked') fetchBlockedDates()
  }, [activeTab])

  const checkAuth = async () => {
    try {
      const res = await fetch(`${API_URL}/me`, {
        credentials: 'include',
        headers: getAuthHeaders()
      })
      if (!res.ok) throw new Error('Not authenticated')
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

  if (loading && bookings.length === 0) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-zinc-600 dark:text-zinc-400">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-8">
      <motion.div {...fade} className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Host Dashboard</h1>
            <p className="text-zinc-600 dark:text-zinc-400">Manage your bookings, customers, and calendar</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400">
            {error}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-zinc-200 dark:border-zinc-800">
          {[
            { id: 'bookings', label: 'Bookings', icon: Calendar },
            { id: 'customers', label: 'Customers', icon: Users },
            { id: 'blocked', label: 'Blocked Dates', icon: CalendarX }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 font-medium transition ${
                activeTab === tab.id
                  ? 'border-b-2 border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-zinc-100'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
          {activeTab === 'bookings' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">All Bookings</h2>
              {bookings.length === 0 ? (
                <p className="text-zinc-600 dark:text-zinc-400">No bookings yet</p>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium text-zinc-900 dark:text-zinc-100 mb-1">
                            {booking.listingTitle}
                          </div>
                          <div className="text-sm text-zinc-600 dark:text-zinc-400">
                            {formatDateRange(booking.start, booking.end)}
                          </div>
                          {booking.customerEmail && (
                            <div className="text-xs text-zinc-500 dark:text-zinc-500 mt-2 flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                <Mail size={12} />
                                {booking.customerEmail}
                              </span>
                              {booking.customerPhone && (
                                <span className="flex items-center gap-1">
                                  <Phone size={12} />
                                  {booking.customerPhone}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-zinc-500 dark:text-zinc-500">
                            {new Date(booking.createdAt).toLocaleDateString()}
                          </div>
                          <div className="mt-1 px-2 py-1 rounded text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                            {booking.status}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'customers' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Customers</h2>
              {customers.length === 0 ? (
                <p className="text-zinc-600 dark:text-zinc-400">No customers yet</p>
              ) : (
                <div className="space-y-4">
                  {customers.map((customer, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="font-medium text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                            <Mail size={16} />
                            {customer.email}
                          </div>
                          {customer.phone && (
                            <div className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 flex items-center gap-2">
                              <Phone size={14} />
                              {customer.phone}
                            </div>
                          )}
                        </div>
                        <div className="text-sm text-zinc-600 dark:text-zinc-400">
                          {customer.bookings.length} booking{customer.bookings.length !== 1 ? 's' : ''}
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-zinc-200 dark:border-zinc-800">
                        <div className="text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-2">Bookings:</div>
                        <div className="space-y-2">
                          {customer.bookings.map((booking) => (
                            <div key={booking.id} className="text-xs text-zinc-600 dark:text-zinc-400">
                              <span className="font-medium">{booking.listingTitle}</span> — {formatDateRange(booking.start, booking.end)}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'blocked' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Blocked Dates</h2>
                <button
                  onClick={() => setShowBlockModal(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition"
                >
                  <Plus size={16} />
                  Add Block
                </button>
              </div>
              {blockedDates.length === 0 ? (
                <p className="text-zinc-600 dark:text-zinc-400">No blocked dates</p>
              ) : (
                <div className="space-y-3">
                  {blockedDates.map((block) => (
                    <div
                      key={block.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50"
                    >
                      <div>
                        <div className="font-medium text-zinc-900 dark:text-zinc-100">{block.listingTitle}</div>
                        <div className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                          {formatDateRange(block.start, block.end)}
                        </div>
                        {block.note && (
                          <div className="text-xs text-zinc-500 dark:text-zinc-500 mt-1">{block.note}</div>
                        )}
                      </div>
                      <button
                        onClick={() => handleRemoveBlock(block.id)}
                        className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>

      {/* Add Block Modal */}
      {showBlockModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            {...fade}
            className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 w-full max-w-md"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Block Dates</h3>
              <button
                onClick={() => setShowBlockModal(false)}
                className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddBlock} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Listing</label>
                <select
                  value={newBlock.listingId}
                  onChange={(e) => setNewBlock({ ...newBlock, listingId: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                >
                  <option value="cedar-ridge">Cedar Ridge Retreat</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Start Date</label>
                <input
                  type="date"
                  value={newBlock.start}
                  onChange={(e) => setNewBlock({ ...newBlock, start: e.target.value })}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">End Date</label>
                <input
                  type="date"
                  value={newBlock.end}
                  onChange={(e) => setNewBlock({ ...newBlock, end: e.target.value })}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Note (optional)</label>
                <input
                  type="text"
                  value={newBlock.note}
                  onChange={(e) => setNewBlock({ ...newBlock, note: e.target.value })}
                  placeholder="e.g., Maintenance"
                  className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowBlockModal(false)}
                  className="flex-1 px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition"
                >
                  Add Block
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}

