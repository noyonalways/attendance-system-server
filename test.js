const mongoose = require("mongoose");
mongoose
	.connect("mongodb://127.0.0.1:27017/test", { serverSelectionTimeOutMS: 1000 })
	.then(async () => {
		console.log("Database Connected");
		await createUser({ name: "Nadim", email: "nadim@gmail.com" });
		await createUser({ name: "Shakil", email: "shakil@gmail.com" });
		await createUser({ name: "Mahfuj", email: "mahfuj@gmail.com" });
		mongoose.connection.close();
	})
	.catch((e) => {
		console.log(e);
	});

const userSchema = new mongoose.Schema({
	name: String,
	email: String,
});

const User = mongoose.model("User", userSchema);

async function createUser(data) {
	const user = new User({ ...data });
	await user.save();
	return user;
}
