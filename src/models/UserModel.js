const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: Number,
    _id: mongoose.Types.ObjectId,
    email: {
        type: String,
        required: true
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    hashed_password: String,
    date: {
        type: Date,
        default: Date.now
    },
    admin: {
        type: Boolean,
        default: false
    },
    wishlist: {
        type: Array,
        default: [
            {
                productId: String,
                wishlistId: String,
            }
        ],
    },
    notifications: {
        type: Array,
        default: [
            {
                notificationType: String,
                notificationId: String,
                notificationDate: Date,
                notificationText: String,
                notificationRead: Boolean,
            }
        ],
    },
    cart: {
        type: Array,
        default: [
            {
                productId: String,
                cartId: String,
                quantity: Number,
            }
        ],
    },
    orders: {
        type: Array,
        default: [
            {
                orderId: String,
                orderDate: Date,
                orderStatus: String,
                orderTotal: Number,
                orderItems: Array,
            }
        ],
    },
    address: {
        type: Array,
        default: [
            {
                addressId: String,
                addressName: String,
                addressLine1: String,
                addressLine2: String,
                city: String,
                state: String,
                country: String,
                zipCode: String,
                phoneNumber: String,
            }
        ],
    },
    payment: {
        type: Array,
        default: [
            {
                cardNumber: String,
                cardName: String,
                cardExpiry: String,
                cardCVC: String,
            }
        ],
    },
    reviews: {
        type: Array,
        default: [
            {
                productId: String,
                reviewId: String,
            }
        ],
    },
    reactedReviews: {
        type: Array,
        default: [
            {
                reviewId: String,
                reaction: String,
            }
        ],
    },
    image: {
        type: String,
        default: 'https://res.cloudinary.com/dxkufsejm/image/upload/v1620059953/placeholder-image-person_1_zjxq8c.png'
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
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

module.exports = mongoose.model('User', userSchema);