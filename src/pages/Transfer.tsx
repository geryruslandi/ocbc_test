import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Navbar from '../components/Navbar';

export default function Transfer() {
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
