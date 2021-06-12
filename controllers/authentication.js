const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config.js');

const tokenForUser = (user) => {
	const timestamp = new Date().getTime();
	return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
};

const signin = (req, res, next) => {
	res.send({ token: tokenForUser(req.user) });
};

const signup = async (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;

	if (!email || !password) {
		return res
			.status('422')
			.send({ error: 'You must provide email and password' });
	}

	try {
		const existingUser = await User.findOne({ email: email });
		if (existingUser) {
			return res.status('422').send({ error: 'Email is in use' });
		}

		const user = await new User({ email, password }).save();
		res.json({ token: tokenForUser(user) });
	} catch (error) {
		return next(error);
	}
};

module.exports = {
	signup,
	signin,
};
