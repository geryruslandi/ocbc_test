import React from 'react'

import { isSignedInSelector } from './store/user-data/selector';
import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import Transfer from './pages/Transfer';
import { useAppSelector } from './hooks';
import { UserInterface } from './models/User';

export type RootStackParamList = {
    Home: undefined,
    Login: undefined,
    Register: undefined,
    Transfer: undefined
}

const navigationRef = createNavigationContainerRef()

const Root = createStackNavigator<RootStackParamList>()

export default function AppRoute() {


    const isSignedIn = useAppSelector(state => isSignedInSelector(state.userData.profile as UserInterface));

    return (
        <NavigationContainer ref={navigationRef}>
            { isSignedIn &&
                <Root.Navigator screenOptions={{ headerStyle: { elevation: 0 }, cardStyle: { backgroundColor: '#f7f7f7' } }}>
                    <Root.Screen options={{ headerShown: false }} name="Home" component={Home} />
                    <Root.Screen options={{ headerShown: false }} name="Transfer" component={Transfer} />
                </Root.Navigator>
            }
            { !isSignedIn &&
                <Root.Navigator>
                    <Root.Screen options={{ headerShown: false }} name="Login" component={Login} />
                    <Root.Screen options={{ headerShown: false }} name="Register" component={Register} />
                </Root.Navigator>
            }
        </NavigationContainer>
    )
}

export function getNavigationRef(){
    return navigationRef.isReady()
        ? navigationRef
        : null;
}
