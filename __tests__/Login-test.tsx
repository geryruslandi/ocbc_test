import 'react-native';
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import AppStore from '../src/store';
import Login from '../src/pages/Login';
import Axios from '../src/plugins/Axios';
import { act } from 'react-test-renderer';
import UxHelper from '../src/utils/UxHelper';

const navigationProps = {
    navigation: {
      navigate: jest.fn()
    }
} as any;

jest.mock('../src/plugins/Axios');
jest.mock('../src/utils/UxHelper', () =>({showToast: jest.fn()}));

describe('Login page test', () => {

    it('will show error message if user didnt input username', () => {

        const { getByTestId, getByText } = render(
            <Provider store={AppStore}>
                <Login {...navigationProps}/>
            </Provider>
        );

        fireEvent.press(getByTestId('Button.Login'))

        getByText('Username is required');
    })

    it('will show error message if user didnt input password', () => {

        const { getByTestId, getByText } = render(
            <Provider store={AppStore}>
                <Login {...navigationProps}/>
            </Provider>
        );

        fireEvent.press(getByTestId('Button.Login'))

        getByText('Password is required');
    })

    it('will show error warning if login fails', async () => {

        (Axios.prototype.get as jest.Mock).mockReturnValue(Promise.reject({
            status: 403,
            data: {
                error: 'invalid login credential'
            }
        }))

        const { getByTestId } = render(
            <Provider store={AppStore}>
                <Login {...navigationProps}/>
            </Provider>
        );

        fireEvent.changeText(getByTestId('TextInput.Username'), 'username');
        fireEvent.changeText(getByTestId('TextInput.Password'), 'password');

        await act(async() => fireEvent.press(getByTestId('Button.Login')) )

        expect(UxHelper.showToast).toHaveBeenCalled()

    })

    it('will save user profile and token if login success', async() => {
        (Axios.prototype.post as jest.Mock).mockReturnValue(Promise.resolve({
            status: 200,
            data: {
                username: 'username',
                accountNo: 'accountNo',
                token: 'tokenHere'
            }
        }))

        const { getByTestId } = render(
            <Provider store={AppStore}>
                <Login {...navigationProps}/>
            </Provider>
        );

        fireEvent.changeText(getByTestId('TextInput.Username'), 'username');
        fireEvent.changeText(getByTestId('TextInput.Password'), 'password');

        await act(async() => fireEvent.press(getByTestId('Button.Login')) )

        expect(AppStore.getState().userData.token).toEqual('tokenHere')
        expect(AppStore.getState().userData.profile?.accountHolder).toEqual('username')
        expect(AppStore.getState().userData.profile?.accountNo).toEqual('accountNo')
    })
});
