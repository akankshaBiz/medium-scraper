const express = require('express');
const scrapeWithoutAsync = require('../scrapeWithoutAsync');

const router = express.Router();

router.get('/', (req, res) => {
    res.end('generating csv fle....');
    scrapeWithoutAsync();
});

module.exports = router;