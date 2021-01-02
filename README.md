# taco-maps-serverless

Displays nearby taco spots using Leaflet, Mapbox, Yelp, and Zomato APIs

[View App](https://taco.fyi)

[Original implementation](https://github.com/kianga722/taco-maps) with Node server and plain HTML, CSS, JS

![screenshot](https://github.com/kianga722/taco-maps-serverless/blob/master/screenshot.png)

## Summary

- Built using React and Netlify serverless functions
- Utilizing Leaflet, Mapbox, Yelp, and Zomato APIs
- App displays nearby taco spots based on your current location
- Ability to filter by price, rating, review count and other categories (based on Yelp categories)
- Can re-search in different locations
- Saves already found places in session storage

## Future Improvements

- Find better way to include menu data (Zomato seems to have stopped supporting USA)
- Add test coverage
- Improve navigation feature

## Limitations

- Yelp Categories (Food Trucks, Drinks, etc) not totally accurate. Examples: Some normal places can have drinks but are not tagged as such. Some places are more like a Food Stand than a restaurant but are not tagged as such
- Map popups cannot overlay the map buttons (design choice)
- For converting to mobile, Leaflet does not have a React Native implementation so must seek other Map APIs like Mapbox if want to use RN
