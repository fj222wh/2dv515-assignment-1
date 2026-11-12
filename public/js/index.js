import { renderMatchingUsers, renderUsers } from "./ui.js"
import { getRecommendations, getUsers } from "./api.js"
import { renderRecommendedMovies } from "./ui.js"

const userList = document.getElementById('user')
const form = document.getElementById('form')
const resultDiv = document.getElementById('result-div')

form.addEventListener('submit', async (event) => {
    event.preventDefault()

    const triggeredBtnId = event.submitter.id
    
    if (triggeredBtnId === 'btn-match-users') {
        alert('Get matching users')
        const body = Object.fromEntries(new FormData(form))
        const data = await getRecommendations(body, 'users')

        console.log('Data we got after finding matching users...')
        console.log(data)
        renderMatchingUsers(resultDiv, data)
    } else if (triggeredBtnId === 'btn-recommend-movies') {
        alert('Get recommended movies')
        const body = Object.fromEntries(new FormData(form))
        const data = await getRecommendations(body, 'movies')
        renderRecommendedMovies(resultDiv, data)
    } else if (triggeredBtnId === 'btn-item-based-recommendations') {
        alert('Get item based recommendations')
        // Item based ska BARA använda EUCLIDEIAN
        const body = Object.fromEntries(new FormData(form))

        if (body.similarity != 'euclidean') {
            alert('FYI: This algorithm can only use euclidean')
        }
        body.similarity = 'euclidean'

        console.log(body)
        const data = await getRecommendations(body, 'item-based')
        renderRecommendedMovies(resultDiv, data)
    }
})

// Users ska renderas i början när applikationen startar
const userData = await getUsers()
renderUsers(userList, userData)
