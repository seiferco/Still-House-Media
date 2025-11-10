import { useEffect, useMemo, useState } from 'react'

const WEEKDAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')
const withApiBase = (path) => API_BASE ? `${API_BASE}${path}` : path

function startOfMonth(date){ return new Date(date.getFullYear(), date.getMonth(), 1) }
function endOfMonth(date){ return new Date(date.getFullYear(), date.getMonth()+1, 0) }
function addMonths(date, n){ return new Date(date.getFullYear(), date.getMonth()+n, 1) }
function ymd(d){ return d.toISOString().slice(0,10) }
function sameDay(a,b){ return a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate() }
function isBefore(a,b){ return +new Date(a.getFullYear(),a.getMonth(),a.getDate()) < +new Date(b.getFullYear(),b.getMonth(),b.getDate()) }
function isAfter(a,b){ return +new Date(a.getFullYear(),a.getMonth(),a.getDate()) > +new Date(b.getFullYear(),b.getMonth(),b.getDate()) }

function monthGrid(date){
  const first = startOfMonth(date)
  const last  = endOfMonth(date)
  const start = new Date(first)
  start.setDate(first.getDate() - first.getDay()) // back to Sunday
  const cells = []
  for (let i=0;i<42;i++){ // 6 weeks
    const d = new Date(start); d.setDate(start.getDate()+i)
    cells.push(d)
  }
  return { title: date.toLocaleString(undefined,{ month:'long', year:'numeric'}), cells, first, last }
}

function withinSelected(d, start, end){
  if (!start || !end) return false
  return !isBefore(d, start) && !isAfter(d, end)
}

