const express = require("express");
const cors = require("cors");

const app = express();

require("dotenv").config();

app.use(express.json());
app.use(cors());

const PORT = 5000;

// login and register routes
app.use("/auth", require("./controllers"));

app.listen(PORT, () => console.log(`listening on ${PORT}`));
