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

userRouter.get("/sendLoggedInUser", authenticated, (req, res, next) => {
    console.log(req.session.passport.user)
    if(!req.session.passport.user) {
        return res.json({message: "Not Logged in"});
    }
    User.findById(req.session.passport.user)
        .then(user => {
            user.password = undefined;
            res.json({user: user});
        })
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
    passport.authenticate("local", (err, user) => {
        if(err) {
            return next(err);
        }
        if(!user) {
            return res.json({message: "User not found"});
        }
        req.logIn(user, (err) => {
            if(err) {
                return next(err);
            }
            return res.json({message: "success"});
        });
    })(req, res);
});

userRouter.delete("/logout", (req, res, next) => {
    req.logout((err) => {
        if(err) console.log(err);
    });
    res.json({message: "success"});
});

userRouter.post("/addProductToCart", authenticated, (req, res, next) => {
    User.findById(req.session.passport.user)
        .then(user => {
            user.addProductToCart(req.body.id, req.body.quantity)
                .then(() => {
                    res.json({message: "success"});
                })
                .catch(next);
        })
        .catch(next);
});

module.exports = userRouter;