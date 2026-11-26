const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://mmjusghgeedycrrfdejg.supabase.co'
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_unNgZxi4yyID9qAAy3d2dg_dGJLpv3N'
const ELLAR_TOTALS_URL = 'https://vehnicate-mapsellar-production.up.railway.app/public/ellar-totals'
const PAGE_SIZE = 1000

const headers = {
  apikey: SUPABASE_PUBLISHABLE_KEY,
  Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
}

async function fetchSessionRows(signal) {
  const rows = []

  for (let offset = 0; ; offset += PAGE_SIZE) {
    const url = new URL('/rest/v1/sessions', SUPABASE_URL)
    url.searchParams.set('select', 'session_id,user_id,distance')
    url.searchParams.set('distance', 'gt.0')
    url.searchParams.set('order', 'session_id.asc')

    const response = await fetch(url, {
      headers: { ...headers, Range: `${offset}-${offset + PAGE_SIZE - 1}` },
      signal,
    })
    if (!response.ok) throw new Error(`Sessions query failed: ${response.status}`)

    const page = await response.json()
    rows.push(...page)
    if (page.length < PAGE_SIZE) return rows
  }
}

async function fetchDefectCount(signal) {
  const url = new URL('/rest/v1/hexagons', SUPABASE_URL)
  url.searchParams.set('select', 'h3_index')
  const response = await fetch(url, {
    method: 'HEAD',
    headers: { ...headers, Prefer: 'count=exact', Range: '0-0' },
    signal,
  })
  if (!response.ok) throw new Error(`Defect count query failed: ${response.status}`)

  const total = response.headers.get('content-range')?.match(/\/(\d+)$/)?.[1]
  if (total === undefined) throw new Error('Defect count was not returned')
  return Number(total)
}

async function fetchEllarTotal(signal) {
  const response = await fetch(ELLAR_TOTALS_URL, { signal })
  if (!response.ok) throw new Error(`Ellar totals query failed: ${response.status}`)
  const totals = await response.json()
  const frozen = Number(totals.frozen_ellar)
  const liquid = Number(totals.liquid_ellar)
  if (!Number.isFinite(frozen) || !Number.isFinite(liquid)) throw new Error('Ellar totals are invalid')
  return frozen + liquid
}

export async function fetchPublicStats(signal) {
  const stats = {
    kilometresDriven: null,
    defectsMapped: null,
    drivers: null,
    ellarsInNetwork: null,
  }

  const [sessionsResult, defectsResult, ellarsResult] = await Promise.allSettled([
    fetchSessionRows(signal),
    fetchDefectCount(signal),
    fetchEllarTotal(signal),
  ])

  if (sessionsResult.status === 'fulfilled') {
    let distance = 0
    const drivers = new Set()
    sessionsResult.value.forEach((session) => {
      const km = Number(session.distance)
      if (Number.isFinite(km) && km > 0) distance += km
      if (session.user_id) drivers.add(session.user_id)
    })
    stats.kilometresDriven = distance
    stats.drivers = drivers.size
  }

  if (defectsResult.status === 'fulfilled') stats.defectsMapped = defectsResult.value
  if (ellarsResult.status === 'fulfilled') stats.ellarsInNetwork = ellarsResult.value

  return stats
}
