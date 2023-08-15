if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
};

const express = require('express');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const MongoStore = require("connect-mongo");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

require('./src/models/ReviewModel.js');
require('./src/models/ProductModel.js');
require('./src/models/UserModel.js');

const productRouter = require('./src/routes/product.js');
const userRouter = require('./src/routes/user.js');

app.use('/product', productRouter);
app.use('/user', userRouter);

mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', (error) => {
    console.log(error);
});
db.once('open', () => {
    console.log('Connected to Database');
});

app.use(express.json());
app.use(cors(
    {
        origin: process.env.APP_URL,
        credentials: true,
        secure: process.env.BUILD === "production" ? true : false,
    }
));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: process.env.BUILD === "production" ? true : false,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: process.env.BUILD === "production" ? 'none' : 'lax',
    },
    store: MongoStore.create({
        mongoUrl: process.env.DATABASE_URL,
        collectionName: "sessions",
        ttl: 60 * 60 * 24 * 7,
    }),
}));


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(process.env.PORT, () => {
    console.log(`Server Running on ${process.env.PORT}`);
});