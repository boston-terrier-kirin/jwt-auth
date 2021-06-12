const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const localOptions = {
	usernameField: 'email',
};
const localLogin = new LocalStrategy(
	localOptions,
	async (email, password, done) => {
		try {
			const user = await User.findOne({ email });
			if (!user) {
				return done(null, false);
			}

			user.comparePassword(password, (error, isMatch) => {
				if (error) {
					return done(error, false);
				}

				if (!isMatch) {
					return done(null, false);
				}

				return done(null, user);
			});
		} catch (error) {
			done(error, false);
		}
	}
);

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: config.secret,
};

const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
	try {
		const user = await User.findById(payload.sub);

		if (user) {
			return done(null, user);
		}
		return done(null, false);
	} catch (error) {
		done(error, false);
	}
});

passport.use(jwtLogin);
passport.use(localLogin);
