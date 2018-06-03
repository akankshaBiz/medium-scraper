import express from 'express';
import request from 'request';
import cheerio from 'cheerio';
import withoutAsyncRouter from './routes/withoutAsync';
import withAsyncRouter from './routes/withAsync';

const app = express();

app.use('/scrape-without-async', withoutAsyncRouter);
app.use('/scrape-with-async', withAsyncRouter)