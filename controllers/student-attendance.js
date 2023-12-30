const { isAfter, addMinutes } = require("date-fns");
const AdminAttendance = require("../models/AdminAttendance");
const StudentAttendance = require("../models/StudentAttendance");
const error = require("../utils/error");

exports.getAttendance = async (req, res, next) => {
	try {
		const { id } = req.params;
		/**
		 * step 1 - find admin attendance by
		 * step 2 - check if it is running or not
		 * step 3 - check already perform attendance or not
		 * step 4 - register entry
		 */

		const adminAttendance = await AdminAttendance.findById(id);
		if (!adminAttendance) throw error("Invalid Attendance ID", 400);

		if (adminAttendance.status === "COMPLETED")
			throw error("Attendance Already Completed", 304);

		let attendance = await StudentAttendance.findOne({
			adminAttendance: id,
			user: req.user._id,
		});

		if (attendance) throw error("Already Register", 400);

		attendance = new StudentAttendance({
			user: req.user._id,
			adminAttendance: id,
		});

		await attendance.save();
		return res.status(201).json(attendance);
	} catch (err) {
		next(err);
	}
};

exports.getAttendanceStatus = async (_req, res, next) => {
	try {
		const running = await AdminAttendance.findOne({ status: "RUNNING" });
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
