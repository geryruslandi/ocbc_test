import React, { useEffect } from 'react'
import { View } from 'react-native'
import { useAppDispatch, useAppSelector } from '../hooks'
import { syncThunk } from '../store/user-data/thunks';
import Navbar from '../components/Navbar'
import { Text } from 'react-native-paper';

export default function Home() {

    const dispatch = useAppDispatch();
    const userBalance = useAppSelector(state => state.userData.balance)

    useEffect(() => {
        dispatch(syncThunk())
    }, [])

    return (
        <View>
            <Navbar showLogout />
            <Text>test</Text>
        </View>
    )
}

function Logout() {

}
