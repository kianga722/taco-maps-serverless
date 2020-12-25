import { useEffect, useRef, useContext } from 'react';
import { useMap } from "react-leaflet";
import L from "leaflet";

import { MapContext } from '../contexts/MapContext';

import MapButtonsStyles from '../styles/MapButtonsStyles';

const MapButtons = () => {
    const { 
        userCoords,
        filters, 
        handleButtonFilter,
    } = useContext(MapContext);

    const map = useMap();

    const nodeButtonUser = useRef();
    const nodeButtonPrice = useRef();
    const nodeButtonRating = useRef();
    const nodeButtonReview = useRef();

    function handleButtonUser() {
        map.setView(userCoords);
    }

    // Prevent map clicks when clicking on custom buttons
    useEffect(() => {
        L.DomEvent.disableClickPropagation(nodeButtonUser.current);
        L.DomEvent.disableClickPropagation(nodeButtonPrice.current);
        L.DomEvent.disableClickPropagation(nodeButtonRating.current);
        L.DomEvent.disableClickPropagation(nodeButtonReview.current);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <MapButtonsStyles>
            <button 
                id='button-user' 
                className='leaflet-bar leaflet-control'
                onClick={handleButtonUser}
                ref={nodeButtonUser}
            >
               <div className='custom-button-content'>⌖</div>
            </button>

            <button 
                id='button-price' 
                className={`leaflet-bar leaflet-control ${filters.lowPrice ? 'active':null}`}
                onClick={() => handleButtonFilter('lowPrice')}
                ref={nodeButtonPrice}
            >
                <div className='custom-button-content'>$</div>
            </button>

            <button 
                id='button-rating' 
                className={`leaflet-bar leaflet-control ${filters.highRating ? 'active':null}`}
                onClick={() => handleButtonFilter('highRating')}
                ref={nodeButtonRating}
            >
                <div className='custom-button-content'>★4+</div>
            </button>

            <button 
                id='button-review' 
                className={`leaflet-bar leaflet-control ${filters.highReviewCount ? 'active':null}`}
                onClick={() => handleButtonFilter('highReviewCount')}
                ref={nodeButtonReview}
            >
                <div className='custom-button-content'>✎50+</div>
            </button>
        </MapButtonsStyles>
    )
}

export default MapButtons