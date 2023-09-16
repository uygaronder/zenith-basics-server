const { log } = require('console');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productPrice: Number,
    description: String,
    productCategory: String,
    images: Array,
    aboutItems: {
        type: Array,
        default: [
            {
                description: String,
            }
        ],
    },
    rating: {
        type: Number,
        default: 0
    },
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
        sold: {
            type: Number,
            default: 0
        },

    },
    stockQuantity: Number,
    stockStatus: {
        type: String,
        default: "In Stock"
    },
    reviews: {
        type: Array,
        default: [
        ],
    },
});

productSchema.methods.addReview = function (review) {
    this.reviews.push(review);
    return this.save();
}

module.exports = mongoose.model('Product', productSchema);