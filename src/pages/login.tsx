import React, { useState } from 'react';
import { Image, StyleSheet, Text, View, Dimensions } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '../services/auth';

import { useAppDispatch } from '../hooks'
import { loginThunk } from '../store/login-data/thunks';

const windowWidth = Dimensions.get('window').width;

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginButtonLoading, setLoginButtonLoading] = useState(false);

    const dispatch = useAppDispatch();


    async function login() {

        if(loginButtonLoading) return;

        setLoginButtonLoading(true);
        await dispatch(loginThunk({username, password}))
        setLoginButtonLoading(false);
    }


    return (
        <View style={styles.pageContainer}>
            <View style={styles.logoContainer}>
                <Image source={require('../../assets/images/ocbc.png')} style={styles.logoIcon}/>
                <Text style={styles.logoLabel}>OCBC Bank</Text>
            </View>
            <View style={styles.inputContainer}>
                <View style={{marginBottom: 30}}>
                    <TextInput
                        label="Username"
                        value={username}
                        onChangeText={setUsername}
                        selectionColor="#EF393B"
                        theme={{colors: {primary: '#EF393B'}}}
                        style={{...styles.input, marginBottom: 10}}/>
                    <TextInput
                        label="password"
                        theme={{colors: {primary: '#EF393B'}}}
                        value={password}
                        secureTextEntry
                        onChangeText={setPassword}
                        style={styles.input}/>
                </View>
                <Button
                    loading={loginButtonLoading}
                    color="#EF393B"
                    mode="contained"
                    onPress={login}>

                    <Icon name="account-arrow-right" size={21} color="white"/>
                    <View style={{ width: 5, height: 1 }} />
                    <Text style={{fontSize: 15}}>Login</Text>
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    pageContainer: {
        paddingHorizontal: windowWidth * 0.1,
        flex: 1,
        backgroundColor: 'white'
    },
    logoContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoLabel: {
        color: '#EF393B',
        fontSize: 40,
        fontFamily: 'OpenSans-ExtraBold',
        letterSpacing: 0.5
    },
    logoIcon: {
        height:50,
        width: 50,
        marginRight: 10,
    },
    inputContainer: {
        marginVertical: 80
    },
    input: {
        shadowColor: 'black',
        shadowOffset: {width: 3, height: 5},
        shadowOpacity: 0.2,
        elevation: 1,
        backgroundColor: 'white',
    }
})
