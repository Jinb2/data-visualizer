const express = require("express");
const cors = require("cors");

if (process.env.NODE_ENV === "production") {
  envConfig = { path: ".env.production" };
} else {
  envConfig = { path: ".env.dev" };
}

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 5000;

app.listen(PORT, () => console.log(`listening on ${PORT}`));
