/**
 * Algorithms for recommendations
 *
 * @version 1.0.0
 * @author Filippa Johansson
 */

import { parseCSV } from "../helpers/parseCSV.js"

export class UserController {

    /**
     * Returns the users
     * @param {Object} req The request object
     * @param {Object} res The response object
     */
    index(req, res) {
        const users = parseCSV('./data/users.csv')
        res.status(200).json({users})
    }
}