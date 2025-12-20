from flask import Flask, request, jsonify
import requests
import os

app = Flask(__name__)

TELEGRAM_TOKEN = os.getenv("TELEGRAM_TOKEN")
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID")

@app.route("/", methods=["GET", "POST"])
def webhook():
    if request.method == "POST":
        # TradingView payload (text or JSON)
        try:
            data = request.get_json(silent=True)
            if data:
                message = f"📡 TradingView Alert\n\n{data}"
            else:
                message = f"📡 TradingView Alert\n\n{request.get_data(as_text=True)}"
        except Exception:
            message = f"📡 TradingView Alert\n\n{request.get_data(as_text=True)}"

        # Send to Telegram
        if TELEGRAM_TOKEN and TELEGRAM_CHAT_ID:
            url = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage"
            payload = {
                "chat_id": TELEGRAM_CHAT_ID,
                "text": message
            }
            requests.post(url, json=payload)

        return jsonify({"status": "ok"}), 200

    # GET = health check
    return "Webhook is running", 200


if __name__ == "__main__":
    app.run()
