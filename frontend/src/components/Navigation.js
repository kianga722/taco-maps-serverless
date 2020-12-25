import { useContext } from 'react';

import { MapContext } from '../contexts/MapContext';

import NavigationStyles from '../styles/NavigationStyles';

const Navigation = () => {
    const { routeBusiness, setRouteBusiness } = useContext(MapContext);

    return (
        <NavigationStyles>
            <div className='routing-title'>
                <span>
                    Routing to:&nbsp;
                </span>
                <span className='routing-destination'>
                    {routeBusiness.name}
                </span>
            </div>
            <button 
                id='routing-end'
                onClick={() => setRouteBusiness(null)}
            >
                End Navigation
            </button>
        </NavigationStyles>
    )
}

export default Navigation;