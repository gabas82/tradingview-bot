const express = require("express");
const app = express();
app.use(express.json());

app.post("/webhook", (req, res) => {
    console.log("Received:", req.body);
    res.send("OK");

    // тук ще пращаме към Телеграм по-късно
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port", PORT)); 
