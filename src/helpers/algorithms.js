/**
 * Algorithms for recommendations
 *
 * @version 1.0.0
 * @author Filippa Johansson
 */

import { getMovies } from "./parseCSV.js"

/**
 * 
 * @param {Array} movieData 
 * @returns 
 */
export function getRecommendationsByWeightedScore(movieData) {
    // Calculate the weighed score
    movieData.forEach(entry => {
        const similarity = entry.similarity
        const rating = entry.rating
        const weightScore = similarity * rating
        entry.ws = weightScore
    })

    console.log(movieData)
    const movieMap = new Map()

    movieData.forEach(rating => {
        const current = movieMap.get(rating.movieId) || {
            ws: 0,
            similarity: 0
        }

        movieMap.set(rating.movieId, {
            ws: current.ws + rating.ws,
            similarity: current.similarity + rating.similarity
        })
    })

    const movies = getMovies()
    const recommendations = []

    console.log(movies)

    for (const [movieId, {ws, similarity}] of movieMap) {
        const movie = movies.find(m => Number(m.MovieId) === movieId)

        const recommendation = {
            movieId,
            movieTitle: movie?.Title,
            score: Number(ws / similarity).toFixed(4),
            year: movie.Year
        }

        recommendations.push(recommendation)
    }

  return recommendations.sort((a, b) => b.score - a.score)
}

/**
 * Calculate the euclidean distance, returns a similarity score
 *
 * @param {Object} obj1 The user we have selected to compare with the other user
 * @param {Object} obj2 The other user
 */
export function euclideanDistance(user1, user2) {
  let similarity = 0
  let matchingCount = 0

  user1.ratings.forEach((rating1) => {
    user2.ratings.forEach((rating2) => {
      // If they have rated the same movie, we want to check how similar they rated the same movie
      if (rating1.MovieId === rating2.MovieId) {
        similarity += (rating1.Rating - rating2.Rating) ** 2
        matchingCount += 1
      }
    })
  })

  if (matchingCount === 0) {
    return 0
  }
  const invertedScore = 1 / (1 + similarity)
  return Number(invertedScore.toFixed(4))
}

/**
 * Calculating recommendation values based of pearson
 *
 * @param {Object} data The data
 */
export function pearsonDistance(user1, user2) {
  // Compare with pearson distance
  console.log(user1)
  console.log(user2)
  console.log('hello from pearson distance')
  return 2 * Math.random(2)
}
