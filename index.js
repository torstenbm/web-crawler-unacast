const express = require('express')
const app = express()
const port = 3000
const axios = require('axios');
const cheerio = require('cheerio');
const uuidv1 = require('uuid/v1');

app.use(express.json());

app.get('/', (req, res) => res.send('Hello World!'))

// In memory DB for scalability and security
const DATABASE = {};

app.get('/contents/:webPageId', (req, res) => {
    let resultObj = DATABASE[req.params.webPageId];
    res.send(resultObj);
})

app.post('/schedule', (req, res) => {
    const URL = req.body.URL;
    axios.get(URL)
        .then(response => {
            const ID = uuidv1();
            const $ = cheerio.load(response.data);

            DATABASE[ID] = {
                "title": $('title').text(),
                "date": new Date().toString(),
                "url": URL,
                "contents": response.data
            }

            res.send({"id": ID});
        })
        .catch(console.log);
}) 

app.listen(port, () => console.log(`Example app listening on port ${port}!`))