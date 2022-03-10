import { View, Text, StyleSheet, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';

import Navbar from '../components/Navbar';
import {Picker} from '@react-native-picker/picker';
import Api from '../plugins/Api';
import User from '../models/User';
import { Button } from 'react-native-paper';
import { useAppDispatch } from '../hooks';
import { submitTransfer } from '../store/user-data/thunks';

export default function Transfer() {

    const [payees, setPayees] = useState([] as User[])
    const [selectedPayee, setSelectedPayee] = useState(null as null | string)
    const [amount, setAmount] = useState('')
    const [description, setDescription] = useState('')
    const [notificationMessage, setNotificationMessage] = useState({
        message: 'test',
        type: 'success',
        show: false
    })
    const [loading, setLoading] = useState(false)

    const dispatch = useAppDispatch();

    useEffect(() => {
        if(notificationMessage.show != true) return;

        setTimeout(() => {
            setNotificationMessage({...notificationMessage, show: false})
        }, 5000)

    }, [notificationMessage])

    useEffect(() => {
        Api.getPayees().then((res) => {

            if(res.status != 200) {
                return ;
            }

            const users = res.data.data.map((item: any) => new User({id: item.id, accountNo: item.accountNo, name: item.name}))
            setPayees(users);
        })
    }, [])

    const payeesElement = payees.map(payee => <Picker.Item testID={payee.accountNo} key={payee.accountNo} fontFamily='Ubuntu-Medium' label={payee.name} value={payee.accountNo} />)

    async function submit() {
        if(loading) return;

        const parsedAmount = Number(amount);

        if(isNaN(parsedAmount)) {
            setNotificationMessage({
                type: 'error',
                show: true,
                message: 'Amount must be an integer'
            })
            return;
        }

        setLoading(true);
        const res = await dispatch(submitTransfer({
            payee: selectedPayee as string,
            amount: parsedAmount,
            description
        }))

        if(res.meta.requestStatus == "rejected") {
            setNotificationMessage({
                type: 'error',
                show: true,
                message: (res as any).error.message
            })
        } else {
            setNotificationMessage({
                type: 'success',
                show: true,
                message: 'Money sent'
            })
        }
        setLoading(false)

    }

    return (
        <View style={styles.container}>
            <Navbar showGoBack />
            <View style={styles.pageContainer}>
                <Text style={styles.transferText}>Transfer</Text>
                <View style={styles.dropDownContainer}>
                    <Text style={styles.label}>Payee</Text>
                    <Picker
                        testID="Picker.Payee"
                        selectedValue={selectedPayee}
                        onValueChange={(value) => setSelectedPayee(value)}>
                        {payeesElement}
                    </Picker>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.label}>Amount</Text>
                    <View style={styles.amountTextInputContainer}>
                        <Text style={styles.amountCurrency}>SGD</Text>
                        <TextInput
                            testID="TextInput.Amount"
                            keyboardType='phone-pad'
                            value={amount}
                            onChangeText={setAmount}
                            style={styles.amountInput} />
                    </View>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        value={description}
                        numberOfLines={4}
                        textAlignVertical="top"
                        onChangeText={setDescription}
                        multiline={true}
                        style={styles.descriptionInput} />
                </View>
                { notificationMessage.show &&
                    <View style={{...styles.messageContainer, ...(notificationMessage.type == 'success' ? {
                        borderColor: 'green',
                        backgroundColor: '#91E6A7'
                    }: {})}}>
                        <Text
                            testID="Text.Message"
                            style={{
                                ...styles.messageTextColor,
                                ...(notificationMessage.type == 'success' ? {color: 'green'} : {})}}>
                                {notificationMessage.message}
                        </Text>
                    </View>
                }
            </View>
            <View style={styles.transferContainer}>
                <Button
                    testID="Button.SubmitTransfer"
                    loading={loading}
                    style={{marginTop: 10}}
                    color="#EE4645"
                    mode="contained"
                    onPress={submit}
                >
                    Submit Transfer
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        marginHorizontal: 30,
    },
    pageContainer: {
        marginTop: 10,
        flexGrow: 1
    },
    transferText: {
        fontFamily: 'Ubuntu-Bold',
        fontSize: 30,
        marginBottom: 20
    },
    dropDownContainer: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 15,
        marginBottom: 10,
        backgroundColor: 'white',
        elevation: 5
    },
    label: {
        marginLeft: 15,
        marginTop: 10,
        fontFamily: 'Ubuntu-Bold',
    },
    amountInput: {
        fontFamily: 'Ubuntu-Medium',
    },
    amountContainer: {
        border: 'black',
        backgroundColor: 'white',
        borderRadius: 15,
        borderWidth: 1,
        marginBottom: 10,
        elevation: 5
    },
    amountCurrency: {
        fontFamily: 'Ubuntu-Bold',
        fontSize: 13,
        textAlignVertical: 'center',
        marginLeft: 15,
        marginRight: 8
    },
    amountTextInputContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        overflow: 'hidden'
    },
    descriptionInput: {
        marginHorizontal: 15,
        fontSize: 15,
        fontFamily: 'Ubuntu-Medium',
    },
    descriptionContainer: {
        backgroundColor: 'white',
        border: 'black',
        borderRadius: 15,
        borderWidth: 1,
        marginBottom: 10,
        elevation: 5
    },
    transferContainer: {
        marginBottom: 30,
        marginHorizontal: 10,
    },
    messageContainer: {
        marginTop: 20,
        backgroundColor: '#FFE3E3',
        padding: 10,
        borderRadius: 10,
        borderColor: '#FF3333',
        borderWidth: 1
    },
    messageTextColor: {
        color: '#FF3333',
        fontSize: 15,
        fontFamily: 'Ubuntu-Medium',
    }
});
