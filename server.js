import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import http from 'http';



import { userRt } from './api/router/user'
import { authorRt } from './api/router/author'
import { categoryRt } from './api/router/category'
import { bookRt } from './api/router/book'
import { borrowRt } from './api/router/borrow'




const port = 3000;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


http.createServer(app).listen(port, () => {
    console.log(`listenning to port ${port}`)
})


mongoose.connect(`mongodb+srv://admin:${process.env.MG_pass}@cluster0-01h8f.mongodb.net`,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err) => {
        if (err) {
            throw err
        }
        console.log('connect database')
    });



app.use('/user', userRt);
app.use('/author', authorRt);
app.use('/category', categoryRt)
app.use('/book', bookRt)
app.use('/borrow', borrowRt)