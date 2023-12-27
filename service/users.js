const User = require("../models/User");

/**
 * Find users
 * @returns {Promise<Array<User>>}
 */
exports.findUsers = () => {
	return User.find();
};

/**
 * Find a user by a specific property.
 * @param {string} key - The property key to search by (e.g., "_id", "email").
 * @param {string} value - The value to match for the specified property.
 * @returns {Promise<User|null>} - A promise that resolves to the found user or null if not found.
 */
exports.findUserByProperty = (key, value) => {
	if (key === "_id") {
		return User.findById(value);
	}
	// For other properties, use the findOne method with dynamic key-value pair.
	return User.findOne({ [key]: value });
};

/**
 * Create a new user and save it to the database.
 * @param {{ name: string, email: string, password: string }} userData - User data for creation.
 * @returns {Promise<User>} - A promise that resolves to the created user.
 */
exports.createNewUser = ({ name, email, password, roles, accountStatus }) => {
	const user = new User({
		name,
		email,
		password,
		roles: roles ? roles : ["STUDENT"],
		accountStatus: accountStatus ? accountStatus : "PENDING",
	});
	return user.save();
};
