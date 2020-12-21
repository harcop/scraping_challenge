const express = require('express');
const { findQuote, findAuthor } = require('./function');

const createService = () => {
    const app = express();

    app.get('/quotes', async (req, res) => {
        const { author, tag } = req.query;
        let response = []
        if (author) {
            response = await findQuote({ _author: author })
        } 
        else if (tag) {
            response = await findQuote({ _tag: tag })
        } 
        if (!author && !tag) {
            response = await findQuote({})
        }
        res.status(200).json({
            data: response
        })
    })

    app.get('/authors', async (req, res) => {
        const { name } = req.query;
        console.log(name);
        const response = await findAuthor(name)
        res.status(200).json({
            data: response
        })
    })
    return app;
}

module.exports = {
    createService
}