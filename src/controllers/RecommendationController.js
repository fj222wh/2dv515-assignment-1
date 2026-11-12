import { parseCSV, getUsers } from '../helpers/parseCSV.js'
import { euclideanDistance, pearsonDistance } from '../helpers/algorithms.js'

export class RecommendationController {
  /**
   * Finds the most matching user compared to a selected user
   *
   * @param {Object} req The request object
   * @param {Object} res The response object
   */
  matchingUsers(req, res) {
    try {
      const nOfResults = req.body.results
      let similarityData = this.#calculateSimilarity(req)
      console.log(similarityData)

      // Splice beroende på hur många resultat vi vill ha
      if (nOfResults < similarityData.length) {
        similarityData = similarityData.slice(0, nOfResults)
      }

      res.status(200).json({ data: similarityData })
    } catch (error) {
      res.status(503).json({ error: 'An error has occured. ' + error.message })
    }
  }

  #checkBody(req) {
    if (!req.body.user) {
      throw new Error('A user have to be selected')
    }

    if (!req.body.similarity) {
      throw new Error('A similarity algorithm has to be selected')
    }

    if (!req.body.results) {
      throw new Error('The number of wanted results has to be filled in')
    }
  }

  /**
   * Finds the similarity score
   * @param {Function} algorithm The similarity algorithm used
   * @param {Object} selected_userId The selected user
   * @param {Array} users List of all users
   */
  #calculateSimilarity(req) {
    this.#checkBody(req)
    // Variables
    let users = getUsers() // All users
    const algorithm = req.body.similarity // Algorithm
    const selected_userId = req.body.user // The selected user
    const selectedUser = users.find((user) => user.UserId === selected_userId)

    // Remove the selected user, we don't want to compare similarity with ourselves
    users = users.filter((user) => user.UserId !== selected_userId)

    let similarityMethod
    if (algorithm === 'euclidean') {
      similarityMethod = euclideanDistance
    } else if (algorithm === 'pearson') {
      similarityMethod = pearsonDistance
    }

    const similarityScores = []
    users.forEach((user) => {
      const object = {
        name: user.Name,
        userId: user.UserId,
        similarityScore: similarityMethod(selectedUser, user),
      }

      similarityScores.push(object)
    })

    similarityScores.sort((a, b) => b.similarityScore - a.similarityScore)

    return similarityScores
  }

  /**
   * Returns movie recommendations based of a user
   *
   * @param {Object} req The request object
   * @param {Object} res The response object
   */
  recommendedMovies(req, res) {
    const nOfResults = req.body.results
    let similarityData = this.#calculateSimilarity(req)

    const movies = parseCSV('./data/movies.csv')

    // Baserat på vilken användare som är mest lik
    // MostSimilarUser[0], hämta id
    // Hämta ochs sortera filmer som den här användaren gillar
    // Hitta filmerna som användare med id x gillar, jämför med de filmer som den valda användaren INTE har betygsatt
    // Skicka tillbaka de filmer som den inte har betygsatt

    // Splice beroende på hur många resultat vi vill ha

    const recommendedMovies = []
    if (nOfResults < recommendedMovies.length) {
      recommendedMovies = recommendedMovies.slice(0, nOfResults)
    }

    res.status(200).json({ error: 'Recommended movies not implemented' })
  }

  /**
   * Returns item based recommendations based of a user
   *
   * @param {Object} req The request object
   * @param {Object} res The response object
   */
  itemBasedRecommendations(req, res) {
    console.log('PUT sent to /item-based')
    res.status(200).json({ error: 'Item based is not impelemnted yet' })
  }
}
