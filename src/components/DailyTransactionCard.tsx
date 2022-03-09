import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Moment } from "moment";
import Transaction from '../models/Transaction';


export default function DailyTransactionCard(props: DailyTransactionCardInterface) {
  return (
    <View style={styles.container}>
        <View style={styles.dayContainer}>
            <Text style={styles.dayTitle}>
                {props.day.format('D MMM YYYY')}
            </Text>
        </View>
        <View style={styles.transactionContainer}>
            {props.transactions.map(item => <TransactionElement key={item.transactionId} transaction={item}/>)}
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 10,
        borderRadius: 20,
        backgroundColor: 'white',
        marginBottom: 10,
        elevation: 20
    },
    dayTitle: {
        color: 'white',
        fontFamily: 'Ubuntu-Medium',
        fontSize: 14
    },
    dayContainer: {
        backgroundColor: 'black',
        paddingVertical: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingLeft: 20
    },
    transactionContainer: {
        paddingTop: 15,
        paddingBottom: 5,
        paddingHorizontal: 20,
    }
});
interface DailyTransactionCardInterface {
    day: Moment,
    transactions: Array<Transaction>
}

function TransactionElement(props: {transaction: Transaction}) {
    return (
        <View style={transactionStyles.container}>
            <View style={transactionStyles.topContainer}>
                <Text style={transactionStyles.holderText}>{props.transaction.receipient.accountHolder}</Text>
                <Text style={transactionStyles.amountText}>SGD {props.transaction.amount}</Text>
            </View>
            <View>
                <Text style={transactionStyles.holderNumber}>{props.transaction.receipient.accountNo}</Text>
            </View>
        </View>
    );
}

const transactionStyles = StyleSheet.create({
    container: {
        marginBottom: 10
    },
    topContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    amountText: {
        fontFamily: 'Ubuntu-Medium',
        fontSize: 15,
        color: '#0DC93F'
    },
    holderText: {
        fontFamily: 'Ubuntu-Bold',
        fontSize: 15,
        color: 'black'
    },
    holderNumber: {
        fontFamily: 'Ubuntu-Regular',
        fontSize: 12,
        color: '#AEAEAE'
    },
});
