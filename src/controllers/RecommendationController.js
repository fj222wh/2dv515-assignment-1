import { parseCSV, getUsers, findUser, getRatings } from '../helpers/parseCSV.js'
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
    // Variables
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

    console.log('THE USER WITH ITS RATINGS')
    console.log(usersWithRatings)

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
      const score = similarityMethod(selectedUser, user)
      console.log(score)
      const object = {
        name: user.Name,
        userId: user.UserId,
        similarityScore: score,
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

    const mostSimilarUser = this.#calculateSimilarity(req)[0] // Baserat på vilken användare som är mest lik
    console.log(mostSimilarUser)

    const movies = parseCSV('./data/ratings.csv') //  All movies

    const ratings = parseCSV('./data/ratings.csv')

    const mostSimilarUserRatings = [...ratings].filter(
      (movie) => movie.UserId === mostSimilarUser.userId || movie.UserId === req.body.user,
    )

    console.log('Selected user: ' + req.body.user)
    console.log('Most similar user: ' + mostSimilarUser.userId)
    console.log(mostSimilarUserRatings)
    const seen = new Set()
    mostSimilarUserRatings
      .filter((movie) => movie.UserId === req.body.user)
      .map((movie) => movie.MovieId)
      .forEach((movieId) => seen.add(movieId))
    console.log(seen)

    const unseenMovies = ratings.filter(
      (movie) => movie.UserId === mostSimilarUser.userId && !seen.has(movie.MovieId),
    )
    console.log('Unseen movies!!')
    console.log(unseenMovies)
    // const selectedUser = findUser(req.body.user)

    // console.log('selected user')
    // console.log(selectedUser)

    // console.log('2 RATINGS')
    // console.log(mostSimilarUserRatings)

    // Hämta ochs sortera filmer som den här användaren gillar
    // Hitta filmerna som användare med id x gillar, jämför med de filmer som den valda användaren INTE har betygsatt
    // Skicka tillbaka de filmer som den inte har betygsatt

    // Splice beroende på hur många resultat vi vill ha

    // const recommendedMovies = []
    // if (nOfResults < recommendedMovies.length) {
    //   recommendedMovies = recommendedMovies.slice(0, nOfResults)
    // }

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
