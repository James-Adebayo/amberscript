const translateService = require("../services/translateService");
const data = "Hello this is testing translate service";

class TranslateController{
    constructor(translateService){
        this.translateService = translateService;
    }

    async translate(req, res){
        const result = await translateService.translate(data);
        if (result.error){
            // return res.status(400).send({success: false, error: result.error});
            return console.log({
                error: result.error
            });
        }

        // res.status(200).send({success: true, message: result.message});
        console.log(result);
    }
}

module.exports = new TranslateController();