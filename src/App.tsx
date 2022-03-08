import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import AppStore, { persistor } from './store';
import AppRoute from './AppRoute';


export default function App() {

    return (
        <Provider store={AppStore}>
            <PersistGate persistor={persistor}>
                <AppRoute/>
            </PersistGate>
        </Provider>
    );
};
