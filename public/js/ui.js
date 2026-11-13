/**
 * Renders the matching users
 * @param {HTMLElement} element The container element
 * @param {Object} data The user data
 */
export function renderTable(element, data, h2Text, tableHeaders) {
  clearContent(element)

  element.classList.add('box-background-style')

  const h2 = document.createElement('h2')
  h2.textContent = h2Text
  element.append(h2)

  const table = document.createElement('table')
  element.append(table)
  const thead = document.createElement('thead')
  table.append(thead)
  const tr = document.createElement('tr')
  thead.append(tr)
  const th1 = document.createElement('th')
  th1.textContent = tableHeaders[0]
  const th2 = document.createElement('th')
  th2.textContent = tableHeaders[1]
  const th3 = document.createElement('th')
  th3.textContent = tableHeaders[2]
  tr.append(th1, th2, th3)

  // Loopa för varje row i objektet
  data.data.forEach((obj) => {
    const tr = document.createElement('tr')

    Object.values(obj).forEach((value) => {
      const td = document.createElement('td')
      td.textContent = value
      tr.append(td)
    })

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
