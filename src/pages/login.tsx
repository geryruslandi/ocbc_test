import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={{paddingTop: 60, paddingVertical: 30}}>
            <View style={styles.logoContainer}>
                <Image source={require('../../assets/images/ocbc.png')} style={styles.logoIcon}/>
                <Text style={styles.logoLabel}>OCBC Bank</Text>
            </View>
            <View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    logoContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50
    },
    logoLabel: {
        color: '#EF393B',
        fontSize: 45,
        fontFamily: 'OpenSans-ExtraBold',
        letterSpacing: 0.5
    },
    logoIcon: {
        height:50,
        width: 50,
        marginRight: 10,
    }
})
