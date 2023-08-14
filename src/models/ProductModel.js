const { log } = require('console');
const mongoose = require('mongoose');
const { Schema } = mongoose;

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
        ],
    },
});

productSchema.methods.addReview = function (review) {
    this.reviews.push(review);
    return this.save();
}

productSchema.methods.addVariant = function () {
    //this.variants.push(variant);
    //return this.save();
    console.log('add variant');
}

// module.exports =
module.exports = mongoose.model('Product', productSchema);