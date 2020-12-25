import { useContext} from 'react';
import { LayersControl, LayerGroup } from "react-leaflet";
import MapMarker from './MapMarker';

import { MapContext } from '../contexts/MapContext';

const MapLayerOverlay = ({
    name,
    group,
    icon,
}) => {
    const { 
        allBusinesses, 
        filters,
    } = useContext(MapContext);

    return (
        <LayersControl.Overlay checked name={name}>
            <LayerGroup>
            {
                group.map(id => {
                    if (!allBusinesses[id]) {
                        return null
                    }

                    if (filters.lowPrice) {
                        if (allBusinesses[id].price !== '$') {
                            return null
                        }
                    }
                    if (filters.highRating) {
                        if (allBusinesses[id].rating < 4) {
                            return null
                        }
                    }
                    if (filters.highReviewCount) {
                        if (allBusinesses[id].review_count < 50) {
                            return null
                        }
                    }

                    return (            
                        <MapMarker
                            key={id}
                            id={id}
                            business={allBusinesses[id]}
                            icon={icon}
                        />
                    )
                })
            }
            </LayerGroup>
        </LayersControl.Overlay>
    )
}

export default MapLayerOverlay;