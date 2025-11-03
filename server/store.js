// server/store.js (ESM)
function uid(p=''){ return p + Math.random().toString(36).slice(2,10) + Date.now().toString(36); }

export const LISTINGS = [{
  id: 'cedar-ridge',
  title: 'Cedar Ridge Retreat',
  timezone: 'America/Los_Angeles',
  nightlyPrice: 25000, // cents
  cleaningFee: 9500    // cents
}];

export const bookings = [];      // {id, hostId, listingId, start, end, status, createdAt, customerEmail, customerPhone, stripeSessionId}
export const holds = [];         // {id, listingId, start, end, expiresAt, createdAt}
export const externalBlocks = []; // mock external (Airbnb) blocks
export const hosts = [];         // {id, email, passwordHash, listingIds, websiteId, sitePath, stripeAccountId, createdAt}

function shift(dateStr, days){
  const d = new Date(dateStr + 'T00:00:00'); d.setDate(d.getDate()+days);
  return d.toISOString().slice(0,10);
}

function addMockExternalBlocks() {
  const listingId = LISTINGS[0].id;
  const t = new Date();
  const y = t.getFullYear();
  const m = String(t.getMonth()+1).padStart(2,'0');
  const d = String(t.getDate()).padStart(2,'0');
  const base = `${y}-${m}-${d}`;
  [[5,8],[12,14]].forEach(([a,b])=>{
    externalBlocks.push({ id: uid('blk_'), listingId, start: shift(base,a), end: shift(base,b), source:'mock-ical' });
  });
}
addMockExternalBlocks();

function overlap(aStart,aEnd,bStart,bEnd){ return aStart < bEnd && aEnd > bStart; }

export function isFree(listingId,start,end){
  const now = Date.now();
  for (const b of bookings)
    if (b.listingId===listingId && b.status==='confirmed' && overlap(start,end,b.start,b.end)) return false;
  for (const h of holds)
    if (h.listingId===listingId && h.expiresAt>now && overlap(start,end,h.start,h.end)) return false;
  for (const x of externalBlocks)
    if (x.listingId===listingId && overlap(start,end,x.start,x.end)) return false;
  return true;
}

export function createHold(listingId,start,end,minutes=10){
  const h={ id: uid('hold_'), listingId, start, end, createdAt:new Date().toISOString(), expiresAt: Date.now()+minutes*60*1000 };
  holds.push(h); return h;
}

export function consumeHold(holdId){
  const i = holds.findIndex(h=>h.id===holdId);
  if (i===-1) return null;
  const [h] = holds.splice(i,1);
  return h;
}

export function confirmBooking(hostId, listingId, start, end, customerEmail, customerPhone, stripeSessionId){
  const b={ 
    id: uid('bk_'), 
    hostId, // Required: links booking to specific host
    listingId, 
    start, 
    end, 
    status:'confirmed', 
    createdAt:new Date().toISOString(),
    customerEmail: customerEmail || null,
    customerPhone: customerPhone || null,
    stripeSessionId: stripeSessionId || null
  };
  bookings.push(b); return b;
}

function toDate(d){ return new Date(d + 'T00:00:00'); }
function fmt(d){ return d.toISOString().slice(0,10); }

// Expand [start, end) into YYYY-MM-DD list (nights)
export function expandRangeToDates(start, end){
  const out = [];
  let cur = toDate(start);
  const stop = toDate(end);
  while (cur < stop) { out.push(fmt(cur)); cur.setDate(cur.getDate()+1); }
  return out;
}

