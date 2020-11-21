require('dotenv').config();
const axios = require('axios');
// Yelp API Key
const zomatoKey = process.env.ZOMATO_KEY;

exports.handler = async function(event, context) {
    let menuUrl = null;
    console.log('event body', event.body)
    const { latitude, longitude, name } = JSON.parse(event.body);

    const zomatoOptions = {
        url: 'https://developers.zomato.com/api/v2.1/search',
        method: 'get',
        headers: {
            'user-key': `${zomatoKey}`
        },
        params: {
            lat: latitude,
            lon: longitude,
            q: name,
        },
    };

    try {
        const response = await axios(zomatoOptions)
        for (let restaurant of response.data.restaurants) {
            const nameTarget = name.toLowerCase().trim();
            const nameZomato = restaurant.restaurant.name.toLowerCase().trim();
            if (nameTarget === nameZomato) {
                menuUrl = restaurant.restaurant.menu_url;
            }
        }

        if (menuUrl) {
            return {
                statusCode: 200,
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({menuUrl})
            };
        } else {
            return {
                statusCode: 200,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({menuUrl: 'none'})
            };
        }
    } catch(err) {
        return {
            statusCode: 400,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(err)
        }
    }
}