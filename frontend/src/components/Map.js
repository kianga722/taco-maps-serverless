import { useEffect, useContext} from 'react';
import { MapContainer, Marker, TileLayer, Circle, LayersControl, LayerGroup } from "react-leaflet";
import MapLayerOverlay from './MapLayerOverlay';
import MapButtons from './MapButtons';
import SearchAgain from './SearchAgain';
import Routing from './Routing';
import PopupControl from './PopupControl';

import { MapContext } from '../contexts/MapContext';

import MapStyles from '../styles/MapStyles';

const Map = () => {
    const { 
        truckIcon,
        foodstandIcon,
        drinkIcon,
        deliIcon,
        tacoIcon,
        userCoords,
        foodTruckGroup, 
        foodStandGroup, 
        drinkGroup, 
        deliGroup, 
        regularGroup, 
        mapboxURL,
        setInitialData
    } = useContext(MapContext);

    useEffect(() => {
        setInitialData()
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    
    return (
        <MapStyles>
            <MapContainer center={userCoords} zoom={14}>
                <TileLayer
                    attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
                    url={mapboxURL}
                    id="mapbox/streets-v11"
                />
                <LayersControl position="topright">

                    {
                        foodTruckGroup.length > 0 && 
                        <MapLayerOverlay 
                            name={'Food Trucks'}
                            group={foodTruckGroup}
                            icon={truckIcon}
                        />
                    }

                    {
                        foodStandGroup.length > 0 && 
                        <MapLayerOverlay 
                            name={'Food Stands'}
                            group={foodStandGroup}
                            icon={foodstandIcon}
                        />
                    }

                    {
                        drinkGroup.length > 0 && 
                        <MapLayerOverlay 
                            name={'Drinks'}
                            group={drinkGroup}
                            icon={drinkIcon}
                        />
                    }

                    {
                        deliGroup.length > 0 && 
                        <MapLayerOverlay 
                            name={'Delis'}
                            group={deliGroup}
                            icon={deliIcon}
                        />
                    }

                    {
                        regularGroup.length > 0 && 
                        <MapLayerOverlay 
                            name={'Regular'}
                            group={regularGroup}
                            icon={tacoIcon}
                        />
                    }

                    <LayersControl.Overlay checked name="User">
                        <LayerGroup>
                            <Marker position={userCoords}>
                            </Marker>
                            <Circle
                                center={userCoords}
                                pathOptions={{ fillColor: 'blue' }}
                                radius={1609}
                            />
                        </LayerGroup>
                    </LayersControl.Overlay>

                </LayersControl>

                <MapButtons />
            
                <SearchAgain />   
    
                <Routing />

                <PopupControl />
                
            </MapContainer>
        </MapStyles>
    )
}

export default Map