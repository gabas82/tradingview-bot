import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// Test endpoint
app.get("/", (req, res) => {
  res.send("Bot is running!");
});

// TradingView webhook
app.post("/webhook", async (req, res) => {
  const { signal, price, pair } = req.body;

  const MESSAGE = `Signal: ${signal}\nPrice: ${price}\nPair: ${pair}`;
  const TELEGRAM_TOKEN = "8420150299:AAF3clV0XvDiBdmz31glpkj4Z5z-3EPvQc8";
  const TELEGRAM_CHAT_ID = "1379138847";

  const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: MESSAGE,
    }),
  });

  res.send("OK");
});

// Start server
app.listen(3000, () => {
  console.log("Server running");
}); 
