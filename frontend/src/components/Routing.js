import { useEffect, useContext } from 'react';
import { useLeafletContext } from "@react-leaflet/core"
import L from "leaflet";
import "leaflet-routing-machine";

import { MapContext } from '../contexts/MapContext';

const Routing = () => {
    const {
        routeInitCoords, 
        routeBusiness,
        currentRoute, setCurrentRoute,
        mapboxToken,
    } = useContext(MapContext);

    const context = useLeafletContext();

    useEffect(() => {
        if (currentRoute) {
            context.map.removeControl(currentRoute);
        }

        if (routeBusiness) {
            const {latitude, longitude} = routeBusiness.coordinates;

            const newRoute = L.Routing.control({
                router: L.Routing.mapbox(mapboxToken),
                units: 'imperial',
                waypoints: [
                    L.latLng(routeInitCoords[0], routeInitCoords[1]),
                    L.latLng(latitude, longitude)
                ]
            }).addTo(context.map);

            setCurrentRoute(newRoute)
            context.map.closePopup();
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [routeBusiness]);


    return null
}

export default Routing;