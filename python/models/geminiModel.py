import os
from dotenv import load_dotenv
load_dotenv()
apikey = os.getenv("GEMINI_API_KEY")

from google import genai

client = genai.Client(api_key = apikey)

class GeminiModel:
    @staticmethod
    def translate(text, language):
        prompt = f"Translate the following text to {language}. Return ONLY the translated text without quotes or explanation:\n\n{text}"
        try:
            response = client.models.generate_content(
                model = "gemini-3.6-flash",
                contents = prompt
            )
            return response.text
        except Exception as err:
            response = client.models.generate_content(
                model = "gemini-2.0-flash",
                contents = prompt
            )
            return response.text