// server.js
const express = require("express");
const bodyParser = require("body-parser");
var cors = require('cors')
const app = express();
const port = 80;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", require("./routes"));

app.listen(port, () => {
	console.log(`Application is running on port ${port}.`);
});