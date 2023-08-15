module.exports.authenticated = () => {
        return (req, res, next) => {
            if (req.isAuthenticated()) {
            return next();
            }
            res.json({message: 'Not authenticated'});
        };
    };

    