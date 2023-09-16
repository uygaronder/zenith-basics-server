const productRouter = require("express").Router();

const mongoose = require("mongoose");

const Product = mongoose.model("Product");
const Review = mongoose.model("Review");
const Site = mongoose.model("Site");

const { cloudinary } = require("../utils/cloudinary-config.js");

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

productRouter.post("/new", async (req, res) => {
    const newProduct = new Product(req.body);
    console.log("product: ", newProduct);

    const uploadedImages = await uploadImages(req.body.images);
    newProduct.aboutItems.pop();
    newProduct.images = uploadedImages;

    Site.findOne({}).then(site => {
        site.products.push(newProduct._id);
        site.save();
    });

    const savedProduct = await newProduct.save();
    res.json(savedProduct);
});

async function uploadImages(images) {
    const uploadedImages = [];
    for (let image of images) {
        const uploadedResponse = await cloudinary.uploader.upload(image, {}).then((result) => {
            return result;
        });
        uploadedImages.push(uploadedResponse.secure_url);
    }
    return uploadedImages;
}

module.exports = productRouter;