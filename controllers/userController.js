const userService = require("../services/userService");

class UserController{
    constructor(userService){
        this.userService = userService;
    }
    async getUser(req, res){
        const result = await userService.getUser();

        if (result.error){
            res.status(400).send({success: false, error: result.error});
        }

        res.status(200).send({success: true, message: result.message});
    }
}

module.exports = new UserController();