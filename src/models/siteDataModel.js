const mongoose = require("mongoose");

const siteDataSchema = new mongoose.Schema({
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

siteDataSchema.methods.removeBestSeller = function (id) {
    this.bestSeller = this.bestSeller.filter((item) => item._id.toString() !== id);
    return this.save();
};

siteDataSchema.methods.addNewProduct = function (id) {
    this.newProduct.push({ id });
    return this.save();
};

siteDataSchema.methods.removeNewProduct = function (id) {
    this.newProduct = this.newProduct.filter((item) => item._id.toString() !== id);
    return this.save();
};

siteDataSchema.methods.addCategory = function (id, slug) {
    this.category.push({ id, slug });
    return this.save();
};

siteDataSchema.methods.removeCategory = function (id) {
    this.category = this.category.filter((item) => item._id.toString() !== id);
    return this.save();
};

siteDataSchema.methods.addProductToCategory = function (id, categoryID) {
    const category = this.category.find((item) => item._id.toString() === categoryID);
    category.products.push({ id });
    return this.save();
};

siteDataSchema.methods.removeProductFromCategory = function (id, categoryID) {
    const category = this.category.find((item) => item._id.toString() === categoryID);
    category.products = category.products.filter((item) => item._id.toString() !== id);
    return this.save();
};

siteDataSchema.methods.addProductToSubCategory = function (id, subCategoryID, categoryID) {
    const category = this.category.find((item) => item._id.toString() === categoryID);
    const subCategory = category.subCategory.find((item) => item._id.toString() === subCategoryID);
    subCategory.products.push({ id });
    return this.save();
};

siteDataSchema.methods.removeProductFromSubCategory = function (id, subCategoryID, categoryID) {
    const category = this.category.find((item) => item._id.toString() === categoryID);
    const subCategory = category.subCategory.find((item) => item._id.toString() === subCategoryID);
    subCategory.products = subCategory.products.filter((item) => item._id.toString() !== id);
    return this.save();
};


module.exports = mongoose.model('Site', siteDataSchema);