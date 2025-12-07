import express from "express";

const app = express();
app.use(express.json());

// Webhook endpoint
app.post("/webhook", (req, res) => {
  console.log("Received webhook:", req.body);

  res.status(200).json({
    success: true,
    received: req.body
  });
});

// Start server – Railway provides PORT env
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 
