import { getUsers } from '../helpers/parseCSV.js'

export class UserController {
  /**
   * Returns the users
   * @param {Object} req The request object
   * @param {Object} res The response object
   */
  index(req, res) {
    const users = getUsers()
    res.status(200).json({ users })
  }
}
