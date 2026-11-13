/**
 * Algorithms for recommendations
 *
 * @version 1.0.0
 * @author Filippa Johansson
 */

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
      if (Number(rating1.MovieId) === Number(rating2.MovieId)) {
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
  let sum1 = 0
  let sum2 = 0
  let sum1sq = 0
  let sum2sq = 0
  let pSum = 0

  let matchingCount = 0

  user1.ratings.forEach((rating1) => {
    rating1.Rating = Number(rating1.Rating)
    user2.ratings.forEach((rating2) => {
      rating2.Rating = Number(rating2.Rating)

      // If they have watched the same movie
      if (Number(rating1.MovieId) === Number(rating2.MovieId)) {
        sum1 += rating1.Rating
        sum2 += rating2.Rating
        sum1sq += rating1.Rating ** 2
        sum2sq += rating2.Rating ** 2
        pSum += rating1.Rating * rating2.Rating // product of ratings
        matchingCount += 1
      }
    })
  })

  if (matchingCount === 0) {
    return 0
  } else {
    const num = pSum - (sum1 * sum2) / matchingCount
    const den = Math.sqrt(
      (sum1sq - sum1 ** 2 / matchingCount) * (sum2sq - sum2 ** 2 / matchingCount),
    )

    if (den === 0) {
      return 0
    }

    const result = num / den

    return Number(result.toFixed(4))
  }
}
