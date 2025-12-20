from flask import Flask, request, jsonify

app = Flask(__name__)

# Health check
@app.route("/", methods=["GET"])
def home():
    return "OK", 200

# TradingView webhook
@app.route("/webhook", methods=["POST"])
def webhook():
    data = request.get_json(force=True, silent=True)
    print(data)
    return jsonify({"status": "received"}), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)
