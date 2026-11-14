/**
 * Helper to parse the CSV-file
 *
 * @version 1.0.0
 * @author Filippa Johansson
 */

import { readFileSync } from 'node:fs'
const PATH = process.env.CSV_PATH

export function parseCSV(path) {
  const text = readFileSync(path, 'utf8')

  const splitted = text.split('\n').filter((row) => row.trim() !== '')

  const headers = splitted[0].split(';')

  const data = []
  // Loopa hela arrayen, förutom
  for (let i = 1; i < splitted.length; i++) {
    const row = splitted[i].split(';')
    const object = {}
    for (let header_i = 0; header_i < headers.length; header_i++) {
      object[headers[header_i]] = row[header_i].replace(/^"|"$/g, '')
    }
    data.push(object)
  }

  return data
}

export function getUsers() {
  return parseCSV(`${PATH}/users.csv`)
}

export function getRatings() {
  return parseCSV(`${PATH}/ratings.csv`)
}

export function getMovies() {
  return parseCSV(`${PATH}/movies.csv`)
}

export function findUser(id) {
  const users = getUsers()
  const selectedUser = users.find((user) => user.UserId === id)
  return selectedUser
}
