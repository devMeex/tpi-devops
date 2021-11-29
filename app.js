const express = require("express");
const cors = require("cors");
const app = express();
const setupDb = require("./src/db/setup/config");
const routes = require("./src/routes/movie");
require("dotenv").config();
const path = require("path");

setupDb();

app.use(cors());
app.use(express.json());
app.use(routes);
app.set("views", path.join(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.listen(process.env.PORT || 3000, () => {
  console.log(`Node app running on ${process.env.PORT}`);
});
