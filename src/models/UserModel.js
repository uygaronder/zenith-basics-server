const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: Number,
    email: {
        type: String,
        required: true
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    admin: {
        type: Boolean,
        default: false
    },
    wishlist: Array,
    notifications: Array,
    cart: {
        type: Array,
        default: [
            {
                productId: String,
                quantity: Number
            }
        ],
    },
    orders: Array,
    address: Array,
    payment: Array,
    reviews: Array,
    reactedReviews: Array,
    image: {
        type: String,
        default: 'https://res.cloudinary.com/dxkufsejm/image/upload/v1620059953/placeholder-image-person_1_zjxq8c.png'
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
});

const notificationSchema = new mongoose.Schema({
    notificationId: String,
    notificationType: String,
    notificationRead: {
        type: Boolean,
        default: false
    },
    notificationMessage: String,
    notificationDate: {
        type: Date,
        default: Date.now
    },
    notificationLink: String
});

const orderSchema = new mongoose.Schema({
    orderId: String,
    orderDate: {
        type: Date,
        default: Date.now
    },
    orderStatus: String,
    orderTotal: Number,
    orderAddress: Object,
    orderPayment: Object
});

const addressSchema = new mongoose.Schema({
    addressId: String,
    addressName: String,
    addressStreet: String,
    addressCity: String,
    addressState: String,
    addressZip: String,
    addressCountry: String,
    addressPhone: String,
    addressDefault: Boolean
});

const paymentSchema = new mongoose.Schema({
    paymentId: String,
    paymentName: String,
    paymentCard: String,
    paymentCvv: String,
    paymentExpMon: String,
    paymentExpYear: String,
    paymentDefault: Boolean
});

const reviewSchema = new mongoose.Schema({
    reviewId: String,
    reviewDate: {
        type: Date,
        default: Date.now
    },
    reviewRating: Number,
    reviewTitle: String,
    reviewBody: String,
    reviewProduct: Object,
    reviewUser: Object,
    reviewReactions: Array
});

const reactedReviewSchema = new mongoose.Schema({
    reactedReviewId: String,
    reactedReviewDate: {
        type: Date,
        default: Date.now
    },
    reactedReviewRating: Number,
    reactedReviewTitle: String,
    reactedReviewBody: String,
    reactedReviewProduct: Object,
    reactedReviewUser: Object,
    reactedReviewReactions: Array
});

const cartSchema = new mongoose.Schema({
    productId: String,
    productName: String,
    productPrice: Number,
    productImage: String,
    productQuantity: Number
});

userSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('hashed_assword')) {
            return next();
        }
        const hashed = await bcrypt.hash(this.hashed_assword, 10);
        this.hashed_password = hashed;
        return next();
    } catch (err) {
        return next(err);
    }
});

userSchema.methods.comparePassword = async function (attempt, next) {
    try {
        return await bcrypt.compare(attempt, this.hashed_password);
    } catch (err) {
        next(err);
    }
};

userSchema.methods.setPassword = async function (password) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);
        this.hashed_password = hashed;
    } catch (err) {
        console.log(err);
    }
};

userSchema.methods.newNotification = async function (notification) {
    try {
        this.notifications.push(notification);
    } catch (err) {
        console.log(err);
    }
};

userSchema.methods.readNotification = async function (notification) {
    try {
        this.notifications.map((not) => {
            if (not.notificationId === notification.notificationId) {
                not.notificationRead = true;
            }
        });
    } catch (err) {
        console.log(err);
    }
};

userSchema.methods.deleteNotification = async function (notification) {
    try {
        this.notifications = this.notifications.filter((not) => {
            return not.notificationId !== notification.notificationId;
        });
    } catch (err) {
        console.log(err);
    }
};

userSchema.methods.clearNotifications = async function () {
    try {
        this.notifications = [];
    } catch (err) {
        console.log(err);
    }
};

userSchema.methods.newOrder = async function (order) {
    try {
        this.orders.push(order);
    } catch (err) {
        console.log(err);
    }
};

userSchema.methods.newAddress = async function (address) {
    try {
        this.address.push(address);
    } catch (err) {
        console.log(err);
    }
};

userSchema.methods.newPayment = async function (payment) {
    try {
        this.payment.push(payment);
    } catch (err) {
        console.log(err);
    }
};

userSchema.methods.newReview = async function (review) {
    try {
        this.reviews.push(review);
    } catch (err) {
        console.log(err);
    }
};

userSchema.methods.newReactedReview = async function (reactedReview) {
    try {
        this.reactedReviews.push(reactedReview);
    } catch (err) {
        console.log(err);
    }
};

userSchema.methods.newWishlistedItem = async function (id) {
    try {
        this.wishlist.push(id);
    } catch (err) {
        console.log(err);
    }
};

userSchema.methods.removeWishlistedItem = async function (id) {
    try {
        this.wishlist = this.wishlist.filter((item) => item.productId !== id);
    } catch (err) {
        console.log(err);
    }
};


userSchema.methods.clearCart = async function () {
    try {
        this.cart = [];
    } catch (err) {
        console.log(err);
    }
};

userSchema.methods.newCartItem = async function (item) {
    try {
        this.cart.push(item);
    } catch (err) {
        console.log(err);
    }
};

userSchema.methods.removeCartItem = async function (id) {
    try {
        this.cart = this.cart.filter((item) => item.productId !== id);
    } catch (err) {
        console.log(err);
    }
};

userSchema.methods.updateCartItem = async function (id, quantity) {
    try {
        this.cart = this.cart.map((item) => {
            if (item.productId === id) {
                item.quantity = quantity;
            }
            return item;
        });
    } catch (err) {
        console.log(err);
    }
};

userSchema.methods.newUser = async function (user) {
    try {
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this._id = user._id;
    } catch (err) {
        console.log(err);
    }  
};

userSchema.methods.hash = async function (password) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);
        return hashed;
    } catch (err) {
        console.log(err);
    }
};

module.exports = mongoose.model('User', userSchema);