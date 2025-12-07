import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Bot is running!");
});

app.post("/webhook", async (req, res) => {
  const { signal, price, pair } = req.body;

  const MESSAGE = `Signal: ${signal}\nPrice: ${price}\nPair: ${pair}`;

  const TELEGRAM_TOKEN = 8420150299:AAHuxTuso-xmpca8LX7B6neyWW6FcPX0scw;
  const TELEGRAM_CHAT_ID = 1379138847;

  const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: MESSAGE,
    }),
  });

  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Running on port " + PORT)); 
