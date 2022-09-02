import React, { useState, useContext } from 'react';
import L from 'leaflet';
import { Marker, Popup } from "react-leaflet";

import { ModalContext } from '../contexts/ModalContext';
import { MapContext } from '../contexts/MapContext';

import MapMarkerStyles from '../styles/MapMarkerStyles';

const MapMarker = ({
    id,
    business,
    icon,
}) => {
    const { setModal } = useContext(ModalContext);
    const { 
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
        userCoords,
        allBusinesses, setAllBusinesses,
        setCurrentBusiness,
        setAddressCopy,
        setCopyPosition,
        setCopyFade,
    } = useContext(MapContext);

    let [menuUrl, setMenuUrl] = useState(null);

    const zomatoURL = '/.netlify/functions/zomato';
    const POPUP_MIN_WIDTH = 220; 
    const ratingImgMap = {
        0: small_0,
        1: small_1,
        1.5: small_1_half,
        2: small_2,
        2.5: small_2_half,
        3: small_3,
        3.5: small_3_half,
        4: small_4,
        4.5: small_4_half,
        5: small_5,
    }
   
    const position = [business.coordinates.latitude, business.coordinates.longitude];
    const distanceMeters = L.latLng(userCoords).distanceTo(position)
    const distanceMiles = (distanceMeters * 0.00062137119223733).toFixed(1);

    const ratingStars = ratingImgMap[business.rating];

    const priceDisplay = business.price ? business.price : 'No $ info';

    // Get today's day
    const today = new Date();
    const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'long'}).format(today);

    async function handleMarkerClick() {
        if (menuUrl) {
            return;
        }

        const restaurantObj = {
            latitude: business.coordinates.latitude,
            longitude: business.coordinates.longitude,
            name: business.name
        }
    
        try {
            const response = await fetch(zomatoURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(restaurantObj)
            });

            const responseJSON = await response.json()
            setMenuUrl(responseJSON.menuUrl)

            setCurrentBusiness({
                business,
                ratingStars,
                priceDisplay,
                distanceMiles,
                menuUrl: responseJSON.menuUrl
            })

            const updatedAllBusinesses = {...allBusinesses}
            updatedAllBusinesses[id].menuUrl = menuUrl;
            setAllBusinesses(updatedAllBusinesses);
            window.sessionStorage.setItem('tacoPlaces', JSON.stringify(updatedAllBusinesses));
        } catch(err) {
            alert(err)
        }
        
    }

    function handleMore() {
        setCurrentBusiness({
            business,
            ratingStars,
            priceDisplay,
            distanceMiles,
            menuUrl
        })
        setModal(true)
    }

    async function copyAddress(event, formatted_address) {
        if (!navigator.clipboard) {
            return;
        }
    
        const {clientX, clientY} = event; 
        const addressFormat = formatted_address.join(', ')
        
        try {
            await navigator.clipboard.writeText(addressFormat);
            setCopyPosition([clientX, clientY])
            setAddressCopy(true);
            
            setTimeout(() => {
                setCopyFade(true) 
                setTimeout(() => {
                    setAddressCopy(false);
                    setCopyFade(false) 
                }, 1000)
            }, 1000)
        } catch (error) {
            console.error("Copy failed", error);
        }
    }

    return (

            <Marker 
                position={position}
                icon={icon}
                eventHandlers={{
                    click: handleMarkerClick,
                }}
            >
                <Popup
                    className='popup-restaurant'
                    minWidth={POPUP_MIN_WIDTH}
                >
                    <MapMarkerStyles>
                        <div className='popup-info-wrapper'>
                            <div 
                                className='bg-image'
                                style={{
                                    backgroundImage: `url(${business.image_url})`
                                }}
                            ></div>
                
                            <div className='top-info-wrapper'>
                                <div className='name'>{business.name}</div>
                                <div className='distance'>{distanceMiles} mi away</div>
                                <img src={ratingStars} alt={`${business.rating} stars`} />
                                <div className='review-count'>{business.review_count} reviews</div>
                                <div className='price'>{priceDisplay}</div>
                            </div>
                
                            <div className='external-links'>
                                <a className='link-url' href={business.url} target='_blank' rel='noopener noreferrer'>
                                    <img src={yelpLogo} alt={`link to ${business.name} Yelp page`} />
                                </a>
                                {
                                    !menuUrl &&
                                    <div className='loading-menu'>
                                        <div className="lds-dual-ring"></div>
                                    </div>
                                }
                                {
                                    menuUrl && menuUrl !== 'none' &&
                                    <a className='link-menu' href={menuUrl} target='_blank' rel='noopener noreferrer'>Menu (Zomato)</a>
                                }
                            </div>
                
                            <div className='bottom-info-wrapper'>
                                <div className='hours-wrapper'>
                                    <div className='hours-title'>Hours today:</div> 
                                    <div className='hours-today'>{business.formatted_hours[weekday]}</div>
                                </div>
                                {
                                    business.phone &&
                                    <div className='tel-wrapper'>
                                        <span className='tel-title'>Tel: </span> 
                                        <span className='tel-number'>{business.phone}</span>
                                    </div>
                                }
                                
                            </div>
                        </div>
                        <div 
                            className='address-wrapper'
                            onClick={(event) => copyAddress(event, business.formatted_address)}
                        >
                            {
                                business.formatted_address &&
                                business.formatted_address.map((line, index) => (
                                    <div key={`${business.name} - ${index}`}>
                                        {line}
                                    </div>
                                ))
                            }
                        </div>
                        <button 
                            onClick={handleMore}
                        >
                            More Details
                        </button>
                    </MapMarkerStyles>
                </Popup>
            </Marker>
    )
}

export default MapMarker;