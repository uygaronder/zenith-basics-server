const Product = require('../models/product');
const Review = require('../models/review');

module.exports = function(app){
    app.get('/api/products', async (req, res) => {
        try {
            const products = await Product.find();
            res.json(products);
        } catch (err) {
            console.log(err);
        }
    });
    app.get('/api/products/:id', async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            res.json(product);
        } catch (err) {
            console.log(err);
        }
    });
    app.get('/api/products/:id/reviews', async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            const reviews = await Review.find({ _id: { $in: product.reviews } });
            res.json(reviews);
        } catch (err) {
            console.log(err);
        }
    });
    app.post('/api/products', async (req, res) => {
        try {
            const product = new Product(req.body);
            await product.save();
            res.json(product);
        } catch (err) {
            console.log(err);
        }
    });
    app.post('/api/products/:id/reviews', async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            const review = new Review(req.body);
            await review.save();
            product.reviews.push(review);
            await product.save();
            res.json(review);
        } catch (err) {
            console.log(err);
        }
    });
    app.put('/api/products/:id', async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            product.set(req.body);
            await product.save();
            res.json(product);
        } catch (err) {
            console.log(err);
        }
    });
    app.delete('/api/products/:id', async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            await product.remove();
            res.json(product);
        } catch (err) {
            console.log(err);
        }
    });
    app.delete('/api/products/:id/reviews/:reviewId', async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            const review = await Review.findById(req.params.reviewId);
            await review.remove();
            product.reviews.pull(review);
            await product.save();
            res.json(review);
        } catch (err) {
            console.log(err);
        }
    });
    app.put('/api/products/:id/reviews/:reviewId', async (req, res) => {
        try {
            const review = await Review.findById(req.params.reviewId);
            review.set(req.body);
            await review.save();
            res.json(review);
        } catch (err) {
            console.log(err);
        }
    });
}
