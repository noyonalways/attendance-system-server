const userController = require("../controllers/users");
const router = require("express").Router();

// TODO: refactor the routes stucture
router
	.route("/")

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
	.get(userController.getUsers)

	/**
	 * Create a new user
	 * @route /api/v1/users
	 * @method POST
	 * @private
	 */
	.post(userController.postUser);

router
	.route("/:userId")

	/**
	 * Get user by id or email
	 * @route /api/v1/users/userId
	 * @method GET
	 * @private
	 */
	.get(userController.getUserById)

	/**
	 * Update user by id
	 * @route /api/v1/users/userId
	 * @method PUT
	 * @private
	 */
	.put(userController.putUserById)

	/**
	 * Update user by id
	 * @route /api/v1/users/userId
	 * @method PATCH
	 * @private
	 */
	.patch(userController.patchUserById)

	/**
	 * Delete user by id
	 * @route /api/v1/users/userId
	 * @method DELETE
	 * @private
	 */
	.delete(userController.deleteUserById);

module.exports = router;
