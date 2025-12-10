const http = require("http");
const https = require("https");

const TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const PORT = process.env.PORT || 3000;

function sendTelegramMessage(text) {
  if (!TOKEN || !CHAT_ID) {
    console.error("Missing TELEGRAM_TOKEN or TELEGRAM_CHAT_ID");
    return;
  }

  const data = JSON.stringify({
    chat_id: CHAT_ID,
    text,
  });

  const options = {
    hostname: "api.telegram.org",
    path: `/bot${TOKEN}/sendMessage`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(data),
    },
  };

  const req = https.request(options, (res) => {
    res.on("data", () => {});
  });

  req.on("error", (err) => {
    console.error("Telegram error:", err);
  });

  req.write(data);
  req.end();
}

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url.startsWith("/webhook")) { 
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        const json = JSON.parse(body || "{}");
        console.log("Webhook received:", json);

        const text = `Signal ${json.side || ""} ${json.symbol || ""} @ ${
          json.price || ""
        }`;
        sendTelegramMessage(text);
      } catch (e) {
        console.error("Error parsing body:", e);
      }

      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("ok");
    });
  } else {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("ok");
  }
});

server.listen(PORT, () => {
  console.log("Server listening on port", PORT);
}); 
