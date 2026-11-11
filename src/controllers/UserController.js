import { parseCSV } from "../helpers/parseCSV.js"

export class UserController {

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    index(req, res, next) {
        const users = parseCSV('./data/users.csv')
        res.status(200).json({users})
    }
}