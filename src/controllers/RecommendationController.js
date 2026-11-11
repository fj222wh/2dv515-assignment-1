export class RecommendationController {

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    index(req, res, next) {
        res.status(200).json({message: 'hello from recommendationcontroller'})
    }
}