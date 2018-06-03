# medium-scraper
A web scraping utility written in NodeJs for scraping all the links in www.medium.com.
It has to been done in such a way that at a particular instant we have only 5 active
connection to www.medium.com. If `request` is being used, we can't use their connection pool.
There are 2 versions of this application:
1. Using `async` library
2. Without using `async` library

There is one app.js which is the main server and the 2 versions are 2 different routes.
`routes/withAsync.js` has the logic for 1st version and `routes/withoutAsync.js` has
the logic for 2nd version.

Each version is internally using different modules to work.
1. `scrapeWithAsync.js` has the logic when `async` library is being used
2. `scrapeWithoutAsync.js` has the logic when no external library is being used for connection management.

The custom connection manager is in `connectionManager.js` file.


# Steps for setting up
1. Clone this repo
2. Go to the cloned repo directory
3. Install all dependencies using `npm install`

# Steps for running
1. Run the web server using `npm start`
2. For Scraping using `Async` library, go to http://localhost:8080/scrape-with-async (if your port is 8080)
3. For Scraping without using `Async` library, go to http://localhost:8080/scrape-without-async

# How it is working
## Request throttling using `async` library
I am using `async` library `eachLimit` function to limit the parallel network IO to 5 connections at a time.

## Request throttling using custom connection manager
The custom connection manager is keeping track of active connection. Whenever a request gets finished, the connection manager
checks the connection pool and take the first entry and creates another connection using that.