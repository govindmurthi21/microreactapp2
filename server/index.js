// server/index.js

const path = require("path");
const express = require("express");
const cors = require('cors');

const PORT = process.env.PORT || 3003;

const app = express();

app.use(cors());
app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
