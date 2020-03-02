const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(morgan('common'));

const games = require('./google-games.js')

app.get('/games', (req, res) => {
    const { search = "", sort } = req.query;

    if (sort) {
        if (!['App', 'Rating'].includes(sort)) {
            return res
                .status(400)
                .send('Sort must be either Title or Rating');
        }
    }

    let results = games
        .filter(games =>
            games
                .App
                .toLowerCase()
                .includes(search.toLowerCase())
    );

    if (sort) {
        results
        .sort((a, b) => {
            return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
        });
    }

    res.json(results);
});

app.listen(8000, () =>  {
    console.log('Server started on PORT 8000');
});
