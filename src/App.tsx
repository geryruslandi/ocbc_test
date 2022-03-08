import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/login';

const Root = createStackNavigator()


export default function App(){

  return (
    <NavigationContainer>
      <Root.Navigator>
          <Root.Screen options={{headerShown:false}} name="Login" component={Login}/>
      </Root.Navigator>
    </NavigationContainer>
  );
};
