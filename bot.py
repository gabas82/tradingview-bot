from flask import Flask, request
import os
import requests

app = Flask(__name__)

TELEGRAM_TOKEN = os.getenv("TELEGRAM_TOKEN")
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID")

@app.route("/", methods=["GET"])
def home():
    return "Bot is running"

@app.route("/signal", methods=["POST"])
def signal():
    data = request.get_json(force=True)

    message_text = data.get("message", str(data))
    text = f"📈 Нов сигнал от TradingView:\n\n{message_text}"

    url = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage"
    payload = {"chat_id": TELEGRAM_CHAT_ID, "text": text}

    try:
        r = requests.post(url, json=payload, timeout=10)
        print("Telegram response:", r.status_code, r.text)
    except Exception as e:
        print("Error sending to Telegram:", e)

    return "ok", 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000) 
