const adminAttendanceController = require("../controllers/admin-attendance");
const router = require("express").Router();

/**
 * @route /api/v1/admin/attendance/enable
 * @method GET
 * @private
 */
router.get("/enable", adminAttendanceController.getEnable);

/**
 * @route /api/v1/admin/attendance/disable
 * @method GET
 * @private
 */
router.get("/disable", adminAttendanceController.getDisable);

/**
 * @route /api/v1/admin/attendance/status
 * @method GET
 * @private
 */
router.get("/status", adminAttendanceController.getStatus);

module.exports = router;
