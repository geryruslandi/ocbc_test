import React, { useState } from 'react';
import { Image, StyleSheet, Text, View, Dimensions } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import { useAppDispatch } from '../hooks'
import { loginThunk } from '../store/user-data/thunks';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../AppRoute';
import RichTextInput from '../components/login-and-registration/RichTextInput';

const windowWidth = Dimensions.get('screen').width;

export default function Login(props: PropsType) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginButtonLoading, setLoginButtonLoading] = useState(false);
    const [errors, setErrors] = useState({
        username: '',
        password: ''
    })

    const dispatch = useAppDispatch();

    async function login() {

        if(loginButtonLoading) return;

        const newErrors = errors;

        if(username == '') newErrors.username = "Username is required"
        else newErrors.username = "";

        if(password == '') newErrors.password = "Password is required"
        else newErrors.password = "";

        setErrors({...newErrors})

        if(username == '' || password == '') return;


        setLoginButtonLoading(true);
        await dispatch(loginThunk({username, password}))
        setLoginButtonLoading(false);
    }

    async function register() {
        console.log(props.navigation.navigate('Register'))
    }


    return (
        <View style={styles.pageContainer}>
            <View style={styles.logoContainer}>
                <Image source={require('../../assets/images/ocbc.png')} style={styles.logoIcon}/>
                <Text style={styles.logoLabel}>OCBC Bank</Text>
            </View>
            <View style={styles.inputContainer}>
                <View style={{marginBottom: 30}}>
                    <RichTextInput
                        placeholder='Username'
                        error={errors.username}
                        value={username}
                        onChange={setUsername}
                        style={{marginBottom: 10}}
                    />
                    <RichTextInput
                        placeholder='Password'
                        error={errors.password}
                        value={password}
                        secureTextEntry
                        onChange={setPassword}
                        style={{marginBottom: 5}}
                    />
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
                <Button
                    style={{marginTop: 10}}
                    color="#0DBC5D"
                    mode="contained"
                    onPress={register}>

                    <Entypo name="add-user" size={21} color="white"/>
                    <View style={{ width: 5, height: 1 }} />
                    <Text style={{fontSize: 15}}>Register</Text>
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
        flex:1
    },
})

type PropsType = {
    navigation : StackNavigationProp<RootStackParamList, 'Login'>;
}
