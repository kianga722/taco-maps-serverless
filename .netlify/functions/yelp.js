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

        // Add custom fields
        for (let business of response.data.data.search.business) {
           const hoursArr = business.hours[0].open;
           business.formatted_hours = formatOpenHours(hoursArr);
           business.categoriesString = business.categories.map(cat => {
               return cat.alias
           }).toString();
           business.formatted_address = business.location.formatted_address.split('\n')
           business.image_url = business.photos[0];
       }
   
       return {
         statusCode: 200,
         headers: {
           "Content-Type": "application/json"
         },
         body: JSON.stringify(response.data)
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