require('dotenv').config();
const axios = require('axios');
// Yelp API Key
const yelpKey = process.env.YELP_KEY;

// Yelp weekday mapping
const dayMap = {
    0: 'Monday',
    1: 'Tuesday',
    2: 'Wednesday',
    3: 'Thursday',
    4: 'Friday',
    5: 'Saturday',
    6: 'Sunday',
}

// Convert hours from 2400 format to 12-hour AM/PM format
function formatTime(rawHours) {
    const hoursNum = parseInt(rawHours);
    let hours = Math.floor(hoursNum / 100); // 0 - 24
    let minutes = hoursNum - (hours*100); // 0 - 59
    if (hours > 12) {
        hours -= 12;
    }
    if (hours === 0) {
        hours = 12;
    }
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    return `${hours}:${minutes} ${hoursNum > 1159 ? 'PM' : 'AM'}`;
}

function formatOpenHours(hoursArr) {
    const finalHours = {}
    for (let day of hoursArr) {
        finalHours[dayMap[day.day]] = `${formatTime(day.start)} - ${formatTime(day.end)} `
    }

    return finalHours;
}

exports.handler = async function(event, context) {
    if (event.httpMethod === 'OPTIONS') {
        // To enable CORS
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
        };
        return {
            statusCode: 200, // <-- Must be 200 otherwise pre-flight call fails
            headers,
            body: 'This was a preflight call!'
        };
    } else {
        if (event.body) {
            const { lat, lng } = JSON.parse(event.body);

            const query = `
            query {
                search(term: "tacos",
                    latitude: ${lat},
                    longitude: ${lng},
                    limit: 50,
                    open_now: true) {
                    total
                    business {
                        id
                        coordinates {
                            latitude
                            longitude
                        }
                        name
                        rating
                        price
                        review_count
                        photos
                        categories {
                            alias
                        }
                        location {
                            formatted_address
                        }
                        phone
                        url
                        hours {
                            hours_type
                            is_open_now
                            open {
                                day
                                start
                                end
                                is_overnight
                            }
                        }
                    }
                }
            }
            `;
        
            const yelpOptions = {
                url: 'https://api.yelp.com/v3/graphql',
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${yelpKey}`,
                },
                data: { query }
            };
        
            try {
                const response = await axios(yelpOptions)
        
                const businesses = {};
        
                // Add custom fields
                for (let business of response.data.data.search.business) {
                    businesses[business.id] = business;
                    const hoursArr = business.hours[0].open;
                    businesses[business.id].formatted_hours = formatOpenHours(hoursArr);
                    businesses[business.id].categoriesString = business.categories.map(cat => {
                        return cat.alias
                    }).toString();

                    businesses[business.id].formatted_address = business.location.formatted_address ? business.location.formatted_address.split('\n') : null;
                    
                    businesses[business.id].image_url = business.photos[0];
                    business.show = true;
               }
           
               return {
                 statusCode: 200,
                 headers: {
                    'Access-Control-Allow-Origin': '*',
                    "Content-Type": "application/json",
                 },
                 body: JSON.stringify(businesses)
               };
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
        return {
            statusCode: 500,
            body: 'unrecognized HTTP Method'
        };
    }
}