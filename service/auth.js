const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userService = require("./users");
const error = require("../utils/error");

/**
 * Register a new user.
 * @param {{ name: string, email: string, password: string }} userData - User data for registration.
 * @returns {Promise<User>} - A promise that resolves to the created user.
 * @throws {Error} - Throws an error if the user already exists.
 */
exports.register = async ({ name, email, password, roles, accountStatus }) => {
	let user = await userService.findUserByProperty("email", email);
	if (user) throw error("User already exists", 400);
	if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
		throw error("User validation failed");

	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);
	return userService.createNewUser({
		name,
		email,
		password: hash,
		roles,
		accountStatus,
	});
};

/**
 * Login a user.
 * @param {{ email: string, password: string }} credentials - User login credentials.
 * @returns {Promise<string>} - A promise that resolves to the JWT token.
 * @throws {Error} - Throws an error if the credentials are invalid.
 */
exports.login = async ({ email, password }) => {
	const user = await userService.findUserByProperty("email", email);
	if (!user) throw error("Invalid credentials", 400);

	const isMatched = await bcrypt.compare(password, user.password);
	if (!isMatched) throw error("Invalid credentials", 400);

	const payload = {
		_id: user._id,
		name: user.name,
		email: user.email,
		roles: user.roles,
		accountStatus: user.accountStatus,
	};
	const token = jwt.sign(payload, "secret-key", { expiresIn: "3h" });
	return token;
};
