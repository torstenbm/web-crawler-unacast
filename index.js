const express = require('express')
const app = express()
const port = 3000
const axios = require('axios');
const cheerio = require('cheerio');
const uuidv1 = require('uuid/v1');
const urlRegex = require('url-regex');

app.use(express.json());

// In memory DB for scalability and security
const DATABASE = {};

const writeCrawlResultToDB = response => {
    const ID = uuidv1();
    const $ = cheerio.load(response.data);
    DATABASE[ID] = {
        "title": $('title').text(),
        "date": new Date().toString(),
        "url": response.config.url,
        "contents": response.data
    }
    return ID
}

app.post('/schedule', (req, res) => {
    const URL = req.body.URL;
    
    if (!urlRegex().test(URL)){
        res.send({"error": "invalid URL"});
    }
    else {
        axios.get(URL)
            .then(writeCrawlResultToDB)
            .then(ID => res.send({"id": ID}))
            .catch(console.log);
    }
})

app.get('/pages/:webPageId', (req, res) => {
    const ID = req.params.webPageId;

    if (!(ID in DATABASE)) {
        res.send({"error": "page not found in database"});
    }
    else {
        const resultObj = DATABASE[req.params.webPageId];
        res.send(resultObj);
    }
})

app.listen(port, () => console.log(`Crawler running on port ${port}!`))