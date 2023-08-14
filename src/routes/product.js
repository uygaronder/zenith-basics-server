const productRouter = require("express").Router();

const mongoose = require("mongoose");

const Product = mongoose.model("Product");
const Review = mongoose.model("Review");

productRouter.get("/", async (req, res) => {
    const products = await Product.find({});
    res.json(products);
    });

productRouter.get("/test", async (req, res) => {
    Product.findOne({}).then(product => {
        product.addVariant();
    });
    res.json({message: "test"});
});

module.exports = productRouter;