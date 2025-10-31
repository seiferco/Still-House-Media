import { useEffect, useMemo, useState } from 'react'

const WEEKDAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

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

export default function BookingWidget(){
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
    const res = await fetch(`/api/blocked?from=${from}&to=${to}`)
    const j = await res.json()
    const set = new Set(j.blocked) // YYYY-MM-DD strings
    setBlocked(set)
  }

  useEffect(()=>{ loadBlocked(anchorMonth) }, [anchorMonth])

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
    const qs = `start=${ymd(selStart)}&end=${ymd(selEnd)}`
    const r = await fetch(`/api/availability?${qs}`); const j = await r.json()
    setStatus(j.available ? 'Available ✅' : 'Unavailable ❌')
  }

  async function book(){
    if (!selStart || !selEnd) { setStatus('Pick a start and end date'); return }
    setStatus('Placing 10-min hold…')
    const r1 = await fetch('/api/hold',{ method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ start: ymd(selStart), end: ymd(selEnd) }) })
    const j1 = await r1.json()
    if(!r1.ok){ setStatus('Hold failed: '+(j1.error||'unknown')); return }
    setStatus('Creating checkout…')
    const r2 = await fetch('/api/checkout',{ method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ start: ymd(selStart), end: ymd(selEnd), holdId: j1.hold.id }) })
    const j2 = await r2.json()
    if(!r2.ok || !j2.url){ setStatus('Checkout failed: '+(j2.error||'unknown')); return }
    window.location.href = j2.url
  }

  function renderMonth({ title, cells, first }){
    return (
      <div className="w-full">
        <div className="flex items-center justify-between mb-3">
          <div className="font-medium">{title}</div>
        </div>
        <div className="grid grid-cols-7 text-xs mb-1">
          {WEEKDAYS.map(w => <div key={w} className="text-center text-zinc-500">{w}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {cells.map((d,i)=>{
            const inMonth = d.getMonth()===first.getMonth()
            const key = ymd(d)
            const isDisabled = !inMonth || blocked.has(key)
            const isSelectedStart = selStart && sameDay(d, selStart)
            const isSelectedEnd   = selEnd && sameDay(d, selEnd)
            const inRange = withinSelected(d, selStart, selEnd)

            let cls = 'h-10 rounded-md grid place-items-center text-sm select-none '
            if (!inMonth) {
              cls += ' text-zinc-400/50 '
            } else if (isDisabled) {
              cls += ' text-zinc-400 bg-zinc-100 dark:bg-zinc-800/50 line-through cursor-not-allowed '
            } else if (isSelectedStart || isSelectedEnd) {
              cls += ' text-white bg-blue-600 '
            } else if (inRange) {
              cls += ' bg-blue-600/10 text-blue-700 dark:text-blue-300 '
            } else {
              cls += ' hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer '
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
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 bg-white dark:bg-zinc-900">
      <div className="flex items-center justify-between mb-3">
        <button
          className="px-2 py-1 rounded border border-zinc-300 dark:border-zinc-700"
          onClick={()=>setAnchorMonth(addMonths(anchorMonth, -1))}
        >←</button>
        <div className="text-sm opacity-70">Select dates</div>
        <button
          className="px-2 py-1 rounded border border-zinc-300 dark:border-zinc-700"
          onClick={()=>setAnchorMonth(addMonths(anchorMonth, +1))}
        >→</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {months.map((m,idx)=><div key={idx}>{renderMonth(m)}</div>)}
      </div>

      <div className="flex items-center gap-2 mt-4">
        <button onClick={check} className="px-3 py-2 rounded bg-black text-white">Check</button>
        <button onClick={book}  className="px-3 py-2 rounded bg-blue-600 text-white">Book</button>
        <div className="text-sm opacity-80">{status}</div>
      </div>

      <div className="text-xs opacity-60 mt-2">
        Unavailable days are greyed out. Range selection cannot cross unavailable dates.
      </div>
    </div>
  )
}
