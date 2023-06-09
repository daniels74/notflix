const express = require("express");
const app = express();

require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();
require("./startup/routes")(app);

const port = process.env.PORT || 4231;

const server = app.listen(port, () => {
	console.log(`Listening on port ${port}...`);
});

// module.exports = server;
