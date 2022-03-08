import React from 'react'

import { isSignedInSelector } from './store/user-data/selector';
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
                { isSignedIn &&
                    <Root.Navigator     screenOptions={{
                        headerStyle: { elevation: 0 },
                        cardStyle: { backgroundColor: '#fff' }
                    }}>
                        <Root.Screen options={{ headerShown: false }} name="Home" component={Home} />
                    </Root.Navigator>
                }
                { !isSignedIn &&
                    <Root.Navigator>
                        <Root.Screen options={{ headerShown: false }} name="Login" component={Login} />
                    </Root.Navigator>
                }
        </NavigationContainer>
    )
}
