const JwtStrategy = require('passport-jwt').Strategy;
// eslint-disable-next-line prefer-destructuring
const ExtractJwt = require('passport-jwt').ExtractJwt;

// load up the user model
const db = require('../models');
const settings = require('../config/settings'); // get settings file

module.exports = function(passport) {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  opts.secretOrKey = settings.secret;
  passport.use(
    new JwtStrategy(opts, function(jwtPayload, done) {
      db.User.findOne({ id: jwtPayload.id }, function(err, user) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      });
    })
  );
};
