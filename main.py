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

    text = (
        f"🟢 SIGNAL\n"
        f"PAIR: {data.get('symbol')}\n"
        f"PRICE: {data.get('price')}\n"
        f"TF: {data.get('timeframe')}\n"
        f"SIDE: {data.get('side')}"
    )

    url = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage"
    payload = {
        "chat_id": TELEGRAM_CHAT_ID,
        "text": text
    }

    requests.post(url, json=payload)
    return {"status": "ok"}


if __name__ == "__main__":
    app.run() 
