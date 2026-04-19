/**
 * API base: empty string uses same origin (Vite dev server proxies /api → backend).
 * Override with VITE_API_URL in production if the API is on another host.
 */
const BASE = import.meta.env.VITE_API_URL ?? ''

async function parseJsonSafe(res) {
  try {
    return await res.json()
  } catch {
    return {}
  }
}

export async function fetchTicketAvailability() {
  const res = await fetch(`${BASE}/api/tickets`)
  const data = await parseJsonSafe(res)
  if (!res.ok) {
    throw new Error(data.message || `Could not load tickets (${res.status})`)
  }
  if (!data.success) {
    throw new Error(data.message || 'Failed to load tickets')
  }
  return data
}

/**
 * @param {{ name: string, email: string, department: string, tickets: number }} payload
 */
export async function submitBooking(payload) {
  const res = await fetch(`${BASE}/api/book`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await parseJsonSafe(res)
  return { ok: res.ok, status: res.status, data }
}
