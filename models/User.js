const { model, Schema } = require("mongoose");

const userSchema = new Schema({
	name: {
		type: String,
		required: [true, "Name is required"],
	},
	email: {
		type: String,
		required: [true, "Email is required"],
		validate: {
			validator: function (v) {
				return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
			},
			message: (props) => `Invalid email: ${props.value}`,
		},
	},
	password: {
		type: String,
		required: [true, "Password is required"],
		minLength: [6, "Password is too short"],
	},
	roles: {
		type: [String],
		default: ["STUDENT"],
		requied: true,
	},
	accountStatus: {
		type: String,
		enum: ["PENDING", "ACTIVE", "REJECTED"],
		default: "PENDING",
		requied: true,
	},
});

/* userSchema.pre("save", async function (next) {
	const user = this;

	// Only hash the password if it has been modified or is new
	if (!user.isModified("password")) return next();

	try {
		// Generate a salt
		const salt = await bcrypt.genSalt(10);

		// Hash the password using the generated salt
		const hashedPassword = await bcrypt.hash(user.password, salt);

		// Replace the plain text password with the hashed one
		user.password = hashedPassword;

		next();
	} catch (error) {
		next(error);
	}
}); */

const User = model("User", userSchema);
module.exports = User;
