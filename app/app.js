const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const routes = require("../routes");
const appRoutes = require("./routes");

app.use([morgan("dev"), cors(), express.json()]);

app.use(routes);
app.use(appRoutes);

app.use((_req, _res, next) => {
	const error = new Error("Resouce not found!");
	error.status = 404;
	next(error);
});

app.use((err, _req, res, _next) => {
	console.log(err);
	const message = err.message ? err.message : "Server Error Occurred";
	const status = err.status ? err.status : 500;
	res.status(status).json({ message });
});

module.exports = app;
