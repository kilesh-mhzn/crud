import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import cors from 'cors';

import connectDB from './db/config.js';

dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  })
);
app.get('/', (req, res) => {
  res.send('hello world!');
});

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_DB_URI);
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
    console.log(`Connected to Mongoose Database`);
  } catch (e) {
    console.log(e);
  }
};
start();
