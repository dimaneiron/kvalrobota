const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const connectionString =
  "mongodb+srv://noname:1@cluster0.fjkkmek.mongodb.net/ChildClothes";

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use(express.json());

// Маршрут для отримання всіх товарів
const Clothes = mongoose.model("clothes", {});

app.get("/clothes", async (req, res) => {
  try {
    const clothes = await Clothes.find();
    res.json(clothes);
  } catch (error) {
    console.error("Error retrieving clothes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
