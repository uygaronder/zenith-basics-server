const bcrypt = require("bcrypt");
const verifyRouter = require("express").Router();

const mongoose = require("mongoose");

const Token = mongoose.model("Token");
const User = mongoose.model("User");

const sendEmail = require("../mailer/mailer");

verifyRouter.get("/:token", async (req, res) => {
    User.findOne({ _id: req.params.token }, async (err, user) => {
        if (!user) {
            return res.status(400).json({ message: "We were unable to find a user for this token." });
        }
        if (user.emailVerified) {
            return res.status(400).json({ message: "This user has already been verified." });
        } else {
            const token = await Token.findOne({ userId: user._id });
            if (!token) {
                return res.status(400).json({ message: "We were unable to find a valid token. Your token may have expired." });
            } else {
                const salt = await bcrypt.genSalt();
                const hashedPassword = await bcrypt.hash(user.password, salt);
                user.password = hashedPassword;
                user.emailVerified = true;
                await user.save();
                await token.deleteOne();
                return res.status(200).json({ message: "The account has been verified. Please log in." });
            }
        }
    });
});

module.exports = verifyRouter;