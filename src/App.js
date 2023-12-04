import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthStack from './navigation/AuthStack';
import React from 'react';
import { SafeAreaView, Text, View, LogBox } from 'react-native';
import Toast from 'react-native-toast-message';
import { toastConfig } from './common/toastConfig';
import { useSelector } from 'react-redux';
import { selectAuth } from './features/auth/authSlice';
import MainStack from './navigation/MainStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux'
import {setUser} from './features/auth/authSlice'


LogBox.ignoreLogs(
  [
    "AxiosError",
    
  ]
)


export default function App() {
  const {isLogin} = useSelector(selectAuth)
  const dispatch = useDispatch()

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };
  useEffect(async () => {
    const userStore = await getData();
    dispatch(setUser(userStore))
  }, [])
  
  return (
      <NavigationContainer>
        <View style={{ flex: 1 }}>
          <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={{ flex: 1, backgroundColor: "#fff" }}>
              {isLogin ? <MainStack/>  : <AuthStack />}
            </View>
          </SafeAreaView>
          <Toast config={toastConfig} />
        </View>
      </NavigationContainer>
  )
}
