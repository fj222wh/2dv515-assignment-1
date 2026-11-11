export class UserController {

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    index(req, res, next) {
        res.status(200).json({message: 'hej från user controller'})

    }
}