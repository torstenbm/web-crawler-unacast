# Node.js web crawler

This Node.js web crawler was made as part of the 2019 Unacast Software Engineer Work Sample.

## Installation

Use the package managers [npm](https://www.npmjs.com/) 

```bash
npm i
```
or [yarn](https://www.npmjs.com/) 

```bash
yarn
```
before running the crawler to install the necessary dependencies.

## Starting the server

Start the server by running  
```bash
node index.js
```

By default the server will start on port 3000, however, this can be configured from inside of index.js.

## Scheduling URL's to crawl
To schedule the crawling of a URL, send a POST request using either CURL or [postman](https://www.getpostman.com/) to the endpoint `/schedule`, specifying `Content-Type: application/json` and the body
```json
{
    "url": URL_TO_BE_CRAWLED
}
```
If provided with a valid URL, the response will be of the form 
```json
{
    "id": SOME_UUID1
}
```
where the value of `id` is used to retrieve the result of the result of the crawl from the crawler's other endpoint.


## Retrieving crawl results
To retrieve the result of a page crawl, send a GET request to the endpoint `/pages/{ID}` where ID is the value obtained when the crawl was scheduled.

## License
[MIT](https://choosealicense.com/licenses/mit/)