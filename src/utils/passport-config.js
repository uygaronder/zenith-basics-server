const LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport, authenticateUser) {
    passport.use(new LocalStrategy(authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {
        return done(null, id);
    });
}