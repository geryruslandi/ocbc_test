import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';

import Navbar from '../components/Navbar';
import {Picker} from '@react-native-picker/picker';

export default function Transfer() {

    const [payees, setPayees] = useState([])

    return (
        <View style={styles.container}>
            <Navbar showGoBack />
            <View style={styles.pageContainer}>
                <Text style={styles.transferText}>Transfer</Text>

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
        marginTop: 10
    },
    transferText: {
        fontFamily: 'Ubuntu-Bold',
        fontSize: 30
    }
});
