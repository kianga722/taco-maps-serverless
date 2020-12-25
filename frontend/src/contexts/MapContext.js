import { createContext, useContext, useState } from 'react';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import truck from '../img/truck.png';
import foodstand from '../img/foodstand.png';
import drink from '../img/drink.png';
import deli from '../img/deli.png';
import taco from '../img/taco.png';
import yelpLogo from '../img/yelp/yelp_logo.png';
import small_0 from '../img/yelp/small_0.png';
import small_1 from '../img/yelp/small_1.png';
import small_1_half from '../img/yelp/small_1_half.png';
import small_2 from '../img/yelp/small_2.png';
import small_2_half from '../img/yelp/small_2_half.png';
import small_3 from '../img/yelp/small_3.png';
import small_3_half from '../img/yelp/small_3_half.png';
import small_4 from '../img/yelp/small_4.png';
import small_4_half from '../img/yelp/small_4_half.png';
import small_5 from '../img/yelp/small_5.png';

import { LoadingContext } from './LoadingContext';
import { ModalContext } from './ModalContext';

export const MapContext = createContext();

const mapboxToken = '';
const mapboxURL = `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${mapboxToken}`;
const yelpURL = '/.netlify/functions/yelp';

const MapContextProvider = (props) => {

    const DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow,
        iconSize:     [25, 41], 
        iconAnchor:   [12, 40],
        popupAnchor:  [-3, -32]
    });

    const truckIcon = L.icon({
        iconUrl: truck,
        iconSize:     [32, 32], 
        iconAnchor:   [16, 31], 
        popupAnchor:  [-3, -22]
    });
    const foodstandIcon = L.icon({
        iconUrl: foodstand,
        iconSize:     [32, 32], 
        iconAnchor:   [16, 31], 
        popupAnchor:  [-3, -22]
    });
    const drinkIcon = L.icon({
        iconUrl: drink,
        iconSize:     [32, 32], 
        iconAnchor:   [16, 31], 
        popupAnchor:  [-3, -22]
    });
    const deliIcon = L.icon({
        iconUrl: deli,
        iconSize:     [32, 32], 
        iconAnchor:   [16, 31], 
        popupAnchor:  [-3, -22]
    });
    const tacoIcon = L.icon({
        iconUrl: taco,
        iconSize:     [32, 32], 
        iconAnchor:   [16, 31], 
        popupAnchor:  [-3, -22]
    });

    // Need to define marker here or else it will not show for some reason
    L.Marker.prototype.options.icon = DefaultIcon;

    // import from other Contexts
    const { setLoading } = useContext(LoadingContext);
    const { setModal } = useContext(ModalContext);

    const [userCoords, setUserCoords] = useState(null);

    let [allBusinesses, setAllBusinesses] = useState({});
    let [foodTruckGroup, setFoodTruckGroup] = useState([]);
    let [foodStandGroup, setFoodStandGroup] = useState([]);
    let [drinkGroup, setDrinkGroup] = useState([]);
    let [deliGroup, setDeliGroup] = useState([]);
    let [regularGroup, setRegularGroup] = useState([]);

    let [allCategories, setAllCategories] = useState([]);

    const [currentBusiness, setCurrentBusiness] = useState(null)

    let [addressCopy, setAddressCopy] = useState(false);
    let [copyPosition, setCopyPosition] = useState([]);
    let [copyFade, setCopyFade] = useState(false);

    let [isPopupOpen, setIsPopupOpen] = useState(false);

    let [filters, setFilters] = useState({
        lowPrice: false,
        highRating: false,
        highReviewCount: false,
    });

    let [positionClicked, setPositionClicked] = useState(null);

    let [routeInitCoords, setRouteInitCoords] = useState([]);
    let [routeBusiness, setRouteBusiness] = useState(null);
    let [currentRoute, setCurrentRoute] = useState(null);

    function geoSuccess(position) {
        console.log('position', position)
        setUserCoords([position.coords.latitude, position.coords.longitude])
        setLoading(false)
    }

    function geoError(error) {
        console.log('geoerror', error)
        if (error.code === 1 && error.message === 'User denied geolocation prompt') {
        setLoading(false)
        }
    }

    function geoInit() {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(geoSuccess, geoError);
        }
    }

    function makeGroups(businesses) {
        const hasDrinksTest = [
            'bars', 
            'beer_and_wine',
            'beerbar',
            'beergardens',
            'cocktailbars', 
            'gastropubs',
            'irish_pubs',
            'pubs',
            'sportsbars', 
            'tikibars',
            'wine_bars'
        ];
        const updatedFoodTruckGroup = [...foodTruckGroup];
        const updatedFoodStandGroup = [...foodStandGroup];
        const updatedDrinkGroup = [...drinkGroup];
        const updatedDeliGroup = [...deliGroup];
        const updatedRegularGroup = [...regularGroup];

        const updatedCategories = [...allCategories];

        const allIds = Object.keys(businesses);
        for (let id of allIds) {
            const { categories } = businesses[id];
            let isFoodtruck = false;
            let isFoodstand = false;
            let hasDrinks = false;
            let isDeli = false;

            for (let cat of categories) {
                // See what categories are out there
                if ( updatedCategories.indexOf(cat.alias) === -1) {
                    updatedCategories.push(cat.alias)
                }

                // Place into groups depending on category
                if (cat.alias === 'foodtrucks') {
                    isFoodtruck = true;
                    if (updatedFoodTruckGroup.indexOf(id) === -1) {
                        updatedFoodTruckGroup.push(id);
                    }
                } else if (cat.alias === 'foodstands') {
                    isFoodstand = true;
                    if (updatedFoodStandGroup.indexOf(id) === -1) {
                        updatedFoodStandGroup.push(id);
                    }
                } else if (!hasDrinks && hasDrinksTest.includes(cat.alias)) {
                    hasDrinks = true;
                    if (updatedDrinkGroup.indexOf(id) === -1) {
                        updatedDrinkGroup.push(id);
                    }
                } else if (cat.alias === 'delis') {
                    isDeli = true;
                    if (updatedDeliGroup.indexOf(id) === -1) {
                        updatedDeliGroup.push(id);
                    }
                }
            }

            // If no categories match, place in default
            if (!isFoodtruck && !isFoodstand && !hasDrinks && !isDeli) {
                if (updatedRegularGroup.indexOf(id) === -1) {
                    updatedRegularGroup.push(id)
                }
            }
        }

        setFoodTruckGroup(updatedFoodTruckGroup)
        setFoodStandGroup(updatedFoodStandGroup)
        setDrinkGroup(updatedDrinkGroup)
        setDeliGroup(updatedDeliGroup)
        setRegularGroup(updatedRegularGroup)

        setAllCategories(updatedCategories)
    }

    async function fetchData(coords, storageData) {
        try {
            const response = await fetch(yelpURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    lat: coords[0],
                    lng: coords[1]
                })
            });
            const responseJSON = await response.json()

            let allBusinessesCopy;
            if (storageData) {
                allBusinessesCopy = {...storageData}
            } else {
                allBusinessesCopy = {...allBusinesses}
            }

            for (let id of Object.keys(responseJSON)) {
                if (!allBusinessesCopy[id]) {
                    allBusinessesCopy[id] = responseJSON[id];
                }
            }

            setAllBusinesses(allBusinessesCopy);
            window.sessionStorage.setItem('tacoPlaces', JSON.stringify(allBusinessesCopy));

            // Place businesses into groups
            makeGroups(allBusinessesCopy)
            
        } catch(err) {
            console.log(err)
        }
    }

    function setInitialData() {
        // Check data from sessionStorage
        const tacoStorage = window.sessionStorage.getItem('tacoPlaces');
        let tacoStorageParsed;
        if (tacoStorage) {
            tacoStorageParsed = JSON.parse(tacoStorage)
            fetchData(userCoords, tacoStorageParsed);
        } else {
            fetchData(userCoords)
        }
    }

    function handleButtonFilter(option) {
        const newFilters = {...filters};
        newFilters[option] = !filters[option];
        setFilters(newFilters);
    }

    function handleRouting(business) {
        setRouteInitCoords(userCoords);
        setRouteBusiness(business);
        setModal(false);
    }

    return (
        <MapContext.Provider value={{ 
            truckIcon,
            foodstandIcon,
            drinkIcon,
            deliIcon,
            tacoIcon,
            yelpLogo,
            small_0,
            small_1,
            small_1_half,
            small_2,
            small_2_half,
            small_3,
            small_3_half,
            small_4,
            small_4_half,
            small_5,
            userCoords, setUserCoords,
            allBusinesses, setAllBusinesses,
            foodTruckGroup, setFoodTruckGroup,
            foodStandGroup, setFoodStandGroup,
            drinkGroup, setDrinkGroup,
            deliGroup, setDeliGroup,
            regularGroup, setRegularGroup,
            allCategories, setAllCategories,
            currentBusiness, setCurrentBusiness,
            addressCopy, setAddressCopy,
            copyPosition, setCopyPosition,
            copyFade, setCopyFade,
            isPopupOpen, setIsPopupOpen,
            filters, setFilters,
            positionClicked, setPositionClicked,
            routeInitCoords, setRouteInitCoords,
            routeBusiness, setRouteBusiness,
            currentRoute, setCurrentRoute,
            geoInit,
            mapboxToken,
            mapboxURL,
            fetchData,
            setInitialData,
            handleButtonFilter,
            handleRouting,
        }}>
            {props.children}
        </MapContext.Provider>
    )
}


export default MapContextProvider;