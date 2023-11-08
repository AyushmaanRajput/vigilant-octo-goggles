const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const connection = require("./connection");

const urlRoutes = require("./routes/url.routes");
const authRoutes = require("./routes/auth.routes");

app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use(urlRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to DB");
    console.log("Server running at port " + process.env.PORT);
  } catch (err) {
    console.log("Connect to DB failed!");
  }
});
