import { useState, useEffect, useRef, useContext } from 'react';

import { MapContext } from '../contexts/MapContext';

import HeaderStyles from '../styles/HeaderStyles';

const Header = () => {
    const { 
        setAllBusinesses,
        setFoodTruckGroup,
        setFoodStandGroup,
        setDrinkGroup,
        setDeliGroup,
        setRegularGroup,
        setAllCategories,
    } = useContext(MapContext);
    
    const [dropdownShow, setDropdownShow] = useState(false)

    const nodeDropdown = useRef();
    
    function handleClick(e) {
        if (e.target.id === 'reset') {
            return;
        }
        if (nodeDropdown.current && nodeDropdown.current.contains(e.target)) {
            // inside click
            return;
        }
        
        // outside click
        setDropdownShow(false);
    }

    function handleReset() {
        setAllBusinesses({})
        setFoodTruckGroup([])
        setFoodStandGroup([])
        setDrinkGroup([])
        setDeliGroup([])
        setRegularGroup([])

        setAllCategories([])

        window.sessionStorage.removeItem('tacoPlaces');
        setDropdownShow(false);
    }

    // Handle dropdown mouse clicks
    useEffect(() => {
        // add when mounted
        document.addEventListener('mousedown', handleClick);
        // return function to be called when unmounted
        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <HeaderStyles>
            <div className='dropdown-wrapper'>
                <button 
                    className='dropdown-trigger'
                    onClick={() => setDropdownShow(!dropdownShow)}
                    ref={nodeDropdown}
                > 
                    &#9881;
                </button>
                {
                    dropdownShow &&
                    <ul 
                        className='dropdown-menu'
                    >
                        <li>
                            <button 
                            id='reset'
                            onClick={handleReset}
                            > 
                                Reset Search
                            </button>
                        </li>
                    </ul>
                }
            </div>
            <div className='title'>
                <span>Tac</span><span>&#10061;</span><span>Maps</span> 
            </div>
        </HeaderStyles>
    )
}

export default Header;