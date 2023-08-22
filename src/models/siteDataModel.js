const mongoose = require("mongoose");

const setDataSchema = new mongoose.Schema({
    hero: [
        {
            image: String,
            preface: String,
            title: String,
            description: String,
            link: String,
        }
    ],
    flashSale: {
        until: Date,
        products: [
            {
                id: String,
            }
        ],
    },
    bestSeller: [
        {
            id: String,
        }
    ],
    newProduct: [
        {
            id: String,
        }
    ],
    category: [
        {
            id: String,
            slug: String,
            products: [
                {
                    id: String,
                }
            ],
            subCategory: [
                {
                    id: String,
                    slug: String,
                    products: [
                        {
                            id: String,
                        }
                    ],
                }
            ]
        }
    ],
});
    
siteDataSchema.methods.addHero = function (image, preface, title, description, link) {
    this.hero.push({ image, preface, title, description, link });
    return this.save();
};

siteDataSchema.methods.removeHero = function (id) {
    this.hero = this.hero.filter((item) => item._id.toString() !== id);
    return this.save();
};

siteDataSchema.methods.addFlashSale = function (id) {
    this.flashSale.push({ id });
    return this.save();
};

siteDataSchema.methods.removeFlashSale = function (id) {
    this.flashSale = this.flashSale.filter((item) => item._id.toString() !== id);
    return this.save();
};

siteDataSchema.methods.addBestSeller = function (id) {
    this.bestSeller.push({ id });
    return this.save();
};