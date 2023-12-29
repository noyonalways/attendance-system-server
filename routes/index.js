const router = require("express").Router();
const authenticate = require("../middlewares/authenticate");
const authRoutes = require("./auth");
const userRoutes = require("./users");
const adminAttendanceRoutes = require("./admin-attendance");
const studentAttedanceRoutes = require("./student-attendance")

router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/users", authenticate, userRoutes);
router.use("/api/v1/admin/attendance", authenticate, adminAttendanceRoutes);
router.use("/api/v1/student/attendance", authenticate, studentAttedanceRoutes);

module.exports = router;
