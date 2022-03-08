import React from 'react'

import { isSignedInSelector } from './store/login-data/selector';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './pages/Login';
import Home from './pages/Home';
import { useSelector } from 'react-redux';

const Root = createStackNavigator()

export default function AppRoute() {

    const isSignedIn = useSelector(isSignedInSelector);

    return (
        <NavigationContainer>
            <Root.Navigator>
                { isSignedIn &&
                    <Root.Screen options={{ headerShown: false }} name="Home" component={Home} />
                }
                { !isSignedIn &&
                    <Root.Screen options={{ headerShown: false }} name="Login" component={Login} />
                }
            </Root.Navigator>
        </NavigationContainer>
    )
}
