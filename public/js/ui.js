/**
 * Updates the result div
 *
 * @param {HTMLElement} element The HTML-element where the results are shown
 * @param {Object} data The data to be presented
 */
export function renderResult(element, data) {
    clearContent(element)

    element.classList.add('box-background-style')

    const p = document.createElement('p')
    p.textContent = 'The results:'
    element.append(p)

    const keys = Object.keys(data)
    console.log('the keys')
    console.log(keys)
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
    users.forEach(user => {
        const opt = document.createElement('option')
        opt.setAttribute('value', user.UserId)
        opt.textContent = `${user.UserId} : ${user.Name}`
        selectList.append(opt)
    });
}