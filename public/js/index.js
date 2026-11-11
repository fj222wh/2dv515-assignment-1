import { renderUsers } from "./ui.js"
import { getRecommendations } from "./api.js"
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
        const data = await getRecommendations()
        renderResult(resultDiv, data)
    } else if (triggeredBtnId === 'btn-recommend-movies') {
        alert('Get recommended movies')
        const data = await getRecommendations()
        renderResult(resultDiv, data)
    } else if (triggeredBtnId === 'btn-item-based-recommendations') {
        alert('Get item based recommendations')
        const data = await getRecommendations()
        renderResult(resultDiv, data)
    }
})

// Users ska renderas i början när applikationen startar
renderUsers(userList)
