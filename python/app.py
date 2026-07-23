from fastapi import FastAPI;
app = FastAPI()

@app.get("/")
def home():
    return {
        "status" : "running"
    }

from controller.translateController import TranslateController
@app.post("/translate")
def translate(data: dict):
    return TranslateController.translate(data)