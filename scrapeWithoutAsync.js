const cheerio = require('cheerio');
const fs = require('fs');
const ConnectionManager = require('./connectionManager');

const connectionManager = new ConnectionManager();

let urlPool = [], processedUrls = [];

let processedIndex = 0;

const addNewUrls = function(html) {
    const $ = cheerio.load(html);

    $('a' ).each(function () {
        let href = $(this).attr('href');
        const pat = /^https?:\/\//i;
        if (!pat.test(href)) {
            href = `https://www.medium.com${href}`;
        }
        if(processedUrls.indexOf(href) < 0) {
            urlPool.push(href);
        }
    });
    scrape();
};

const writeUrlsToCsv = () => {
    const write = function () {
        if(index == processedIndex)return;
        fs.appendFile('scrape_without_async.csv', `${urlPool[index]}\n`, (error) => {
            if (error) console.log('File Error: ', error);
            else {
                index ++;
                write();
            }
        });
    };
    let index = 0;
    write();
};


const scrape = () => {
    const currentProcessing = urlPool.slice(processedIndex);
    if (currentProcessing.length <= 0) {
        // handles the condition when no urls are left
        writeUrlsToCsv();
    } else {
        for (let i = 0, len = currentProcessing.length; i < len; i++) {
            const url = currentProcessing[i];
            processedUrls.push(url);
            processedIndex++;

            connectionManager.createConnection(url, (html) => {
                addNewUrls(html);
            }, (error) => {
                console.log('Error occurred: ', error);
            });
        }
        writeUrlsToCsv();
    }
};

const scrapeWithoutAsync = () => {
    urlPool.push("https://medium.com/");
    scrape();
};

module.exports = scrapeWithoutAsync;