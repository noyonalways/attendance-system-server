const authService = require("../service/auth");


exports.register = async (req, res, next) => {
	try {
		const { name, email, password } = req.body;

		if (!name || !email || !password) {
			return res.status(400).json({ message: "Invalid data" });
		}

		const user = await authService.register({ name, email, password });
		return res.status(201).json({ message: "User created successfully", user });
	} catch (err) {
		next(err);
	}
};


exports.login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({ message: "Invalid data" });
		}

		const token = await authService.login({ email, password });

		return res.status(200).json({ message: "Login Successful", token });
	} catch (err) {
		next(err);
	}
};
