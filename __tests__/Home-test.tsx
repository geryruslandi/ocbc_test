import 'react-native';
import React from 'react';
import { render, fireEvent, waitFor, waitForElementToBeRemoved, RenderAPI } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import AppStore from '../src/store';
import { loggedInUserSlice } from '../src/store/user-data';
import Home from '../src/pages/Home';
import Api from '../src/plugins/Api';

const navigationProps = {
    navigation: {
        navigate: jest.fn()
    }
} as any;


jest.mock('../src/plugins/Api')


describe("Home page test", () => {


    beforeEach(() => {
        AppStore.dispatch(loggedInUserSlice.actions.setUser({
            accountHolder: 'gery',
            accountNo: '123123'
        }))
    })

    it("will show correct username", async () => {


        const renderEl = render(
            <Provider store={AppStore}>
                <Home {...navigationProps} />
            </Provider>
        )

        await waitFor(() => {
            renderEl.getByText('gery');
        })

    })

    it("will fetch user balance and show it", async () => {


        (Api.getBalance as jest.Mock).mockReturnValue(Promise.resolve({
            status: 200,
            data: {
                balance: 100
            }
        }))

        Api.getTransactionHistory;
        (Api.getTransactionHistory as jest.Mock).mockReturnValue(Promise.resolve({
            status: 200,
            data: {
                data: []
            }
        }))

        const renderEl = render(
            <Provider store={AppStore}>
                <Home {...navigationProps} />
            </Provider>
        )

        await waitFor(() => {
            renderEl.getByText('SGD 100');
        })

    })

    it("will fetch user transaction history and show it", async () => {


        (Api.getBalance as jest.Mock).mockReturnValue(Promise.resolve({
            status: 200,
            data: {
                balance: 100
            }
        }))

        Api.getTransactionHistory;
        (Api.getTransactionHistory as jest.Mock).mockReturnValue(Promise.resolve({
            status: 200,
            data: {
                data: [
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
                    },
                ]
            }
        }))

        const renderEl = render(
            <Provider store={AppStore}>
                <Home {...navigationProps} />
            </Provider>
        )

        await waitFor(() => {
            renderEl.getByText('1265-467-6977');
        })

    })

})
