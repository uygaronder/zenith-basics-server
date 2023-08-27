const siteRouter = require("express").Router();

const mongoose = require("mongoose");

const Product = mongoose.model("Product");
const Site = mongoose.model("Site");

siteRouter.get("/", async (req, res) => {
    const siteDataQuery = Site.findOne({}).exec();
    const siteData = await siteDataQuery;
    res.json(siteData);
});

module.exports = siteRouter;