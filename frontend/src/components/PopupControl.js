import { useContext } from 'react';
import { useMapEvents } from "react-leaflet";

import { MapContext } from '../contexts/MapContext';

const PopupControl = () => {
    const {
        isPopupOpen, setIsPopupOpen,
        currentRoute,
    } = useContext(MapContext);

    const map = useMapEvents({
        click(e) {
            if (isPopupOpen) {
                map.closePopup();
                setIsPopupOpen(false)
            } else {
                setIsPopupOpen(true)
            }
            if (window.screen.width < 700 && currentRoute) {
                currentRoute.hide()
            }
        }
    })
    return null
}

export default PopupControl;