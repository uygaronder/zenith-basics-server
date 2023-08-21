if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
};

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const passport = require('passport');
const cors = require('cors');
const MongoStore = require("connect-mongo");
const session = require('express-session');
const flash = require('express-flash');
const methodOverride = require("method-override");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(cors({
    origin: process.env.APP_URL,
    credentials: true,
    secure: process.env.BUILD === "production" ? true : false,
}));

const cookieParser = require("cookie-parser");
app.use(cookieParser());

require('./src/models/ReviewModel.js');
require('./src/models/ProductModel.js');
require('./src/models/UserModel.js');

const User = require('./src/models/UserModel.js');

app.set("trust proxy", 1);

mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
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
    
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"))

const productRouter = require('./src/routes/product.js');
const userRouter = require('./src/routes/user.js');

app.use('/product', productRouter);
app.use('/user', userRouter);

const initializePass = require("./src/utils/passport-config");
initializePass(
    passport,
    async (email) => {
        const userQuery = User.findOne(email).exec();
        const user = await userQuery;
        return user;
    },
    async (id) => {
        const idQuery = User.find(id).exec();
        const idResult = await idQuery;
        return idResult;
    }
    );
    

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(process.env.PORT, () => {
    console.log(`Server Running on ${process.env.PORT}`);
});