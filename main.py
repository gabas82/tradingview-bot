from flask import Flask, request
import requests
import os

app = Flask(__name__)

TELEGRAM_TOKEN = os.getenv("TELEGRAM_TOKEN")
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID")

@app.route("/", methods=["GET"])
def home():
    return "Bot is running"

@app.route("/webhook", methods=["POST"])
def webhook():
    data = request.json
   text = f"🟢 SIGNAL\nPAIR: {data.get('symbol')}\nPRICE: {data.get('price')}\nTF: {data.get('timeframe')}\nSIDE: {data.get('side')}" 
    url = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage"
    payload = {
        "chat_id": TELEGRAM_CHAT_ID,
        "text": text
    }
    requests.post(url, json=payload)
    return {"status": "ok"}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000) 
