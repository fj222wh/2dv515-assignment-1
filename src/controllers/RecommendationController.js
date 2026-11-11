import { parseCSV } from "../helpers/parseCSV.js"

export class RecommendationController {

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    index(req, res, next) {
        const data = parseCSV('./data/movies.csv')

        res.status(200).json({data})
    }
}