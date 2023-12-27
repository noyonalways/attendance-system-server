const userController = require("../controllers/users");
const router = require("express").Router();

// TODO: refactor the routes stucture

// TODO:
/**
 * Get all users, include
 * - filter
 * - sort
 * - pagination
 * - select properties
 * @route /api/v1/users?sort=["by", "name"]
 * @method GET
 * @private
 */

router.get("/", userController.getUsers);
/**
 * Create a new user
 * @route /api/v1/users
 * @method POST
 * @private
 */
router.post("/", userController.postUser);

/**
 * Get user by id or email
 * @route /api/v1/users/userId
 * @method GET
 * @private
 */
router.get("/:userId", userController.getUserById);

/**
 * Update user by id
 * @route /api/v1/users/userId
 * @method PUT
 * @private
 */
router.put("/:userId", () => {});

/**
 * Update user by id
 * @route /api/v1/users/userId
 * @method PATCH
 * @private
 */
router.patch("/:userId", () => {});

/**
 * Delete user by id
 * @route /api/v1/users/userId
 * @method DELETE
 * @private
 */
router.delete("/:userId", () => {});

module.exports = router;
