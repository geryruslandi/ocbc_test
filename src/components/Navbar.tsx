import { View, Text, StyleSheet, Dimensions, Alert } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { logout } from '../store/user-data';
import { useAppDispatch } from '../hooks';


const width = Dimensions.get('window').width;

export default function Navbar(props: NavbarProps) {


    const dispatch = useAppDispatch();

    function logoutFunction() {
        Alert.alert(
            "Are you sure",
            "You will need to logging in again if you click ok",
            [
                {
                  text: "Cancel",
                  style: "cancel"
                },
                { text: "OK", onPress: () => dispatch(logout()) }
            ]
        )
    }

    return (
        <View style={style.container}>

            <View style={style.leftSubContainer}>
            </View>
            <View style={style.middleSubContainer}>
                { props.title &&
                    <Text style={style.title}>{props.title}</Text>
                }
            </View>
            <View style={style.rigthSubContainer}>
                { props.showLogout &&
                    <TouchableOpacity style={style.logoutContainer} onPress={logoutFunction}>
                        <Icon name="logout" size={15} style={{fontWeight: 'bold', marginRight: 5}}/>
                        <Text style={style.logoutText}>Logout</Text>
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        height: 55,
        width,
        display: 'flex',
        flexDirection: 'row',
    },
    leftSubContainer: {
        flex: 1
    },
    middleSubContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rigthSubContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: '900',
        color: 'black'
    },
    logoutText: {
        fontSize: 15,
        fontWeight: '900',
        color: 'black',
        fontFamily: 'Ubuntu-Regular'
    },
    logoutContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

type NavbarProps = {
    title?: String,
    showLogout?: boolean
}
