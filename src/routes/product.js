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

productRouter.get("/category/:category", async (req, res) => {
    const products = await Product.find({ productCategory: req.params.category });
    res.json(products);
});

productRouter.get("/search/:search/:category", async (req, res) => {
    if(req.params.search === "all" || req.params.search === "All"){
        const products = await Product.find({});
        res.json(products);
    } else {
        const searchRegex = new RegExp(req.params.search, "i");
        const products = await Product.find({ productName: searchRegex });
        res.json(products);
    }
});

productRouter.get("/:id", async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.json(product);
});

productRouter.post("/:id/review", async (req, res) => {
    const product = await Product.findById(req.params.id);
    const newReview = new Review(req.body);
    product.addReview(newReview);
    res.send("success");
});

productRouter.post("/toggleFlashSale/:id", async (req, res) => {
    const site = await Site.findOne({});
    //const alreadyOnSale = site.flashSale.filter(product => product.id === req.params.id);
    let alreadyOnSale = false;
    for(let product of site.flashSale.products){
        if(product.id === req.params.id){
            alreadyOnSale = true;
        }
    }

    console.log("alreadyOnSale: ", alreadyOnSale);
    if(alreadyOnSale){
        site.flashSale = site.flashSale.products.filter(product => product.id !== req.params.id);
    } else {
        site.flashSale.products.push({ id: req.params.id });
    }
    site.save();

    const product = await Product.findById(req.params.id);
    product.sale.onSale = !product.sale.onSale;
    product.save();
    res.send("success");
});

productRouter.post("/toggleSale/:id", async (req, res) => {
    const product = await Product.findById(req.params.id);
    product.sale.onSale = !product.sale.onSale;
    product.save();
    res.send("success");
});

productRouter.post("/toggleFeatured/:id", async (req, res) => {
    const site = await Site.findOne({});
    console.log("site: ", site.featuredProduct);
    let alreadyFeatured = false;
    for(let product of site.featuredProduct){
        if(product.id === req.params.id){
            alreadyFeatured = true;
        }
    }
    if(alreadyFeatured){
        site.featuredProduct = site.featuredProduct.filter(product => product.id !== req.params.id);
    } else {
        site.featuredProduct.push({ id: req.params.id });
    }
    site.save();

    const product = await Product.findById(req.params.id);
    product.featured = !product.featured;
    product.save();
    res.send("success");
});

productRouter.post("/new", async (req, res) => {
    const newProduct = new Product(req.body);
    console.log("product: ", newProduct);

    const uploadedImages = await uploadImages(req.body.images);
    newProduct.aboutItems.pop();
    newProduct.images = uploadedImages;

    Site.findOne({}).then(site => {
        site.category.forEach(category => {
            if(category.slug === newProduct.productCategory){
                category.products.push({ id: newProduct._id });
            }
        });
        site.newProduct.push({ id: newProduct._id });
        site.save();
    });

    await newProduct.save().then
    (() => {
        res.send("success");
    }).catch(err => {
        res.send(err);
    }
    );
        
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