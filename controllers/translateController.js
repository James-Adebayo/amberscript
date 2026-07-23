const translateService = require("../services/translateService");

class TranslateController {
    constructor(service) {
        this.translateService = service || translateService;
    }

    async translate(req, res) {
        try {
            const { text, language } = req.body || {};

            if (!text || typeof text !== "string" || text.trim() === "") {
                return res.status(400).json({
                    success: false,
                    error: "Text to translate is required."
                });
            }

            const targetLanguage = language && language.trim() !== "" ? language : "French";
            const translationResult = await translateService.translate(text, targetLanguage);

            return res.status(200).json({
                success: true,
                translation: translationResult,
                targetLanguage: targetLanguage
            });
        } catch (error) {
            console.error("Translation Controller Error:", error);
            return res.status(500).json({
                success: false,
                error: error.message || "Failed to process translation request."
            });
        }
    }
}

module.exports = new TranslateController();