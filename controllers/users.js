const authService = require("../service/auth");
const userService = require("../service/users");
const error = require("../utils/error");

exports.getUsers = async (req, res, next) => {
	/**
	 * TODO: filter, sort, pagination, select
	 */

	try {
		const users = await userService.findUsers();
		return res.status(200).json(users);
	} catch (err) {
		next(err);
	}
};

exports.getUserById = async (req, res, next) => {
	try {
		const { userId } = req.params;
		const user = await userService.findUserByProperty("_id", userId);
		if (!user) throw error("User not found!", 404);

		return res.status(200).json(user);
	} catch (err) {
		next(err);
	}
};

exports.postUser = async (req, res, next) => {
	try {
		const { name, email, password, roles, accountStatus } = req.body;
		const user = await authService.register({
			name,
			email,
			password,
			roles,
			accountStatus,
		});

        console.log(user);

		return res.status(201).json(user);
	} catch (err) {
		next(err);
	}
};

exports.putUserById = (req, res, next) => {};

exports.patchUserById = (req, res, next) => {};

exports.deleteUserById = (req, res, next) => {};
