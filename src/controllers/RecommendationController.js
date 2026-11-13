import { getUsers, getRatings } from '../helpers/parseCSV.js'
import { euclideanDistance, pearsonDistance } from '../helpers/algorithms.js'
import { getMovies } from '../helpers/parseCSV.js'

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
    const targetUserId = Number(req.body.user)
    const nOfResults = req.body.results
    const similarityScores = this.#calculateSimilarity(req)
    const ratings = getRatings()

    // The movies the selected user has seen
    const seenMovies = new Set()
    ratings.forEach((rating) => {
      if (Number(rating.UserId) === targetUserId) {
        seenMovies.add(Number(rating.MovieId))
      }
    })

    // The movies the user hasn't seen
    const unseenMovies = ratings
      .map((rating) => {
        return {
          userId: Number(rating.UserId),
          movieId: Number(rating.MovieId),
          rating: Number(rating.Rating),
          similarity: similarityScores.find((s) => Number(s.userId) === Number(rating.UserId))
            ?.similarityScore,
        }
      })
      .filter((movie) => movie.userId !== targetUserId && !seenMovies.has(movie.movieId))

    // Calcualte weighted score
    let recommendations = this.#getRecommendationsByWeightedScore(unseenMovies)

    if (nOfResults < recommendations.length) {
      recommendations = [...recommendations].slice(0, nOfResults)
    }

    res.status(200).json({ data: recommendations })
  }

  /**
   *
   * @param {Array} movieData
   * @returns
   */
  #getRecommendationsByWeightedScore(movieData) {
    // Calculate the weighed score
    movieData.forEach((entry) => {
      const similarity = entry.similarity
      const rating = entry.rating
      const weightScore = similarity * rating
      entry.ws = weightScore
    })

    movieData = movieData.filter((movie) => movie.similarity > 0)
    const movieMap = new Map()

    movieData.forEach((rating) => {
      const current = movieMap.get(rating.movieId) || {
        ws: 0,
        similarity: 0,
      }

      movieMap.set(rating.movieId, {
        ws: current.ws + rating.ws,
        similarity: current.similarity + rating.similarity,
      })
    })

    const movies = getMovies()
    const recommendations = []

    for (const [movieId, { ws, similarity }] of movieMap) {
      const movie = movies.find((m) => Number(m.MovieId) === movieId)

      const recommendation = {
        movieId,
        movieTitle: movie?.Title,
        score: Number(ws / similarity).toFixed(4),
      }

      recommendations.push(recommendation)
    }

    return recommendations.sort((a, b) => b.score - a.score)
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
