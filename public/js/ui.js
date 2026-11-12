/**
 * Updates the result div
 * @param {HTMLElement} element 
 * @param {Object} data 
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
 * 
 * @param {HTMLElement} element 
 */
export function clearContent(element) {
    element.replaceChildren()
}
/**
 * Renders the users in the select-list
 * @param {HTMLElement} list 
 * @param {Array} data 
 */
export function renderUsers(list, data) {
    data.forEach(user => {
        const opt = document.createElement('option')
        opt.setAttribute('value', user.UserId)
        opt.textContent = `${user.UserId} : ${user.Name}`
        list.append(opt)
    });
}