const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const path = require('path');
const fs = require('fs');

app.use(cors()); // Enable CORS for all routes

// Route to send the HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route to fetch and send the country data 
app.get('/countries', (req, res) => {
    const countryFilePath = path.join(__dirname, 'data/country.json');

    fs.readFile(countryFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading country.json file:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        try {
            const countries = JSON.parse(data);
            res.json(countries);
        } catch (jsonError) {
            console.error('Error parsing JSON:', jsonError);
            res.status(500).send('Internal Server Error');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
