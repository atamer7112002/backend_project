const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const apiKey = process.env.GOOGLE_MAPS_API_KEY;

const googleMapsClient = require('@google/maps').createClient({
    key: apiKey 
});

const app = express();
const port = 8000;

app.get('/ge-coding', (req, res) => {
    const address = 'Ismailia, Egypt'; 

    googleMapsClient.geocode({ address }, (err, response) => {
        if (err) {
            console.error('Geocoding error:', err);
            res.status(500).json({ error: 'Geocoding failed' });
        } else {
            console.log(response.json.results);
            res.json(response.json.results);
        }
    });
});

app.get('/restaurants', async (req, res) => {
    try {
        const borough = 'IsmailiaStadium'
        const city = 'Ismailia'; 
        const category = 'restaurants';
        const nearTo = 'Soltan Huissen'; 
        const { data } = await axios.get(
            `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${nearTo}+${city}+${category}+${borough}&type=restaurants&key=${apiKey}`
        );
        res.json(data);
    } catch (err) {
        console.error('Error fetching restaurants:', err);
        res.status(500).json({ error: 'Error fetching restaurants' });
        next(err)
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
