module.exports = {
	get: (req, res) => {
        const dataAccess = require("./../data-access/data")
		res.send(dataAccess.data);
	}
};