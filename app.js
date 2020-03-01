const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('common'));

const games = require('./google-games.js')

app.get('/games', (req, res) => {
    const { search = "" } = req.query;

    let results = games
        .filter(games =>
            games
                .App
            );

    res.json(results);
})
app.listen(8000, () =>  {
    console.log('Server started on PORT 8000');
});
