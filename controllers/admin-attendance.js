const { addMinutes, isAfter } = require("date-fns");
const error = require("../utils/error");
const adminAttendanceService = require("../service/admin-attendance");

exports.getEnable = async (_req, res, next) => {
	try {
		const running = await adminAttendanceService.findAttendanceByProperty(
			"status",
			"RUNNING"
		);

		if (running) throw error("Already running!", 400);
		const attendance = await adminAttendanceService.enableAttendance();

		return res.status(201).json({ message: "Success", attendance });
	} catch (err) {
		next(err);
	}
};

exports.getStatus = async (_req, res, next) => {
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

exports.getDisable = async (_req, res, next) => {
	try {
		const running = await adminAttendanceService.findAttendanceByProperty(
			"status",
			"RUNNING"
		);
		if (!running) throw error("Not running", 400);

		running.status = "COMPLETED";
		await running.save();

		return res.status(200).json(running);
	} catch (err) {
		next(err);
	}
};
