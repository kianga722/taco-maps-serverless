import styled from 'styled-components';

const MapStyles = styled.div`
    .leaflet-container {
        width: 100%;
        min-height: 80vh;
        height: 100%;
    }
    .leaflet-popup-content {
        line-height: 1.3;
    }
    .leaflet-control-layers-overlays {
        display: grid;
        grid-template-areas:
            '.'
            '.'
            '.'
            '.'
            '.'
            'user';
    }
    .leaflet-control-layers-overlays label:nth-of-type(1) {
        grid-area: user;
    }    
`;

export default MapStyles;