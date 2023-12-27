/**
 * Request Input soruces
 * req body
 * req Param
 * req Query
 * req Header
 * req Cookies
 */

const authService = require("../service/auth");

/* Pseudo code
    Start
    name = input()
    eamil = input()
    password = input()
    if name && email && password is invalid:
        return 400 error
    user = find user with email
    if user found:
        return 400 error
    hash = hash password
    user = save name, email, hash to user model
    rertun 201
    End 
*/

exports.register = async (req, res, next) => {
	try {
		const { name, email, password } = req.body;

		if (!name || !email || !password) {
			return res.status(400).json({ message: "Invalid data" });
		}

		const user = await authService.register({ name, email, password });
		return res.status(201).json({ message: "User created successfully", user });
	} catch (err) {
		next(err);
	}
};

/* Pseudo code
    Start
    name = input()
    email = input()

    user = find user with email
    if user not found:
        return 400 error

    if password != to user hash:
        return 400 error

    token = generate token using user
    return token
    End 
*/

exports.login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({ message: "Invalid data" });
		}

		const token = await authService.login({ email, password });

		return res.status(200).json({ message: "Login Successful", token });
	} catch (err) {
		next(err);
	}
};
