import { parseCSV, getUsers } from "../helpers/parseCSV.js"
import { euclideanDistance, pearsonDistance } from "../helpers/algorithms.js"

export class RecommendationController {


    /**
     * Finds the most matching user compared to a selected user
     *
     * @param {Object} req The request object
     * @param {Object} res The response object
     */
    matchingUsers(req, res) {
        const users = getUsers() // All users
        const similarity_method = req.body.similarity // Algorithm
        const nOfResults = req.body.results
        const selected_userId = req.body.user // The selected user
        const selectedUser = users.find(user => user.UserId === selected_userId)
        
        let similarityData = this.#calculateSimilarity(similarity_method, selectedUser, users)
        console.log(similarityData)
    
        // Splice beroende på hur många resultat vi vill ha
        if (nOfResults < similarityData.length) {
            similarityData = similarityData.slice(0, nOfResults)
        }

        res.status(200).json({data: similarityData})
    }

    /**
     * Finds the similarity score
     * @param {Function} algorithm The similarity algorithm used
     * @param {Object} selected_userId The selected user
     * @param {Array} users List of all users
     */
    #calculateSimilarity(algorithm, selected_userId, users) {
        // Remove the selected user, we don't want to compare similarity with ourselves
        users = users.filter(user => user.UserId !== selected_userId)
        
        let similarityMethod

        if(algorithm === 'euclidean') {
            similarityMethod = euclideanDistance
        } else if (algorithm === 'pearson') {
            similarityMethod = pearsonDistance
        }

        const similarityScores = []
        users.forEach((user) => {
            const object = {
                name: user.Name,
                userId: user.UserId,
                similarityScore: similarityMethod(selected_userId, user)
            }

            similarityScores.push(object)
        })

        similarityScores.sort(
            (a, b) => b.similarityScore - a.similarityScore
        )

        // console.log('sorted data')
        // console.log(similarityScores)
        return similarityScores
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