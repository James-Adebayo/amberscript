import os
from dotenv import load_dotenv
load_dotenv()
apikey = os.getenv("GEMINI_API_KEY")

from google import genai

client = genai.Client(api_key = apikey)

class GeminiModel:
    @staticmethod
    def translate(text, language):
        response = client.models.generate_content(
            model = "gemini-3.6-flash",
            contents = f"Translate '{text}' to {language}. Return only the translation."
        )
        return response.text