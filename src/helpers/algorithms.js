/**
 * Algorithms for recommendations
 *
 * @version 1.0.0
 * @author Filippa Johansson
 */


/**
 * Caclulates the weighted score for a movie
 */
export function weightedScore(similarity, rating) {
    return similarity * rating
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
        // console.log(rating1)
        // console.log('-----------------------------------')
        // console.log(rating2)
        // console.log('-----------------------------------')
        // console.log(`Movie being rated = ${rating1.MovieId}`)
        // console.log(`Selected user rating:  ${rating1.Rating}`)
        // console.log(`The other user's rating: ${rating2.Rating}`)
        // console.log('-----------------------------------')
        similarity += (rating1.Rating - rating2.Rating) ** 2
        matchingCount += 1
      }
    })
  })

  if (matchingCount === 0) {
    return 0
  }
  const invertedScore = 1 / (1 + similarity)
  console.log(invertedScore)
  return Number(invertedScore.toFixed(4))
}

/**
 * Calculating recommendation values based of pearson
 *
 * @param {Object} data The data
 */
export function pearsonDistance(user1, user2) {
  console.log('hello from pearson distance')
  return 2 * Math.random(2)
}
