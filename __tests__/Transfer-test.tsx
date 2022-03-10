import 'react-native';
import React from 'react';
import { render, fireEvent, waitFor, waitForElementToBeRemoved } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import AppStore from '../src/store';
import { loggedInUserSlice } from '../src/store/user-data';
import Api from '../src/plugins/Api';
import Transfer from '../src/pages/Transfer';
import { act } from 'react-test-renderer';

const navigationProps = {
    navigation: {
      navigate: jest.fn()
    }
} as any;

jest.useFakeTimers();
jest.mock('../src/plugins/Api');

describe('Transfer page test', () => {


    beforeEach(() => {
        AppStore.dispatch(loggedInUserSlice.actions.setUser({
            accountHolder: 'gery',
            accountNo: '123123'
        }));

        (Api.getPayees as jest.Mock).mockReturnValue(Promise.resolve({
            status: 200,
            data: {
                data: [
                    {
                        "id": "616d65d1d1b6fd6f12aeede8",
                        "name": "Andy",
                        "accountNo": "6554-630-9653"
                    },
                    {
                        "id": "616d65d1d1b6fd6f12aeedea",
                        "name": "Emmie",
                        "accountNo": "7174-429-2937"
                    },
                    {
                        "id": "616d65d1d1b6fd6f12aeede9",
                        "name": "Mohammed",
                        "accountNo": "2833-703-6351"
                    },
                    {
                        "id": "616d65d1d1b6fd6f12aeede6",
                        "name": "Alvis",
                        "accountNo": "9226-178-8806"
                    },
                ]
            }
        }))
    })

    it('will show all of payees', async () => {


        const renderEl = render(
            <Provider store={AppStore}>
                <Transfer {...navigationProps} />
            </Provider>
        )

        await act(async() => {
            renderEl
        });

        await act(async () => fireEvent.press(renderEl.getByTestId('Picker.Payee')))

        expect(renderEl.getByTestId('Picker.Payee').props.items.length).toEqual(4)
    })

    it('will need to pass integer value as amount', async () => {

        Api.submitTransfer;
        (Api.submitTransfer as jest.Mock).mockReturnValue(Promise.resolve({
            status: 200,
            data: {
                "status": "success",
                "transactionId": "622a6eebc83b1c9e0e9c2827",
                "amount": 10,
                "description": "testing",
                "recipientAccount": "6554-630-9653"
            }
        }))

        const renderEl = render(
            <Provider store={AppStore}>
                <Transfer {...navigationProps} />
            </Provider>
        )

        await act(async() => {
            renderEl
        });

        await act(async () => fireEvent.changeText(renderEl.getByTestId('TextInput.Amount'), 'abcde'))

        await act(async () => fireEvent.press(renderEl.getByTestId('Button.SubmitTransfer')))

        jest.advanceTimersByTime(1000)

        renderEl.findByText('Amount must be an integer')
    })

    it('will show message success if transfer success', async () => {

        Api.submitTransfer;
        (Api.submitTransfer as jest.Mock).mockReturnValue(Promise.resolve({
            status: 200,
            data: {
                "status": "success",
                "transactionId": "622a6eebc83b1c9e0e9c2827",
                "amount": 10,
                "description": "testing",
                "recipientAccount": "6554-630-9653"
            }
        }))

        const renderEl = render(
            <Provider store={AppStore}>
                <Transfer {...navigationProps} />
            </Provider>
        )

        await act(async() => {
            renderEl
        });

        await act(async () => fireEvent.changeText(renderEl.getByTestId('TextInput.Amount'), '30'))

        await act(async () => fireEvent.press(renderEl.getByTestId('Button.SubmitTransfer')))

        jest.advanceTimersByTime(1000)

        renderEl.findByText('Money sent')
    })

    it('will show error if transfer fails', async () => {

        Api.submitTransfer;
        (Api.submitTransfer as jest.Mock).mockReturnValue(Promise.reject({
            status: 200,
            data: {
                error: "amount is required"
            }
        }))

        const renderEl = render(
            <Provider store={AppStore}>
                <Transfer {...navigationProps} />
            </Provider>
        )

        await act(async() => {
            renderEl
        });

        await act(async () => fireEvent.changeText(renderEl.getByTestId('TextInput.Amount'), '30'))

        await act(async () => fireEvent.press(renderEl.getByTestId('Button.SubmitTransfer')))

        jest.advanceTimersByTime(1000)

        renderEl.findByText('amount is required')
    })

})
