const express = require("express");

const app = express();
app.use(express.json());

// тест – да знаем, че сървърът живее
app.get("/", (req, res) => {
  res.send("Bot is running");
});

// тук TradingView ще изпраща сигналите
app.post("/webhook", (req, res) => {
  console.log("Received webhook:", req.body);
  res.json({ ok: true });
});

// Railway дава PORT като променлива
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
