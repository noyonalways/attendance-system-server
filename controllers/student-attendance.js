const { isAfter, addMinutes } = require("date-fns");
const error = require("../utils/error");
const adminAttendanceService = require("../service/admin-attendance");
const studentAttendanceService = require("../service/student-attendance");

exports.getAttendance = async (req, res, next) => {
	try {
		/**
		 * step 1 - find admin attendance by
		 * step 2 - check if it is running or not
		 * step 3 - check already perform attendance or not
		 * step 4 - register entry
		 */
		const { id } = req.params;

		const adminAttendance =
			await adminAttendanceService.findAttendanceByProperty("_id", id);

		if (!adminAttendance) throw error("Invalid Attendance ID", 400);
		if (adminAttendance.status === "COMPLETED")
			throw error("Attendance Already Completed", 400);

		let attendance = await studentAttendanceService.findAttendanceByProperty(
			id,
			req.user._id
		);
		if (attendance) throw error("Already Register", 400);

		attendance = await studentAttendanceService.performAttendance(
			id,
			req.user._id
		);

		return res.status(201).json(attendance);
	} catch (err) {
		next(err);
	}
};

exports.getAttendanceStatus = async (_req, res, next) => {
	try {
		const running = await adminAttendanceService.findAttendanceByProperty(
			"status",
			"RUNNING"
		);
		if (!running) throw error("Not running", 400);

		const started = addMinutes(new Date(running.createdAt), running.timeLimit);
		if (isAfter(new Date(), started)) {
			running.status = "COMPLETED";
			await running.save();
		}

		return res.status(200).json(running);
	} catch (err) {
		next(err);
	}
};
