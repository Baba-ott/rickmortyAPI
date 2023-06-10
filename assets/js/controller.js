const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.get('/fetchCharacters', async (req, res) => {
    let { name, status, species, type, gender } = req.query;

    let url = 'https://rickandmortyapi.com/api/character/?';

    if (name) url += `name=${encodeURIComponent(name)}&`;
    if (status) url += `status=${encodeURIComponent(status)}&`;
    if (species) url += `species=${encodeURIComponent(species)}&`;
    if (type) url += `type=${encodeURIComponent(type)}&`;
    if (gender) url += `gender=${encodeURIComponent(gender)}`;

    url = url.slice(0, -1); // to remove the trailing '&'

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        res.render('characters', { characters: data.results });
    } catch (e) {
        res.send(`An error occurred: ${e.message}`);
    }
});

app.get('/search', (req, res) => {
    res.render('search');
});

app.listen(3000, () => console.log('Server running on port 3000'));
