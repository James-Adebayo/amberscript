from services.translationService import TranslationService
class TranslateController:
    @staticmethod
    def translate(data):
        return TranslationService.translate(data['text'])