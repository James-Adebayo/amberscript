from fastapi import FastAPI;
app = FastAPI()

@app.get("/")
def home():
    return {
        "status" : "running"
    }

@app.post("/translate")
# looking for the a free ai responsible for the translation here,
def translate(data: dict):
    print ("Received: ", data["text"])

    return {
        "message" : {
            "translated: " + data["text"]
        }
    }