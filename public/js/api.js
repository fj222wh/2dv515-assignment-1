export async function getUsers() {
  const res = await fetch('/api/users', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  const data = await res.json()
  return data.users
}

export async function getRecommendations(params, path) {
  const res = await fetch(`/api/recommendations/${path}?${params}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })

  if (!res.ok) {
    throw new Error('Failed to fetch recommendations')
  } else if (res.ok) {
    return await res.json()
  }
}
