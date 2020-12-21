const axios = require('axios');
const cheerio = require('cheerio');
var qq = [];
const authors = [];
const findQuote = async ({ _author= null, _tag=null }) => {
    let tt = '1111111111';
    for (let j in tt.split('')) {
        let i = j + 1;
        const response = await axios.get(`http://quotes.toscrape.com/page/${i}`);
        if (response.status === 200) { 
            const data = response.data;
            const $ = cheerio.load(data);
            const quote = $('.quote');
            quote.each(function () {
                const text = $(this).find('.text').text()
                const author = $(this).find('.author').text()
                const meta = $(this).find('meta').attr('content');
                const tags = meta.split(',')
                const _q = {
                    author,
                    text,
                    tags
                };
                if (author && author === _author) {
                    qq.push(_q)
                }
                if (_tag && tags.includes(_tag)) {
                    qq.push(_q)
                } 
                if (!_tag && !_author) {
                    qq.push(_q)
                }
            })
        }
        console.log(qq);
    }
    return qq;
}

const findAllAuthor = async ({ _author= null, _tag=null }) => {
    let tt = '1111111111';
    for (let j in tt.split('')) {
        let i = j + 1;
        const response = await axios.get(`http://quotes.toscrape.com/page/${i}`);
        if (response.status === 200) { 
            const data = response.data;
            const $ = cheerio.load(data);
            const quote = $('.quote');
            quote.each(function () {
                const author = $(this).find('.author').text();
                if (!authors.includes(author)) {
                    authors.push(author);
                }
            })
        }
    }
}

const findAuthor = async (_name) => {
    const response = []
    console.log('am here');
    if (_name) {
        const data = await findOneAuthor(_name);
        response.push(...data);
    } else {
        await findAllAuthor({});
        console.log('finder', authors);
        for (let author_name of authors) {
            let data = await findOneAuthor(author_name);
            response.push(...data);
        }
    }
    return response;
}

async function findOneAuthor (_name) {
    let author_name = _name.replace(/\.\s/gui, '-').replace(/\s/gui, '-').replace(/\./gui, '-').replace('é', 'e');
    console.log(author_name, 'namer');
    const _dd = [];
    const response = await axios.get(`http://quotes.toscrape.com/author/${author_name}`);
    if (response.status === 200) {
        const data = response.data;
        const $ = cheerio.load(data);
        const title = $('.author-title').text();
        const dob= $('.author-born-date').text();
        const location = $('.author-born-location').text();
        const desc = $('.author-description').text().trim().substring(0, 50);
        if (title) {
            _dd.push({
                name: title,
                biography: desc,
                birthdate: dob,
                location
            })
        }
    }
    return _dd;
}
module.exports = {
    findQuote,
    findAuthor
}
