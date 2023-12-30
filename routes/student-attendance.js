const studentAttendanceController = require("../controllers/student-attendance");

const router = require("express").Router();

router.get("/status", studentAttendanceController.getAttendanceStatus);
router.get("/:id", studentAttendanceController.getAttendance);

module.exports = router;
