import { useContext } from 'react';

import { MapContext } from '../contexts/MapContext'

import AddressCopyStyles from '../styles/AddressCopyStyles';

const AddressCopy = () => {
    const { 
        copyPosition,
        copyFade,
    } = useContext(MapContext);

    return (
        <AddressCopyStyles 
            style={{
                top: `${copyPosition[1]}px`,
                left: `${copyPosition[0]}px`
            }}
            className={copyFade ? 'hide' : null}
        >
            Copied address!
        </AddressCopyStyles>
    )
}

export default AddressCopy;