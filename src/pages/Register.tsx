import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { Button, TextInput } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../AppRoute';
import Navbar from '../components/Navbar';
import { useAppDispatch } from '../hooks';
import { registerAndLogin } from '../store/user-data/thunks';
import RichTextInput from '../components/login-and-registration/RichTextInput';

export default function Register(props: PropsType) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [buttonLoading, setButtonLoading] = useState(false);
    const [errors, setErrors] = useState({
        username: '',
        password: '',
        passwordConfirmation: ''
    })


    const dispatch = useAppDispatch();

    async function register() {

        if(buttonLoading) return;

        const newErrors = errors;

        if(username == '') newErrors.username = "Username is required"
        else newErrors.username = "";

        if(password == '') newErrors.password = "Password is required"
        else newErrors.password = "";

        if(passwordConfirmation == '') newErrors.passwordConfirmation = "Password Confirmation is required"
        else newErrors.passwordConfirmation = "";

        if(passwordConfirmation != password) newErrors.passwordConfirmation = "Password Confirmation must be same with Password"
        else newErrors.passwordConfirmation = "";

        setErrors({...newErrors})

        if(newErrors.password != '' || newErrors.passwordConfirmation != '' || newErrors.username != '') return;


        setButtonLoading(true);
        await dispatch(registerAndLogin({username, password}))
        setButtonLoading(false);
    }


    return (
        <View style={{flex: 1, paddingHorizontal: 20, backgroundColor: 'white'}}>
            <Navbar showGoBack bgColor='white'/>
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
                        <RichTextInput
                            placeholder='Password Confrimation'
                            error={errors.passwordConfirmation}
                            value={passwordConfirmation}
                            secureTextEntry
                            onChange={setPasswordConfirmation}
                            style={{marginBottom: 5}}
                        />
                    </View>
                    <Button
                        color="#0DBC5D"
                        onPress={register}
                        loading={buttonLoading}
                        style={{marginTop: 10}}
                        mode="contained">

                        <Entypo name="add-user" size={21} color="white"/>
                        <View style={{ width: 5, height: 1 }} />
                        <Text style={{fontSize: 15}}>Submit Registation</Text>
                    </Button>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    pageContainer: {
        paddingHorizontal: 20,
        display: 'flex',
        backgroundColor: 'white',
        flexGrow: 1
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
    navigation : StackNavigationProp<RootStackParamList, 'Register'>;
}
