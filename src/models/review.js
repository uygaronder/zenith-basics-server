const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    reviewId: String,
    reviewDate: Date,
    reviewRating: Number,
    reviewText: String,
    reviewUserId: String,
    reviewImages: Array,
    reviewLikes: Number,
    reviewDislikes: Number,
    edited: {
        type: Boolean,
        default: false
    },
}
);

reviewSchema.methods.like = function () {
    this.reviewLikes += 1;
    return this.reviewLikes;
};

reviewSchema.methods.unlike = function () {
    this.reviewLikes -= 1;
    return this.reviewLikes;
};

reviewSchema.methods.dislike = function () {
    this.reviewDislikes += 1;
    return this.reviewDislikes;
};

reviewSchema.methods.undislike = function () {
    this.reviewDislikes -= 1;
    return this.reviewDislikes;
};

module.exports = mongoose.model('Review', reviewSchema);
