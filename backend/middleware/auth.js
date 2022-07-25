module.exports.isLoggedIn = (req, res, next) => {
        if (!request.isAuthenticated())
        {
                return res.status(500).json("You must be signed in first")
        }
        next();
}