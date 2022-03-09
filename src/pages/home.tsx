import React, { useEffect } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { useAppDispatch, useAppSelector } from '../hooks'
import { syncThunk } from '../store/user-data/thunks';
import Navbar from '../components/Navbar'
import { Text } from 'react-native-paper';
import { groupedTransactionsPerDay, loggedInUserSelector } from '../store/user-data/selector';
import { UserInterface } from '../models/User';
import DailyTransactionCard from '../components/DailyTransactionCard';
import moment from 'moment';
import { ScrollView } from 'react-native-gesture-handler';

const width = Dimensions.get('window').width;

export default function Home() {

    const dispatch = useAppDispatch();
    const userBalance = useAppSelector(state => state.userData.balance)
    const user = useAppSelector((state) => loggedInUserSelector(state.userData.profile as UserInterface));
    const transactions = useAppSelector((state) => groupedTransactionsPerDay(state.userData.transactions))

    useEffect(() => {
        dispatch(syncThunk())
    }, [])

    const transactionElements = Object.keys(transactions).map(key => {
        return <DailyTransactionCard key={key} day={moment(key)} transactions={transactions[key]}/>
    })

    return (
        <View style={{flex: 1}}>
            <Navbar showLogout />
            <ScrollView style={styles.container}>
                <View style={styles.userContainer}>
                    <View style={styles.balanceContainer}>
                        <Text style={styles.balanceInfoText}>You Have</Text>
                        <Text style={styles.balanceText}>SGD {userBalance}</Text>
                    </View>
                    <View style={styles.userInfoContainer}>
                        <Text style={styles.userInfoText}>Account No</Text>
                        <Text style={{...styles.userText, marginBottom: 15}}>{user?.accountNo}</Text>
                        <Text style={styles.userInfoText}>Account Holder</Text>
                        <Text style={styles.userText}>{user?.accountHolder}</Text>
                    </View>
                </View>
                <View style={styles.transactionHistoryContainer}>
                    <Text style={styles.transactionHistoryTitle}>Your transaction history</Text>
                    {transactionElements}
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 55,
        flex: 1,
        flexGrow: 1
    },
    userContainer: {
        backgroundColor: "#EE4645",
        width: width * 0.8,
        paddingBottom: 25,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,

        shadowOffset: {width: -2, height: 4},
        shadowColor: 'black',
        elevation: 20,
    },
    balanceContainer: {
        paddingLeft: 20,
        paddingBottom: 10,
        paddingTop: 20,
        backgroundColor: '#EB2F26',
        borderTopRightRadius: 30,
    },
    balanceInfoText: {
        fontSize: 18,
        fontFamily: 'Ubuntu-Medium',
        color: 'white',
        marginBottom: 5
    },
    balanceText: {
        fontSize: 25,
        fontFamily: 'Ubuntu-Bold',
        color: 'white'
    },
    userInfoText: {
        color: '#EFEFEF',
        fontFamily: 'Ubuntu-Medium',
        fontSize: 12,
        marginBottom: 5
    },
    userText: {
        color: '#EFEFEF',
        fontFamily: 'Ubuntu-Medium',
        fontSize: 20
    },
    userInfoContainer: {
        marginLeft: 20,
        marginTop: 20
    },
    transactionHistoryContainer: {
        marginTop: 20,
        marginHorizontal: 20
    },
    transactionHistoryTitle: {
        fontFamily: 'Ubuntu-Bold',
        fontSize: 15,
        marginBottom: 15
    }
});
