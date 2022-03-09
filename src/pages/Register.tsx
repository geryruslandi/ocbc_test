import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { Button, TextInput } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../AppRoute';
import Navbar from '../components/Navbar';
import { useAppDispatch } from '../hooks';
import { registerAndLogin } from '../store/user-data/thunks';
import { ScrollView } from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;


export default function Register(props: PropsType) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [buttonLoading, setButtonLoading] = useState(false);

    const dispatch = useAppDispatch();

    async function register() {

        if(buttonLoading) return;

        setButtonLoading(true);
        await dispatch(registerAndLogin({username, password}))
        setButtonLoading(false);
    }


    return (
        <View style={{flex: 1}}>
            <Navbar showGoBack bgColor='white'/>
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
                            style={{...styles.input, marginBottom: 15}}/>
                        <TextInput
                            label="Password"
                            theme={{colors: {primary: '#EF393B'}}}
                            value={password}
                            secureTextEntry
                            onChangeText={setPassword}
                            style={{...styles.input, marginBottom: 15}}/>
                        <TextInput
                            label="Password Confirmation"
                            theme={{colors: {primary: '#EF393B'}}}
                            value={passwordConfirmation}
                            secureTextEntry
                            onChangeText={setPasswordConfirmation}
                            style={styles.input}/>
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
        paddingHorizontal: windowWidth * 0.1,
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
    input: {
        shadowColor: 'black',
        shadowOffset: {width: 3, height: 5},
        shadowOpacity: 0.2,
        elevation: 1,
        backgroundColor: 'white',
    }
})

type PropsType = {
    navigation : StackNavigationProp<RootStackParamList, 'Register'>;
}
