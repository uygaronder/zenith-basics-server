if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
};

const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const app = express();

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

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(process.env.PORT, () => {
    console.log(`Server Running on ${process.env.PORT}`);
});