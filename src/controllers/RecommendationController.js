import { parseCSV } from "../helpers/parseCSV.js"

export class RecommendationController {


    /**
     * Finds the most matching user compared to a selected user
     *
     * @param {Object} req The request object
     * @param {Object} res The response object
     */
    matchingUsers(req, res) {
        console.log('PUT sent to /users')
        console.log(req.body)
        const data = parseCSV('./data/movies.csv')
        res.status(200).json({error: 'Matching users not implemented'})
    }

    /**
     * Returns movie recommendations based of a user
     *
     * @param {Object} req The request object
     * @param {Object} res The response object
     */
    recommendedMovies(req, res) {
        console.log('PUT sent to /movies')
        console.log(req.body)
        const data = parseCSV('./data/movies.csv')
        res.status(200).json({error: 'Recommended movies not implemented'})
    }

    /**
     * Returns item based recommendations based of a user
     *
     * @param {Object} req The request object
     * @param {Object} res The response object
     */
    itemBasedRecommendations(req, res) {
        console.log('PUT sent to /item-based')
        res.status(200).json({error: 'Item based is not impelemnted yet'})
    }


}