const authenticate = require("../middlewares/authenticate");
const router = require("express").Router();

router.get("/", (_req, res) => {
	res.send(
		`
        <!DOCTYPE html>
        <html lang="en">

            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="shortcut icon" href="https://www.freepnglogos.com/uploads/logo-internet-png/logo-internet-internet-internet-signal-icon-with-png-and-vector-format-27.png" type="image/x-icon" />
                <title>Attendance System Server</title>
            </head>

            <body>
                <h1>Welcome to Attendance System App</h1>
            </body>

        </html>
        `
	);
});

router.get("/private", authenticate, async (req, res) => {
	console.log(req.user);
	return res.status(200).json({ message: "I am a private route" });
});

router.get("/public", (req, res) => {
	res.status(200).json({ message: "I am a public route" });
});

module.exports = router;
