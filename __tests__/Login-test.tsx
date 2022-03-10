import 'react-native';
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import AppStore from '../src/store';
import Login from '../src/pages/Login';
import Axios from '../src/plugins/Axios';
import { act } from 'react-test-renderer';
import UxHelper from '../src/utils/UxHelper';
import { loggedInUserSlice } from '../src/store/user-data';

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

        (Axios.prototype.post as jest.Mock).mockReturnValue(Promise.reject({
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

    it('will clear all of user data from state if user logged out', async() => {
        AppStore.dispatch(loggedInUserSlice.actions.setUser({
            accountHolder: 'gery',
            accountNo: '123123'
        }))

        AppStore.dispatch(loggedInUserSlice.actions.setToken('123123'))
        AppStore.dispatch(loggedInUserSlice.actions.setTransactions([
            {
                "transactionId": "622a1b14a5545747094f6fa8",
                "amount": 1,
                "transactionDate": "2022-03-10T15:36:52.413Z",
                "description": "t",
                "transactionType": "transfer",
                "receipient": {
                    "accountNo": "1265-467-6977",
                    "accountHolder": "Elsie"
                }
            } as any,
        ]))


        AppStore.dispatch(loggedInUserSlice.actions.logout())

        expect(AppStore.getState().userData.profile).toEqual(null)
        expect(AppStore.getState().userData.token).toEqual(null)
        expect(AppStore.getState().userData.transactions.length).toEqual(0)
    })
});
