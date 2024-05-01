const express = require("express");
const router = express.Router();

//controllers
const graphData = require("./controllers/GraphDataController.js");

//routes
router.get("/", (req, res) => {
	res.send("Server is up and running!");
});

router.get("/graph-data", graphData.get);

module.exports = router;