import { parseCSV, getUsers, findUser, getUserRatings, getRatings } from '../helpers/parseCSV.js'
import { euclideanDistance, pearsonDistance, weightedScore} from '../helpers/algorithms.js'

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

      // Splice beroende på hur många resultat vi vill ha
      if (nOfResults < similarityData.length) {
        similarityData = similarityData.slice(0, nOfResults)
      }

      res.status(200).json({ data: similarityData })
    } catch (error) {
      res.status(503).json({ error: 'An error has occured. ' + error.message })
    }
  }

  /**
   * Error handling - checking the request object
   *
   * @param {Object} req The request object
   */
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
    const users = getUsers() // All users
    let ratings = getRatings()

    let usersWithRatings = users.map((user) => {
      return {
        ...user,
        ratings: ratings
          .filter((rating) => rating.UserId === user.UserId)
          .map((rating) => ({
            MovieId: rating.MovieId,
            Rating: Number(rating.Rating),
          })),
      }
    })

    const algorithm = req.body.similarity // Algorithm
    const selected_userId = req.body.user // The selected user
    const selectedUser = usersWithRatings.find((user) => user.UserId === selected_userId)

    // Remove the selected user, we don't want to compare similarity with ourselves
    usersWithRatings = usersWithRatings.filter((user) => user.UserId !== selected_userId)

    let similarityMethod
    if (algorithm === 'euclidean') {
      similarityMethod = euclideanDistance
    } else if (algorithm === 'pearson') {
      similarityMethod = pearsonDistance
    }

    const similarityScores = []
    usersWithRatings.forEach((user) => {
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
    const similarityScores = this.#calculateSimilarity(req)
    

    // Map user ratings with the similarity, remove the selected users ratings and movies the selected user already has seen
    const userRatings = getUserRatings().filter(user => user.UserId !== req.body.user).map((user) => {
        return {
            ...user,
            similarity: similarityScores.find(s => s.userId === user.UserId)?.similarityScore ?? 0
        }
    })



    // Calcualte weighted score
    const weightedScores = weightedScore(userRatings)

    // Hitta filmerna med högst weighted scores
    // Beroende på hur många filmer som ska returneras, slice/splice

    // Mappa filmerna till rätt namn
    // Returnera objekt med information till frontend
    // const recommendedMovies = []
    // const recommendation = {
    //     movie_title: 'Title',
    //     id: 'id',

        
    // }

    const recommendedMovies = [{
        movieTitle: 'Title 1',
        movieId: 2,
        score: 0.23423
    }]

    res.status(200).json({ data: recommendedMovies })
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
