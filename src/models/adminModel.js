const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    hero: [
        {
            image: String,
            preface: String,
            title: String,
            description: String,
            link: String,
        }
    ],
    flashSale: [
        {
            id: String,
        }
    ],
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
            products: [
                {
                    id: String,
                }
            ],
            subCategory: [
                {
                    id: String,
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
    