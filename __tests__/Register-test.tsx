import 'react-native';
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import AppStore from '../src/store';
import { act } from 'react-test-renderer';
import UxHelper from '../src/utils/UxHelper';
import Register from '../src/pages/Register';
import Api from '../src/plugins/Api';

const navigationProps = {
    navigation: {
      navigate: jest.fn()
    }
} as any;

jest.mock('../src/plugins/Api');
jest.mock('../src/utils/UxHelper');

describe('Register page test', () => {

    it('will show error message if user didnt input username', async () => {

        const { getByTestId, getByText } = render(
            <Provider store={AppStore}>
                <Register {...navigationProps}/>
            </Provider>
        );

        await act(() => fireEvent.press(getByTestId('Button.Register')))


        getByText('Username is required');
    })

    it('will show error message if user didnt input password', async () => {

        const { getByTestId, getByText } = render(
            <Provider store={AppStore}>
                <Register {...navigationProps}/>
            </Provider>
        );

        await act(() => fireEvent.press(getByTestId('Button.Register')))

        getByText('Password is required');
    })

    it('will show error message if user didnt input password confirmation', async () => {

        const { getByTestId, getByText, debug } = render(
            <Provider store={AppStore}>
                <Register {...navigationProps}/>
            </Provider>
        );

        await act(() => fireEvent.press(getByTestId('Button.Register')))

        getByText('Password Confirmation is required');
    })

    it('will show error message if password confirmation is not same with password', async () => {

        const { getByTestId, getByText } = render(
            <Provider store={AppStore}>
                <Register {...navigationProps}/>
            </Provider>
        );

        fireEvent.changeText(getByTestId('TextInput.PasswordConfirmation'), 'testing')

        await act(() => fireEvent.press(getByTestId('Button.Register')))

        getByText('Password Confirmation must be same with Password');
    })

    it('will show error warning if registration fails', async () => {

        (Api.register as jest.Mock).mockReturnValue(Promise.reject({
            status: 403,
            data: {
                error: 'username already exists'
            }
        }))

        const { getByTestId } = render(
            <Provider store={AppStore}>
                <Register {...navigationProps}/>
            </Provider>
        );

        fireEvent.changeText(getByTestId('TextInput.Username'), 'username');
        fireEvent.changeText(getByTestId('TextInput.Password'), 'password');
        fireEvent.changeText(getByTestId('TextInput.PasswordConfirmation'), 'password');

        await act(async() => fireEvent.press(getByTestId('Button.Register')) )

        expect(UxHelper.showToast).toHaveBeenCalled()

    })

    it('will logging in user if registration success', async() => {
        (Api.register as jest.Mock).mockReturnValue(Promise.resolve({
            status: 200,
            data: {}
        }));

        Api.login;
        (Api.login as jest.Mock).mockReturnValue(Promise.resolve({
            status: 200,
            data: {
                username: 'username',
                accountNo: 'accountNo',
                token: 'tokenHere'
            }
        }))

        const { getByTestId } = render(
            <Provider store={AppStore}>
                <Register {...navigationProps}/>
            </Provider>
        );

        fireEvent.changeText(getByTestId('TextInput.Username'), 'username');
        fireEvent.changeText(getByTestId('TextInput.Password'), 'password');
        fireEvent.changeText(getByTestId('TextInput.PasswordConfirmation'), 'password');

        await act(async() => fireEvent.press(getByTestId('Button.Register')) )

        expect(AppStore.getState().userData.token).toEqual('tokenHere')
        expect(AppStore.getState().userData.profile?.accountHolder).toEqual('username')
        expect(AppStore.getState().userData.profile?.accountNo).toEqual('accountNo')
    })
});
