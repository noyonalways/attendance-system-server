const StudentAttendance = require("../models/StudentAttendance");
/**
 * Find student attendance record based on admin attendance ID and user ID.
 * @param {string} adminAttendanceId - The ID of the admin attendance record.
 * @param {string} userId - The ID of the user (student).
 * @returns {Promise<Object|null>} A Promise that resolves to the found attendance record or null if not found.
 */
exports.findAttendanceByProperty = (adminAttendanceId, userId) => {
	return StudentAttendance.findOne({
		adminAttendance: adminAttendanceId,
		user: userId,
	});
};

/**
 * Perform attendance for a student by creating a new attendance record.
 * @param {string} adminAttendanceId - The ID of the admin attendance record.
 * @param {string} userId - The ID of the user (student).
 * @returns {Promise<Object>} A Promise that resolves to the created attendance record.
 */
exports.performAttendance = (adminAttendanceId, userId) => {
	const attendance = new StudentAttendance({
		adminAttendance: adminAttendanceId,
		user: userId,
	});
	return attendance.save();
};
