import { renderTable, renderUsers } from './ui.js'
import { getRecommendations, getUsers } from './api.js'

const userList = document.getElementById('user')
const form = document.getElementById('form')
const resultDiv = document.getElementById('result-div')

form.addEventListener('submit', async (event) => {
  event.preventDefault()

  try {
    const triggeredBtnId = event.submitter.id

    if (triggeredBtnId === 'btn-match-users') {
      const formData = Object.fromEntries(new FormData(form))
      const params = new URLSearchParams(formData)
      console.log(params.toString())

    //   const data = await getRecommendations(params, 'users')
    //   renderTable(resultDiv, data, 'Top matching users', ['Name', 'ID', 'Score'])
    } else if (triggeredBtnId === 'btn-recommend-movies') {
      const body = Object.fromEntries(new FormData(form))
      const data = await getRecommendations(body, 'movies')
      console.log(data)
      renderTable(resultDiv, data, 'Recommended movies', ['Movie', 'ID', 'Score'])
    } else if (triggeredBtnId === 'btn-item-based-recommendations') {
      alert('NOT IMPLEMENTED YET - GET ITEM BASED')
      //   // Item based ska BARA använda EUCLIDEIAN
      //   const body = Object.fromEntries(new FormData(form))

      //   if (body.similarity != 'euclidean') {
      //     alert('FYI: This algorithm can only use euclidean')
      //   }
      //   body.similarity = 'euclidean'
      //   const data = await getRecommendations(body, 'item-based')
    }
  } catch (error) {
    console.error('Something went wrong...' + error.message)
  }
})

// Users ska renderas i början när applikationen startar
const userData = await getUsers()
renderUsers(userList, userData)
