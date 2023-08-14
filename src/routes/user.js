const userRouter = require("express").Router();

const mongoose = require("mongoose");

const Product = mongoose.model("Product");
const Review = mongoose.model("Review");
const User = mongoose.model("User");



module.exports = userRouter;