const express = require('express')
const app = express()
const port = 3578

// .env
require('dotenv').config()

// CORS settings
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', process.env.FRONT_END_URL);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// routes
var routes = require("./routes/router");
app.use("/", routes);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
