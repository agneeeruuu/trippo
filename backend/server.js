import express from 'express';
import mongoose from 'mongoose';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import dotenv from 'dotenv';
import path from 'path';
import orderRouter from './routers/orderRouter.js';
import uploadRouter from './routers/uploadRouter.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// eslint-disable-next-line no-undef
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/trippo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

// static data 
// app.get('/api/products/:id', (req, res) => {
//     const product = data.products.find(x => x._id === req.params.id);
//     if (product) {
//         res.send(product);
//     } else {
//         res.status(404).send({ message: 'Product Not Found' });
//     }
// });

// static data
// app.get('/api/products', (req, res) => {
//     res.send(data.products);
// });

app.use('/api/uploads', uploadRouter);

app.use('/api/users', userRouter);

// from mongoDB
app.use('/api/products', productRouter);

app.use('/api/orders', orderRouter);

app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

app.get('/api/config/google', (req, res) => {
    res.send(process.env.GOOGLE_API_KEY || '');
});

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/frontend/build/index.html')));

// app.get('/', (req, res) => {
//     res.send('Server is ready');
// });

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

// eslint-disable-next-line no-undef
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`)
});