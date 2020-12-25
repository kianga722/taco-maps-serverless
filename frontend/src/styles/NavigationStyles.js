import styled from 'styled-components';

const NavigationStyles = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 10px;

    color: white;
    background:#0a3e91;
    z-index: 9999;

    .routing-destination {
        font-weight: 700;
    }

    #routing-end {
        display: flex;
        margin: 5px auto 0;
        padding: 5px 10px;

        border: 1px solid #8ee8db;
        border-radius: 4px;
        background:#8ee8db;
        color:black;
        font-size: 13px;
        cursor: pointer;
    }
`;

export default NavigationStyles;