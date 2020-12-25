import styled from 'styled-components';

const AddressCopyStyles = styled.div`
    position: fixed;
    padding: 5px 10px;

    z-index: 999;
    color: white;
    background: #352e2e;
    font-size: 14px;
    border-radius: 4px;
    opacity: 1;
    transition: all 0s ease-in-out;

    &.hide {
        z-index: 1;
        opacity: 0;
        transition: all 1s ease-in-out;
    }
`;

export default AddressCopyStyles;