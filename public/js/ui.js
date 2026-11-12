/**
 * Updates the result div
 *
 * @param {HTMLElement} element The HTML-element where the results are shown
 * @param {Object} data The data to be presented
 */
export function renderRecommendedMovies(element, data) {
  clearContent(element)

  element.classList.add('box-background-style')

  const p = document.createElement('p')
  p.textContent = 'The results:'
  element.append(p)
}

/**
 * Renders the matching users
 * @param {HTMLElement} element The container element
 * @param {Object} data The user data
 */
export function renderMatchingUsers(element, data) {
  clearContent(element)

  element.classList.add('box-background-style')

  const h2 = document.createElement('h2')
  h2.textContent = 'Top matching users:'
  element.append(h2)

  const table = document.createElement('table')
  element.append(table)
  const thead = document.createElement('thead')
  table.append(thead)
  const tr = document.createElement('tr')
  thead.append(tr)
  const thName = document.createElement('th')
  thName.textContent = 'Name'
  const thId = document.createElement('th')
  thId.textContent = 'ID'
  const thScore = document.createElement('th')
  thScore.textContent = 'Score'
  tr.append(thName, thId, thScore)

  // Loopa för varje user
  data.data.forEach((user) => {
    console.log(user)
    const tr = document.createElement('tr')

    const td1 = document.createElement('td')
    td1.textContent = user.name
    const td2 = document.createElement('td')
    td2.textContent = user.userId
    const td3 = document.createElement('td')
    td3.textContent = user.similarityScore

    tr.append(td1, td2, td3)
    table.append(tr)
  })
}

/**
 * Clears a container of elements
 *
 * @param {HTMLElement} element A parent elemnt
 */
export function clearContent(element) {
  element.replaceChildren()
}
/**
 * Renders the users in the select-list
 * @param {HTMLElement} selectList The selection list
 * @param {Array} users The user data
 */
export function renderUsers(selectList, users) {
  users.forEach((user) => {
    const opt = document.createElement('option')
    opt.setAttribute('value', user.UserId)
    opt.textContent = `${user.UserId} : ${user.Name}`
    selectList.append(opt)
  })
}
