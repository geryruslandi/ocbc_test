import 'react-native';
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import AppStore from '../src/store';
import Login from '../src/pages/Login';

const createTestProps = {
    navigation: {
      navigate: jest.fn()
    }
} as any;

describe('Login page test', () => {

    it('will show error message if user didnt input username', () => {

        const renderItem = render(
            <Provider store={AppStore}>
                <Login {...createTestProps}/>
            </Provider>
        );

    })

});