export default function BookingWidget({ listingId }){
  const [anchorMonth, setAnchorMonth] = useState(()=>{ const d=new Date(); d.setDate(1); return d })
  const [blocked, setBlocked] = useState(()=>new Set())
  const [status,setStatus] = useState('')
  const [selStart,setSelStart] = useState(null) 
  const [selEnd,setSelEnd]     = useState(null)

  // fetch blocked dates for two months (anchor + next)
  async function loadBlocked(monthDate){
    const m1 = startOfMonth(monthDate)
    const m2 = addMonths(m1, 1)
    const from = ymd(m1)
    const to   = ymd(addMonths(m2, 1)) // exclusive end: start of month after next
    const listing = listingId || new URLSearchParams(window.location.search).get('listing') || undefined
    const url = withApiBase(`/blocked?from=${from}&to=${to}${listing ? `&listing=${listing}` : ''}`)
    const res = await fetch(url)
    const j = await res.json()
    const set = new Set(j.blocked) // YYYY-MM-DD strings
    setBlocked(set)
  }

  useEffect(()=>{ loadBlocked(anchorMonth) }, [anchorMonth, listingId])

  const months = useMemo(()=>[ monthGrid(anchorMonth), monthGrid(addMonths(anchorMonth,1)) ], [anchorMonth])

  function blockedBetween(a,b){
    if (!a || !b) return false
    // iterate inclusive of start up to exclusive end+1
    let cur = new Date(isBefore(a,b)?a:b)
    const stop = new Date(isAfter(a,b)?b:a); stop.setDate(stop.getDate()+0) // exclusive end overnight
    while (cur <= stop){
      if (blocked.has(ymd(cur))) return true
      cur.setDate(cur.getDate()+1)
    }
    return false
  }

  function onDayClick(d, isDisabled){
    if (isDisabled) return
    // selecting
    if (!selStart || (selStart && selEnd)) {
      setSelStart(d); setSelEnd(null); setStatus('')
      return
    }
    // ensure d > selStart and no blocked inside
    if (!isAfter(d, selStart)) {
      // if clicked before start, swap
      if (!blockedBetween(d, selStart)) { setSelStart(d); setSelEnd(null); setStatus('') }
      return
    }
    if (blockedBetween(selStart, d)) {
      setStatus('Selected range crosses unavailable dates')
      return
    }
    setSelEnd(d); setStatus('Range selected — click Book to continue')
  }

  async function check(){
    if (!selStart || !selEnd) { setStatus('Pick a start and end date'); return }
    const listing = listingId || new URLSearchParams(window.location.search).get('listing') || undefined
    const qs = `start=${ymd(selStart)}&end=${ymd(selEnd)}${listing ? `&listing=${listing}` : ''}`
    const r = await fetch(withApiBase(`/availability?${qs}`)); const j = await r.json()
    setStatus(j.available ? 'Available ✅' : 'Unavailable ❌')
  }

  async function book(){
    if (!selStart || !selEnd) { setStatus('Pick a start and end date'); return }
    setStatus('Placing 10-min hold…')
    const listing = listingId || new URLSearchParams(window.location.search).get('listing') || undefined
    const r1 = await fetch(withApiBase('/hold'),{ 
      method:'POST', 
      headers:{'Content-Type':'application/json'}, 
      body: JSON.stringify({ 
        start: ymd(selStart), 
        end: ymd(selEnd),
        listing: listing
      }) 
    })
    const j1 = await r1.json()
    if(!r1.ok){ setStatus('Hold failed: '+(j1.error||'unknown')); return }
    setStatus('Creating checkout…')
    const r2 = await fetch(withApiBase('/checkout'),{ 
      method:'POST', 
      headers:{'Content-Type':'application/json'}, 
      body: JSON.stringify({ 
        start: ymd(selStart), 
        end: ymd(selEnd), 
        holdId: j1.hold.id,
        listing: listing
      }) 
    })
    const j2 = await r2.json()
    if(!r2.ok || !j2.url){ setStatus('Checkout failed: '+(j2.error||'unknown')); return }
    window.location.href = j2.url
  }

  function renderMonth({ title, cells, first }){
    return (
      <div className="w-full">
        <div className="flex items-center justify-between mb-3 text-[#1E1E1E] font-semibold">
          <div>{title}</div>
        </div>
        <div className="grid grid-cols-7 text-xs mb-1 text-[#3F6F63]/70">
          {WEEKDAYS.map(w => <div key={w} className="text-center">{w}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {cells.map((d,i)=>{
            const inMonth = d.getMonth()===first.getMonth()
            const key = ymd(d)
            const isDisabled = !inMonth || blocked.has(key)
            const isSelectedStart = selStart && sameDay(d, selStart)
            const isSelectedEnd   = selEnd && sameDay(d, selEnd)
            const inRange = withinSelected(d, selStart, selEnd)

            let cls = 'h-10 rounded-md grid place-items-center text-sm select-none transition-colors '
            if (!inMonth) {
              cls += ' text-[#CBBBAA] '
            } else if (isDisabled) {
              cls += ' text-[#CBBBAA] bg-[#F4EDE4] line-through cursor-not-allowed '
            } else if (isSelectedStart || isSelectedEnd) {
              cls += ' text-white bg-[#E17654] shadow-sm shadow-[#E17654]/40 '
            } else if (inRange) {
              cls += ' bg-[#E17654]/15 text-[#E17654] '
            } else {
              cls += ' hover:bg-[#F4EDE4] cursor-pointer '
            }

            return (
              <div key={i} className={cls} onClick={()=>onDayClick(d, isDisabled)}>
                {d.getDate()}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-[#CBBBAA]/70 p-5 bg-[#FAF7F2] shadow-[0_18px_40px_-32px_rgba(30,30,30,0.4)]">
      <div className="flex items-center justify-between mb-4 text-[#3F6F63] font-semibold text-sm">
        <button
          className="px-2 py-1 rounded border border-[#CBBBAA]/70 hover:bg-[#F4EDE4] transition-colors"
          onClick={()=>setAnchorMonth(addMonths(anchorMonth, -1))}
        >←</button>
        <div className="tracking-[0.35em] uppercase text-xs text-[#3F6F63]/70">Select dates</div>
        <button
          className="px-2 py-1 rounded border border-[#CBBBAA]/70 hover:bg-[#F4EDE4] transition-colors"
          onClick={()=>setAnchorMonth(addMonths(anchorMonth, +1))}
        >→</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {months.map((m,idx)=><div key={idx}>{renderMonth(m)}</div>)}
      </div>

      <div className="flex items-center gap-3 mt-6 flex-wrap">
        <button
          onClick={check}
          className="rounded-xl bg-[#E17654] px-4 py-2.5 font-semibold text-white shadow-sm hover:bg-[#C65A3A] focus:outline-none focus:ring-2 focus:ring-[#D7A44E] focus:ring-offset-2 focus:ring-offset-[#FAF7F2] transition-colors"
        >
          Check
        </button>
        <button
          onClick={book}
          className="rounded-xl border border-[#3F6F63]/30 px-4 py-2.5 font-semibold text-[#3F6F63] bg-white/80 hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#3F6F63]/40 focus:ring-offset-2 focus:ring-offset-[#FAF7F2] transition-colors"
        >
          Book
        </button>
        <div className="text-sm text-[#3F6F63]">{status}</div>
      </div>

      <div className="text-xs text-[#1E1E1E]/60 mt-3">
        Unavailable days are greyed out. Range selection cannot cross unavailable dates.
      </div>
    </div>
  )
}

