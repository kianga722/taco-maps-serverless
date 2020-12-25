import { useEffect, useContext } from 'react';

import { LoadingContext } from '../contexts/LoadingContext';
import { ModalContext } from '../contexts/ModalContext';
import { MapContext } from '../contexts/MapContext';

import Loading from './Loading';
import Modal from './Modal';
import Error from './Error';
import Header from './Header';
import Map from './Map';
import AddressCopy from './AddressCopy';
import Navigation from './Navigation';

import ContentStyles from '../styles/ContentStyles';

function AppMain() {
    const { loading } = useContext(LoadingContext);
    const { modal } = useContext(ModalContext);
    const { 
        userCoords,
        currentBusiness, 
        addressCopy, 
        routeBusiness,
        geoInit,
    } = useContext(MapContext);
    
    useEffect(() => {
       geoInit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='App'>
        {
            loading && <Loading />
        }
        {
            modal && currentBusiness && <Modal />
        }
        {
            <ContentStyles>
                {
                    userCoords && !routeBusiness && <Header />
                }
                {
                    userCoords && <Map />
                }
                {
                    addressCopy && <AddressCopy />
                }
                {
                    !loading && !userCoords && <Error />
                }
                {
                    routeBusiness && <Navigation />
                }
            </ContentStyles>
        }
    </div>
  );
}

export default AppMain;
