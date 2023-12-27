const http = require("http");
const connectDB = require("./db");
const app = require("./app/app");
const server = http.createServer(app);
const port = process.env.PORT || 4000;



connectDB("mongodb://127.0.0.1:27017/attendance-system")
	.then(() => {
		console.log("Database Connected");

		server.listen(port, () => {
			console.log(`Server is running on port ${port}`);
		});
	})
	.catch((err) => {
		console.log(err);
	});
