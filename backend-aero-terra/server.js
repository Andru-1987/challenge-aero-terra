const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors");
const fs = require("fs").promises;
const path = require("path");

require("dotenv").config();

const config = {
  url: process.env.API_URL,
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
};

const corsOptions = {
  // origin: "*",
  // methods: "GET",
};

app.use(cors(corsOptions));

app.get("/api/colectivos", async (req, res) => {
  try {
    const { url, client_id, client_secret } = config;
    const response = await axios.get(url, {
      params: {
        client_id,
        client_secret,
      },
    });
    res.json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", msgURL: config.url });
  }
});

app.get("/api/barrios", async (req, res) => {
  try {
    const filePath = path.join(__dirname, "./data/barrios.json");
    const fileContent = await fs.readFile(filePath, "utf-8");
    const jsonData = JSON.parse(fileContent);
    res.json(jsonData);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", msgURL: config.url });
  }
});

app.listen("3000", "0.0.0.0",() => {
  console.log("Proxy server listening on port 3000");
});