// Collect blocked dates (confirmed bookings, active holds, externalBlocks)
export function getBlockedDates(listingId, from, to){
  const blockedSet = new Set();

  const now = Date.now();
  const inWindow = (s,e) => !(e <= from || s >= to); // ranges that touch [from,to)

  // confirmed bookings
  for (const b of bookings) {
    if (b.listingId!==listingId || b.status!=='confirmed') continue;
    if (!inWindow(b.start, b.end)) continue;
    for (const d of expandRangeToDates(
      b.start < from ? from : b.start,
      b.end   > to   ? to   : b.end
    )) blockedSet.add(d);
  }

  // active holds
  for (const h of holds) {
    if (h.listingId!==listingId || h.expiresAt<=now) continue;
    if (!inWindow(h.start, h.end)) continue;
    for (const d of expandRangeToDates(
      h.start < from ? from : h.start,
      h.end   > to   ? to   : h.end
    )) blockedSet.add(d);
  }

  // external blocks (mock Airbnb)
  for (const x of externalBlocks) {
    if (x.listingId!==listingId) continue;
    if (!inWindow(x.start, x.end)) continue;
    for (const d of expandRangeToDates(
      x.start < from ? from : x.start,
      x.end   > to   ? to   : x.end
    )) blockedSet.add(d);
  }

  return Array.from(blockedSet).sort();
}

// Host/user management
export function findHostByEmail(email) {
  return hosts.find(h => h.email === email);
}

export function findHostById(id) {
  return hosts.find(h => h.id === id);
}

// Find which host owns a specific listing
export function findHostByListingId(listingId) {
  return hosts.find(h => h.listingIds.includes(listingId));
}

export function createHost(email, passwordHash, listingIds = [LISTINGS[0].id], websiteId = null, sitePath = null, stripeAccountId = null) {
  const host = {
    id: uid('host_'),
    email,
    passwordHash,
    listingIds,
    websiteId: websiteId || listingIds[0] || 'default', // Default to first listing ID if not provided
    sitePath: sitePath || null,
    stripeAccountId: stripeAccountId || null,
    createdAt: new Date().toISOString()
  };
  hosts.push(host);
  return host;
}

// Blocked dates management (manual blocks)
export function addBlockedDate(hostId, listingId, start, end, note = '') {
  const block = {
    id: uid('block_'),
    hostId, // Required: links block to specific host
    listingId,
    start,
    end,
    note,
    type: 'manual',
    createdAt: new Date().toISOString()
  };
  externalBlocks.push(block);
  return block;
}

// Legacy function - kept for backward compatibility but should use removeBlockedDateByHost
export function removeBlockedDate(blockId) {
  const i = externalBlocks.findIndex(b => b.id === blockId && b.type === 'manual');
  if (i === -1) return null;
  return externalBlocks.splice(i, 1)[0];
}

// Get bookings for a listing (public - no host filter)
export function getBookingsForListing(listingId) {
  return bookings.filter(b => b.listingId === listingId).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

// Get bookings for a specific host
export function getBookingsForHost(hostId) {
  return bookings.filter(b => b.hostId === hostId).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

// Get blocked dates for a specific host (manual blocks only)
export function getBlockedDatesForHost(hostId) {
  return externalBlocks.filter(b => b.hostId === hostId && b.type === 'manual');
}

// Remove blocked date by ID (validates hostId ownership)
export function removeBlockedDateByHost(blockId, hostId) {
  const block = externalBlocks.find(b => b.id === blockId && b.type === 'manual');
  if (!block) return null;
  if (block.hostId !== hostId) return null; // Security: ensure host owns this block
  const i = externalBlocks.findIndex(b => b.id === blockId && b.type === 'manual');
  if (i === -1) return null;
  return externalBlocks.splice(i, 1)[0];
}

// Update booking to include customer info from Stripe
export function updateBookingWithCustomer(bookingId, customerEmail, customerPhone, stripeSessionId) {
  const booking = bookings.find(b => b.id === bookingId);
  if (booking) {
    booking.customerEmail = customerEmail;
    booking.customerPhone = customerPhone;
    booking.stripeSessionId = stripeSessionId;
  }
  return booking;
}

// cleanup expired holds
setInterval(()=>{ const now=Date.now(); for(let i=holds.length-1;i>=0;i--) if(holds[i].expiresAt<=now) holds.splice(i,1); }, 60*1000);
