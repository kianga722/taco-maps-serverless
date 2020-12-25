import LoadingContextProvider from './contexts/LoadingContext';
import ModalContextProvider from './contexts/ModalContext';
import MapContextProvider from './contexts/MapContext';

import AppMain from './components/AppMain.js';

import GlobalStyles from './styles/GlobalStyles';

function App() {
  return (
    <LoadingContextProvider>
      <ModalContextProvider>
        <MapContextProvider>
          <AppMain />
          <GlobalStyles />
        </MapContextProvider>
      </ModalContextProvider>
    </LoadingContextProvider>
  );
}

export default App;
