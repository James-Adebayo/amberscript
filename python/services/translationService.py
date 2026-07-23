from models.geminiModel import GeminiModel
class TranslationService:
    @staticmethod
    def translate(text, language):
        return GeminiModel.translate(text, language)