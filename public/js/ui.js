/**
 * Updates the result div
 * @param {*} element 
 * @param {*} data 
 */
export function renderResult(element, data) {

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