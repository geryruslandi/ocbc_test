import React, { useEffect } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { useAppDispatch, useAppSelector } from '../hooks'
import { syncThunk } from '../store/user-data/thunks';
import Navbar from '../components/Navbar'
import { Text } from 'react-native-paper';
import { loggedInUserSelector } from '../store/user-data/selector';

const width = Dimensions.get('window').width;

export default function Home() {

    const dispatch = useAppDispatch();
    const userBalance = useAppSelector(state => state.userData.balance)
    const user = useAppSelector(loggedInUserSelector);

    useEffect(() => {
        dispatch(syncThunk())
    }, [])


    return (
        <View >
            <Navbar showLogout />
            <View style={styles.container}>
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
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop:35,
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
});
