const ConnectionManager = require('./connectionManager');
const cheerio = require('cheerio');

const connectionManager = new ConnectionManager();
let parsedURLs = [], newURLs = [];

const addNewUrls = function(html) {
    const $ = cheerio.load(html);

    $('a' ).each(function () {
        let href = $(this).attr('href');

        if(parsedURLs.indexOf(href) < 0) {
            const pat = /^https?:\/\//i;
            if (!pat.test(href)) { // for relative urls
                href = `https://www.w3schools.com/${href}`;
            }
            newURLs.push(href);
        }
    });
};

const scrape = () => {
    if (newURLs.length <= 0) {
        // breaking condition for recursion
        // console.log('processed urls size: ', parsedURLs.length);
    } else {
        for (let i = 0; i < newURLs.length; i++) {
            const url = newURLs.shift();
            parsedURLs.push(url);
            i--;
            
            connectionManager.createConnection(url, (html) => {
                addNewUrls(html);
                scrape();
            }, (error) => {
                console.log('Error occurred: ', error);
                scrape();
            })
        }
    }
};

const scrapeWithoutAsync = () => {
    newURLs.push("https://www.w3schools.com/");
    scrape();
};

module.exports = scrapeWithoutAsync;