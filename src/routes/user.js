const bcrypt = require("bcrypt");
const userRouter = require("express").Router();

const { authenticated } = require("../middleware/auth");


const mongoose = require("mongoose");
const passport = require("passport");

const Product = mongoose.model("Product");
const Review = mongoose.model("Review");
const User = mongoose.model("User");


const hash = (password) => {
    return bcrypt.hashSync(password, 10);
};

userRouter.get("/users", (req, res, next) => {
    User.find()
        .then(users => {
            res.send(users);
        })
        .catch(next);
});

userRouter.get("/users/:id", (req, res, next) => {
    User.findById(req.params.id)
        .then(user => {
            res.send(user);
        })
        .catch(next);
});

userRouter.post("/newUser", (req, res, next) => {
    User.find({email: req.body.email})
        .then(user => {
            if(user.length > 0) {
                res.json({message: "User already exists"});
            } else {
                req.body.password = hash(req.body.password);                
                User.create(req.body)
                .then(() => {
                    res.json({message: "success"});
                })
                .catch(next);
                
            }
        })
});

userRouter.post("/login", (req, res, next) => {
    User.find({email: req.body.email})
        .then(user => {
            if(user.length > 0) {
                if(bcrypt.compareSync(req.body.password, user[0].password)) {
                    passport.authenticate("local")(req, res, () => {
                        res.json({message: "success", user: user[0]});
                    });
                } else {
                    res.json({message: "Incorrect password"});
                }
            } else {
                res.json({message: "User does not exist"});
            }
        })
        .catch(next);
});

module.exports = userRouter;