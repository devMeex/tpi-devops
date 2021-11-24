const express = require('express');
const cors = require('cors');
const app = express();
const setupDb = require('./src/db/setup/config');
const routes = require('./src/routes/movie');
require('dotenv').config()

setupDb();

app.use(cors());
app.use(express.json());
app.use(routes);

app.get("/", (req, res) =>{
  const html = `<h2>Welcome Devops TPI</h2>`
  res.send(html);
});



app.listen(process.env.PORT || 3000, () => {
  console.log(`Node app running on ${process.env.PORT}`);
});