import styled from 'styled-components';

const MapButtonsStyles = styled.div`
    position: absolute;
    margin: 85px 0 0 10px;

    button {
        padding: 0;

        .custom-button-content {
            display: flex;
            justify-content: center;
            align-items: center;
            min-width: 30px;
            min-height: 30px;
    
            color: black;
            background: white;
            z-index: 999;
            cursor: pointer;                     
        }

        &:hover {
            .custom-button-content {
                background-color: #f4f4f4;
            }
            
        }
        
        &.active {
            .custom-button-content {
                background-color: #acd7ac;
            }
        }

        &:nth-of-type(n+2) {
            margin-top: 10px;
        }   

        &#button-user {
            font-size: 18px;
        }

        &#button-rating,
        &#button-review {
            .custom-button-content {
                padding: 0 8px;
            }
        }
    }
   
`;

export default MapButtonsStyles;