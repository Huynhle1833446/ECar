import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginView from '../screens/LoginView';
import RegisterView from '../screens/RegisterView';
import StartView from '../screens/StartView';
import PhoneRegister from '../screens/PhoneRegister';
import OTPView from '../screens/OTPView';

const Stack = createStackNavigator();

const AuthStack = () => (
    <Stack.Navigator initialRouteName='start'>
        <Stack.Screen options={{headerShown : false}} name='login' component = {LoginView} />
        <Stack.Screen options={{headerShown : false}} name='register' component = {RegisterView} />
        <Stack.Screen options={{headerShown : false}} name='start' component={StartView}/>
        <Stack.Screen options={{headerShown : false}} name='phoneRegister' component={PhoneRegister}/>
        <Stack.Screen options={{headerShown : false}} name='otpValid' component={OTPView}/>
    </Stack.Navigator>
)
export default AuthStack;