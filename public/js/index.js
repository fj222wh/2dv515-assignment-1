import { renderUsers } from "./ui.js"
import { getRecommendations, getUsers } from "./api.js"
import { renderResult } from "./ui.js"
// The form-selections

const userList = document.getElementById('user')
const form = document.getElementById('form')
const resultDiv = document.getElementById('result-div')

// Evenlisteners
// Skriv generell funktion som skapar och uppdaterar UI utifrån resultatet från getRecomendationsFunction()
form.addEventListener('submit', async (event) => {
    event.preventDefault()

    const triggeredBtnId = event.submitter.id
    
    if (triggeredBtnId === 'btn-match-users') {
        alert('Get matching users')
        const body = Object.fromEntries(new FormData(form))
        console.log(body)
        const data = await getRecommendations(body, 'users')
        console.log('The data I got')
        console.log(data)
        renderResult(resultDiv, data)
    } else if (triggeredBtnId === 'btn-recommend-movies') {
        alert('Get recommended movies')
        const body = Object.fromEntries(new FormData(form))
        const data = await getRecommendations(body, 'movies')
        renderResult(resultDiv, data)
    } else if (triggeredBtnId === 'btn-item-based-recommendations') {
        alert('Get item based recommendations')
        const similarity = 'euclidean'
        // Item based ska BARA använda EUCLIDEIAN
        const body = Object.fromEntries(new FormData(form))
        const data = await getRecommendations(body, 'item-based')
        renderResult(resultDiv, data)
    }
})

// Users ska renderas i början när applikationen startar
const userData = await getUsers()
renderUsers(userList, userData)
