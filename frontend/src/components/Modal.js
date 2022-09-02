import { useEffect, useRef, useContext } from 'react';

import { ModalContext } from '../contexts/ModalContext';
import { MapContext } from '../contexts/MapContext';

import ModalStyles from '../styles/ModalStyles';

const Modal = () => {
    const { 
        setModal
    } = useContext(ModalContext);
    const { 
        yelpLogo,
        currentBusiness, 
        handleRouting,
    } = useContext(MapContext);

    const {
        business,
        ratingStars,
        priceDisplay,
        distanceMiles,
        menuUrl
    } = currentBusiness;

    const nodeModal = useRef();

    // Modal Handle Clicks
    function handleClick(e) {
        if (nodeModal.current && nodeModal.current.contains(e.target)) {
            // inside click
            return;
        }
        // outside click
        setModal(false);
    };

    // Handle modal mouse clicks
    useEffect(() => {
        // add when mounted
        document.addEventListener('mousedown', handleClick);
        // return function to be called when unmounted
        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentBusiness]);

    return (
        <ModalStyles>
            <div id='modal' ref={nodeModal}>
                <div 
                    className='modal-close' 
                    onClick={() => setModal(false)}
                >
                    ⨯
                </div>
                <picture>
                    <img 
                        className='bg-image' 
                        src={business.image_url}
                        alt='preview of restaurant food' 
                    />
                </picture>
                <div className='modal-content'>

                    <div className='name'>{business.name}</div>

                    <div className='top-info-wrapper'>
                        <div className='top-info-left'>
                            <img src={ratingStars} alt={`${business.rating} stars`} />
                            <div className='review-count'>{business.review_count} reviews</div>
                            <div className='price'>{priceDisplay}</div>
                        </div>
                        <div className='top-info-right'>
                            <div className='distance'>{distanceMiles} mi away</div>
                            <div className='tel-wrapper hide'>
                                <span className='tel-title'>Tel:</span> 
                                <span className='tel-number'>{business.phone}</span>
                            </div>
                        </div>
           
                        <div className={`external-links ${menuUrl && menuUrl !== 'none' ? 'show-menu':null}`}>
                            <a className='link-yelp' href={business.url} target='_blank' rel='noopener noreferrer'>
                                <img src={yelpLogo} alt={`link to ${business.name} Yelp page`} />
                            </a>
                            {
                                !menuUrl &&
                                <div className='loading-menu'>
                                    <div className="lds-dual-ring"></div>
                                </div>
                            }
                            {
                                menuUrl && menuUrl !== 'none' &&
                                <a className='link-menu' href={menuUrl} target='_blank' rel='noopener noreferrer'>Menu (Zomato)</a>
                            }
                        </div>
                    </div>
                    
                    <div className='bottom-info-wrapper'>
                        <div className='hours-wrapper'>
                            <div className='hours-title'>Hours:</div>
                            <div className='hours-grid'>
                                <span className='Monday'>Mon</span>
                                <span className='day-hours'>{business.formatted_hours['Monday']}</span>

                                <span className='Tuesday'>Tues</span>
                                <span className='day-hours'>{business.formatted_hours['Tuesday']}</span>

                                <span className='Wednesday'>Wed</span>
                                <span className='day-hours'>{business.formatted_hours['Wednesday']}</span>

                                <span className='Thursday'>Thurs</span>
                                <span className='day-hours'>{business.formatted_hours['Thursday']}</span>

                                <span className='Friday'>Fri</span>
                                <span className='day-hours'>{business.formatted_hours['Friday']}</span>

                                <span className='Saturday'>Sat</span>
                                <span className='day-hours'>{business.formatted_hours['Saturday']}</span>

                                <span className='Sunday'>Sun</span>
                                <span className='day-hours'>{business.formatted_hours['Sunday']}</span>
                            </div>
                        </div>
                    </div>

                    <div className='address-wrapper'>
                        {
                            business.formatted_address && business.formatted_address.map((line, index) => (
                                <div key={`${business.name} - ${index}`}>
                                    {line}
                                </div>
                            ))
                        }
                    </div>
                    <button 
                        className='get-directions'
                        onClick={() => handleRouting(business)}
                    >
                        Get Directions
                    </button>
                </div>
            </div>
        </ModalStyles>
    )
}

export default Modal;