const router = require('express').Router();
const axios = require('axios');

router.get('/autocomplete', async (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({error: 'Input query parameter is required'});
    }

    try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/place/autocomplete/json', {
            params: {
                input: query,
                key: process.env.GOOGLE_API_KEY
            }
        }).catch(err => {
            return res.json('Error fetching axios Google Places API', err);
        });

        return res.json(response.data);

    } catch(error) {
        console.error('Error fetching from Google Places API:', error);
        res.status(500).json({error: 'Failed to fetch data from Google Places API'});
    }
});

router.get('/coordinates', async (req, res) => {
    const {placeId} = req.query;

    if (!placeId) {
        return res.status(400).json({error: 'PlaceId is required'});
    }

    try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
            params: {
                place_id: placeId,
                key: process.env.GOOGLE_API_KEY
            }
        }).catch(err => {
            return res.json('Error fetching axios Google Maps Coordinates API', err);
        });

        return res.json(response.data);

    } catch (error) {
        console.error('Error fetching axios from Google Maps Coordinates API', error);
        res.status(500).json({error: 'Failed to fetch data from Google Maps Coordinates API'});
    }
})

module.exports = router;