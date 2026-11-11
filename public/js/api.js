export async function getUsers() {
    const res = await fetch('/api/users', {
        method: 'GET',
        'Content-Type': 'application/json'
    })

    const data = await res.json()
    return data.users

}

export async function getRecommendations(settings) {

}

