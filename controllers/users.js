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

		return res.status(201).json(user);
	} catch (err) {
		next(err);
	}
};

exports.putUserById = async (req, res, next) => {
	try {
		const { userId } = req.params;
		const { name, email, roles, accountStatus } = req.body;
		const user = await userService.updateUser(userId, {
			name,
			email,
			accountStatus,
			roles,
		});

		if (!user) throw error("User not found", 404);
		res.status(200).json(user);
	} catch (err) {
		next(err);
	}
};

exports.patchUserById = async (req, res, next) => {
	try {
		const { userId } = req.params;
		const { name, roles, accountStatus } = req.body;
		const user = await userService.findUserByProperty("_id", userId);
		if (!user) throw error("User not found!", 404);

		user.name = name ?? user.name;
		user.roles = roles ?? user.roles;
		user.accountStatus = accountStatus ?? user.accountStatus;

		await user.save();
		return res.status(200).json(user);
	} catch (err) {
		next(err);
	}
};

exports.deleteUserById = async (req, res, next) => {
	try {
		const { userId } = req.params;
		const user = await userService.findUserByProperty("_id", userId);
		if (!user) throw error("User not found!", 404);

		// TODO: call delete user service for delete the user all info

		await user.deleteOne(); // Mongoose version 8.0.1. The remove() method is deprecated in Mongoose starting from version 4.0.0, and it has been completely removed in version 8.0.1. Instead of using remove(), you should use deleteOne() or deleteMany() methods to delete documents in Mongoose 8.x.

		return res.status(203).send();
	} catch (err) {
		next(err);
	}
};