const studentAttendanceController = require("../controllers/student-attendance");
const router = require("express").Router();

/**
 * @route /api/v1/student/attendance/status
 * @method GET
 * @private
 */
router.get("/status", studentAttendanceController.getAttendanceStatus);

/**
 * @route /api/v1/student/attendance/:id
 * @method GET
 * @private
 */
router.get("/:id", studentAttendanceController.getAttendance);

module.exports = router;
