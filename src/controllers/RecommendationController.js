import { parseCSV } from "../helpers/parseCSV.js"
import { euclideanDistance, pearsonDistance } from "../helpers/algorithms.js"

export class RecommendationController {


    /**
     * Finds the most matching user compared to a selected user
     *
     * @param {Object} req The request object
     * @param {Object} res The response object
     */
    matchingUsers(req, res) {
        // Välj metod, euclidean/pearson
        // Hitta de användare som är mest lik en själv
        // Skicka tillbaka det
        // Välj antal resultat

        const similarity_method = req.body.similarity
        const selected_user = req.body.user
        
        // this.#similarityDistance(similarity_method, selected_user, getUsers)

        console.log('PUT sent to /users')
        console.log(req.body)
        const data = parseCSV('./data/movies.csv')
        res.status(200).json({error: 'Matching users not implemented'})
    }

    /**
     * Handles calculating the similarity distance
     * @param {*} method 
     * @param {*} userData 
     */
    #similarityDistance(method, selected_user, users) {
        // Remove yourself from the other users
        
        let similarityMethod

        if(method === 'euclidean') {
            similarityMethod = euclideanDistance
        } else if (method === 'pearson') {
            similarityMethod = pearsonDistance
        }

        const similarity_values = []
        users.forEach((user) => {

            const object = {
                userId: user.UserId,
                similarity_value: similarityMethod(selected_user, user)
            }

            similarity_values.push(object)
        })

        // Hitta den med högst värde?


    }

    /**
     * Returns movie recommendations based of a user
     *
     * @param {Object} req The request object
     * @param {Object} res The response object
     */
    recommendedMovies(req, res) {

        const similarity_method = req.body.similarity

        console.log(similarity_method)

        // Baserat på vilken användare som är mest lik
        // MostSimilarUser[0], hämta id
        // Hämta ochs sortera filmer som den här användaren gillar
        // Hitta filmerna som användare med id x gillar, jämför med de filmer som den valda användaren INTE har betygsatt
        // Skicka tillbaka de filmer som den inte har betygsatt
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