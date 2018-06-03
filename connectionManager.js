const request = require('request');

class ConnectionManager {
    constructor() {
        this.connectionCount = 0;
        this.connectionPool = [];
    }

    notifyCompletion(callback, err) {
        this.connectionCount--;
        const url = this.connectionPool.shift();
        if (url) {
            this.createConnection(url, callback, err);
        }
    };

    createConnection(url, callback, err) {
        if (this.connectionCount >= 5) {
            this.connectionPool.push(url);
        } else {
            this.connectionCount++;
            request.get(url, (error, response, html) => {
                if (error) err(error);

                this.notifyCompletion(callback, err);
                callback(html);
            })
        }
    }
}

module.exports = ConnectionManager;