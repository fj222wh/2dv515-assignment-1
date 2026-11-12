import { parseCSV } from "../helpers/parseCSV.js"

export class RecommendationController {

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    matchingUsers(req, res, next) {
        console.log('PUT TAKEN')

        console.log(req.body)
        const data = parseCSV('./data/movies.csv')
        res.status(501).json({error: 'Matching users not implemented'})
    }

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    recommendedMovies(req, res, next) {
        console.log('PUT TAKEN')

        console.log(req.body)
        const data = parseCSV('./data/movies.csv')
        res.status(501).json({error: 'Recommended movies not implemented'})
    }

    itemBasedRecommendations(req, res, next) {
        res.status(501).json({error: 'Item based is not impelemnted yet'})
    }


}