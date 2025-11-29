import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Home, Calendar, MapPin, Mail, Phone, Loader2 } from 'lucide-react';

export default function BookingConfirmation() {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!sessionId) {
            setError('No session ID found');
            setLoading(false);
            return;
        }

        const fetchBooking = async () => {
            try {
                const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
                const url = API_BASE
                    ? `${API_BASE}/booking-session/${sessionId}`
                    : `/api/booking-session/${sessionId}`;

                const res = await fetch(url);
                if (!res.ok) {
                    throw new Error('Failed to fetch booking details');
                }
                const data = await res.json();
                setBooking(data.booking);
            } catch (err) {
                console.error('Error fetching booking:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBooking();
    }, [sessionId]);

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatPrice = (cents) => {
        if (!cents) return '$0.00';
        return `$${(cents / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#FAF7F2] to-[#F4EDE4] flex items-center justify-center p-4">
                <div className="text-center">
                    <Loader2 size={48} className="animate-spin text-[#3F6F63] mx-auto mb-4" />
                    <p className="text-lg text-[#1E1E1E]/70">Loading your confirmation...</p>
                </div>
            </div>
        );
    }

    if (error || !booking) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#FAF7F2] to-[#F4EDE4] flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">⚠️</span>
                    </div>
                    <h1 className="text-2xl font-bold text-[#1E1E1E] mb-2">Booking Not Found</h1>
                    <p className="text-[#1E1E1E]/70 mb-6">
                        {error || 'We couldn\'t find your booking details. Please check your email for confirmation.'}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#FAF7F2] to-[#F4EDE4] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Success Hero */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4 animate-bounce">
                        <CheckCircle size={48} className="text-green-600" />
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E1E1E] mb-3">
                        Booking Confirmed! 🎉
                    </h1>
                    <p className="text-lg sm:text-xl text-[#1E1E1E]/70 max-w-2xl mx-auto">
                        Your stay at <span className="font-semibold text-[#3F6F63]">{booking.propertyName}</span> is confirmed
                    </p>
                </div>

                {/* Booking Summary Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-[#3F6F63] to-[#2d5448] p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold mb-1">Reservation Details</h2>
                                <p className="text-white/80 text-sm">
                                    Confirmation #{booking.id.toUpperCase()}
                                </p>
                            </div>
                            <div className="text-right">
                                <div className="text-3xl font-bold">{formatPrice(booking.total)}</div>
                                <div className="text-white/80 text-sm">Total Paid</div>
                            </div>
                        </div>
                    </div>

                    {/* Booking Details */}
                    <div className="p-6 space-y-6">
                        {/* Dates */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="flex items-start gap-3 p-4 bg-[#FAF7F2] rounded-xl">
                                <div className="w-10 h-10 bg-[#3F6F63]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Calendar size={20} className="text-[#3F6F63]" />
                                </div>
                                <div className="flex-1">
                                    <div className="text-sm text-[#1E1E1E]/60 font-semibold mb-1">CHECK-IN</div>
                                    <div className="text-[#1E1E1E] font-semibold">{formatDate(booking.checkIn)}</div>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-4 bg-[#FAF7F2] rounded-xl">
                                <div className="w-10 h-10 bg-[#3F6F63]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Calendar size={20} className="text-[#3F6F63]" />
                                </div>
                                <div className="flex-1">
                                    <div className="text-sm text-[#1E1E1E]/60 font-semibold mb-1">CHECKOUT</div>
                                    <div className="text-[#1E1E1E] font-semibold">{formatDate(booking.checkOut)}</div>
                                </div>
                            </div>
                        </div>

                        {/* Nights */}
                        <div className="flex items-center justify-between p-4 border-t border-[#CBBBAA]/40">
                            <span className="text-[#1E1E1E]/70">Total Nights</span>
                            <span className="font-semibold text-[#1E1E1E]">{booking.nights} {booking.nights === 1 ? 'night' : 'nights'}</span>
                        </div>

                        {/* Property */}
                        <div className="flex items-start gap-3 p-4 bg-[#FAF7F2] rounded-xl">
                            <div className="w-10 h-10 bg-[#3F6F63]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <MapPin size={20} className="text-[#3F6F63]" />
                            </div>
                            <div className="flex-1">
                                <div className="text-sm text-[#1E1E1E]/60 font-semibold mb-1">PROPERTY</div>
                                <div className="text-[#1E1E1E] font-semibold">{booking.propertyName}</div>
                            </div>
                        </div>

                        {/* Guest Info */}
                        {booking.guestEmail && (
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <Mail size={18} className="text-[#3F6F63]" />
                                    <span className="text-[#1E1E1E]/70">{booking.guestEmail}</span>
                                </div>
                                {booking.guestPhone && (
                                    <div className="flex items-center gap-3">
                                        <Phone size={18} className="text-[#3F6F63]" />
                                        <span className="text-[#1E1E1E]/70">{booking.guestPhone}</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Confirmation Notice */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
                    <h3 className="font-semibold text-[#1E1E1E] mb-2">📧 Check Your Email</h3>
                    <p className="text-[#1E1E1E]/70 text-sm">
                        We've sent a confirmation email to <strong>{booking.guestEmail}</strong> with all the details of your reservation.
                        Please check your inbox (and spam folder) for your confirmation email.
                    </p>
                </div>

                {/* Fine Print */}
                <div className="mt-8 text-center text-sm text-[#1E1E1E]/60">
                    <p>Questions about your reservation? Contact the property host directly.</p>
                </div>
            </div>
        </div>
    );
}
