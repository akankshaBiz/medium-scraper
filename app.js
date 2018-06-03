const express = require('express');
const withoutAsyncRouter = require('./routes/withoutAsync');
const withAsyncRouter = require('./routes/withAsync');

const app = express();

app.use('/scrape-without-async', withoutAsyncRouter);
app.use('/scrape-with-async', withAsyncRouter);

app.listen(8080);