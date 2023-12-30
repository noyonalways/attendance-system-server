const AdminAttendance = require("../models/AdminAttendance");

/**
 * Find admin attendance record based on a specific property and its value.
 * @param {string} key - The property key to search for (e.g., "_id").
 * @param {string} value - The value associated with the specified property.
 * @returns {Promise<Object|null>} A Promise that resolves to the found attendance record or null if not found.
 */
exports.findAttendanceByProperty = (key, value) => {
	if (key === "_id") {
		return AdminAttendance.findById(value);
	}
	return AdminAttendance.findOne({ [key]: value });
};

/**
 * Enable attendance by creating a new admin attendance record.
 * @param {Object} data - The data object representing the admin attendance details.
 * @returns {Promise<Object>} A Promise that resolves to the created admin attendance record.
 */
exports.enableAttendance = (data) => {
	const attendance = new AdminAttendance({ ...data });
	return attendance.save();
};
