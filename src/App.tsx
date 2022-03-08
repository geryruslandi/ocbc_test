import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/login';
import { Provider } from 'react-redux';
import AppStore from './store'

const Root = createStackNavigator()


export default function App(){

  return (
    <Provider store={AppStore}>
        <NavigationContainer>
        <Root.Navigator>
            <Root.Screen options={{headerShown:false}} name="Login" component={Login}/>
        </Root.Navigator>
        </NavigationContainer>
    </Provider>
  );
};
