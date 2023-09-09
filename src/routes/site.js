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
    const { id, slug } = req.body;
    const siteDataQuery = Site.findOne({}).exec();
    const siteData = await siteDataQuery;
    console.log(siteData);
    //siteData.addCategory(id, slug);
    //res.json(siteData);
});

module.exports = siteRouter;