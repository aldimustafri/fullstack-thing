/**
 * @author Aldi Mustafri
 * @email aldimustafri@live.com
 * @create date 2020-07-14 14:00:22
 * @modify date 2020-07-14 14:00:22
 * @desc [description]
 */

var express = require("express");
var app = express();
var logger = require("morgan");
var cors = require("cors");

const bodyParser = require("body-parser");
const http = require("http");

const port = parseInt(process.env.PORT, 10) || 5000;
app.set("port", port);

const server = http.createServer(app);
server.listen(port);
console.log("Running on: http://localhost:" + port);

// Log requests to the console.
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.get("/", function (req, res) {
  res.json({ message: "Api Tersedia" });
});

const CustomerRoute = require("./routes/customer");
app.use("/customer", CustomerRoute);

module.exports = app;
