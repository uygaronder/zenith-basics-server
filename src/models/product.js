const mongoose = require('mongoose');

import reviewSchema from './review.js';
mongoose.model('Review', reviewSchema);

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    _id: mongoose.Types.ObjectId,
    price: Number,
    description: String,
    category: String,
    images: Array,
    variants: {
        type: Array,
        default: [
            {
                variantId: String,
                variantName: String,
                variantPrice: Number,
                variantStock: Number,
                variantImages: Array,
            }
        ],
    },
    sale: {
        onSale: {
            type: Boolean,
            default: false
        },
        salePrice: Number,
        sold: Number,

    },
    stock: Number,
    reviews: {
        type: Array,
        default: [
            {
                type: Schema.ObjectId,
                ref: 'Review'
            }
        ],
    },
});

productSchema.methods.addReview = function (review) {
    this.reviews.push(review);
    return this.reviews;
};

productSchema.methods.removeReview = function (review) {
    this.reviews.pull(review);
    return this.reviews;
};

productSchema.methods.addSale = function (sale) {
    this.sale = sale;
    return this.sale;
};

productSchema.methods.removeSale = function () {
    this.sale = {
        onSale: false,
        salePrice: 0,
        sold: 0,
    };
    return this.sale;
};

productSchema.methods.addStock = function (stock) {
    this.stock += stock;
    return this.stock;
};

productSchema.methods.removeStock = function (stock) {
    this.stock -= stock;
    return this.stock;
};

productSchema.methods.addSold = function (sold) {
    this.sale.sold += sold;
    return this.sale.sold;
};

productSchema.methods.removeSold = function (sold) {
    this.sale.sold -= sold;
    return this.sale.sold;
};

productSchema.methods.addVariant = function (variant) {
    this.variants.push(variant);
    return this.variants;
};

productSchema.methods.removeVariant = function (variant) {
    this.variants.pull(variant);
    return this.variants;
};

productSchema.methods.addImage = function (image) {
    this.images.push(image);
    return this.images;
};

productSchema.methods.removeImage = function (image) {
    this.images.pull(image);
    return this.images;
};

productSchema.methods.addVariantImage = function (variant, image) {
    this.variants[variant].variantImages.push(image);
    return this.variants[variant].variantImages;
};

productSchema.methods.removeVariantImage = function (variant, image) {
    this.variants[variant].variantImages.pull(image);
    return this.variants[variant].variantImages;
};

productSchema.methods.addVariantStock = function (variant, stock) {
    this.variants[variant].variantStock += stock;
    return this.variants[variant].variantStock;
};

productSchema.methods.removeVariantStock = function (variant, stock) {
    this.variants[variant].variantStock -= stock;
    return this.variants[variant].variantStock;
};


// module.exports =
module.exports = mongoose.model('Product', productSchema);