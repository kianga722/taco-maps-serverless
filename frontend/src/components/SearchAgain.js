import { useContext } from 'react';
import { useMapEvents, Popup } from "react-leaflet";

import { LoadingContext } from '../contexts/LoadingContext';
import { MapContext } from '../contexts/MapContext';

import SearchAgainStyles from '../styles/SearchAgainStyles';

const SearchAgain = () => {
    const { setLoading } = useContext(LoadingContext);
    const { 
        isPopupOpen,
        positionClicked, setPositionClicked,
        fetchData,
    } = useContext(MapContext);

    const map = useMapEvents({
        click(e) {
            const {lat, lng} = e.latlng;
            setPositionClicked([lat, lng])
        },
    })

    async function handleSearch() {
        setLoading(true)
        await fetchData(positionClicked)
        map.closePopup();
        setLoading(false)
    }

    return (positionClicked && isPopupOpen) ? 
        <Popup position={positionClicked}>
                <SearchAgainStyles>
                <div className='search-again-title'>Search again here?</div>
                <button 
                    onClick={handleSearch}
                >
                    Yes
                </button>
            </SearchAgainStyles>
        </Popup> : null
}

export default SearchAgain