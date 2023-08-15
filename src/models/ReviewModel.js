const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
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
    return this.save();
};

reviewSchema.methods.unlike = function () {
    this.reviewLikes -= 1;
    return this.save();
};

reviewSchema.methods.dislike = function () {
    this.reviewDislikes += 1;
    return this.save();
};

reviewSchema.methods.undislike = function () {
    this.reviewDislikes -= 1;
    return this.save();
};

reviewSchema.methods.edit = function (newText) {
    this.reviewText = newText;
    this.edited = true;
    return this.save();
};

const Review = mongoose.model('Review', reviewSchema);
