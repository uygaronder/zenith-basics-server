const siteRouter = require("express").Router();

const mongoose = require("mongoose");

const Product = mongoose.model("Product");
const Site = mongoose.model("Site");

siteRouter.get("/", async (req, res) => {
    const siteDataQuery = Site.findOne({}).exec();
    const siteData = await siteDataQuery;
    res.json(siteData);
});

siteRouter.post("/newCategory", async (req, res) => {
    const {category} = req.body;
    const siteDataQuery = Site.findOne({}).exec();
    const siteData = await siteDataQuery;
    siteData.addCategory(category).then((result) => {
        if(result){
            res.json({status: "success"});
        } else {
            res.json({status: "failed"});
        }
    });
});

siteRouter.get("/products", async (req, res) => {
    const productsQuery = Product.find({}).exec();
    const products = await productsQuery;
    res.json(products);
});

module.exports = siteRouter;