import React, { useEffect, useRef, useState } from 'react'
import { View, StyleSheet, Image, Text, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import Header from '../components/Header'
import ImageUltils from '../assets/Images/ImageUltils'
import ScaleUtils from '../utils/ScaleUtils'
import Title from '../components/Title'
import Toast from 'react-native-toast-message';
import Loader from '../components/Loader'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image'
import { useLoginMutation } from '../services/authApi'
import { useDispatch } from 'react-redux'
import {setUser} from '../features/auth/authSlice'
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment'


export default function LoginView({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const passInputRef = useRef(null)
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);
  const [login, { isLoading, data, isError, isSuccess, error }] = useLoginMutation()
  const dispatch = useDispatch()

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('user', jsonValue);
    } catch (e) {
      Toast.show({
        type: 'invalid',
        props: { message: "Không thể lưu trữ user !" }
      });   
     }
  };


  const proceedLogin = async () => {
    if (username.length > 0 && password.length > 0) {
      await login({ username, password })

    } else {
      Toast.show({
        type: 'invalid',
        props: { message: "Vui lòng điền đầy đủ thông tin !" }
      });
    }
  }

  useEffect(() => {
    if (isSuccess) {
      Toast.show({
        type: 'successed',
        props: { message: "Đăng nhập thành công !" }
      });
      storeData(data.data.user)
      dispatch(setUser(data.data.user))
    }
    if (isError) {
      Toast.show({
        type: 'invalid',
        props: { message: error.data.error }
      });
    }
  }, [isSuccess, isError])




  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Header
        goBack={navigation.goBack}
      />
      {isLoading ?
        <Loader /> :
        <View style={styles.container}>
          <FastImage
            style={styles.logoImage}
            source={ImageUltils.getImageSource('elecIcon')}
            resizeMode='contain'

          />
          <View style={styles.welcomeView}>
            <Title>WELCOME BACK</Title>
          </View>
          <View style={{ paddingVertical: ScaleUtils.floorModerateScale(20) }}>
            <KeyboardAvoidingView>
              <View>
                <View style={styles.inputContainer}>
                  <TextInput
                    autoCapitalize='none'
                    selectTextOnFocus
                    underlineColorAndroid="transparent"
                    keyboardType="default"
                    placeholder='Username'
                    value={username}
                    onChangeText={text => {
                      setUsername(text);
                    }}
                    style={styles.inputForm}
                    onSubmitEditing={() => passInputRef.current.focus()}

                  />
                </View>
                <View style={{ marginTop: 30 }} />
                <View style={styles.inputContainer}>
                  <TextInput
                    autoCapitalize='none'
                    ref={passInputRef}
                    selectTextOnFocus
                    value={password}
                    onChangeText={text => {
                      setPassword(text)
                    }}
                    onSubmitEditing={proceedLogin}
                    underlineColorAndroid="transparent"
                    secureTextEntry={isSecureTextEntry}
                    placeholder='Password'
                    style={styles.inputForm}

                  />
                  <TouchableOpacity
                    style={{ width: 50, alignItems: 'flex-end', paddingRight: 10 }}
                    onPress={() => setIsSecureTextEntry(!isSecureTextEntry)}>
                    <Ionicons
                      name={isSecureTextEntry ? 'ios-eye-off' : 'ios-eye'}
                      size={20}
                      color="#FF6260"
                    />
                  </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'flex-end', justifyContent: "flex-end", marginTop: 12 }}>
                  <TouchableOpacity>
                    <Text style={{ fontSize: 14, color: '#FF6260', fontWeight: 'bold' }}>Forgot your password ?</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.welcomeView}>
                  <TouchableOpacity
                    onPress={proceedLogin}
                  >
                    <View style={styles.loginButton}>
                      <Text style={styles.loginButtonText}>LOGIN</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'center', justifyContent: "center", marginTop: ScaleUtils.floorModerateScale(10), flexDirection: "row" }}>
                  <Text style={{ fontSize: 14, fontWeight: "400", color: "black" }}>Haven't Join Us? </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('phoneRegister')}
                  >
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#FF6260' }}>Click Here !</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </View>
        </View>
      }


    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logoImage: { height: ScaleUtils.floorModerateScale(200), width: ScaleUtils.floorModerateScale(200) },
  test: {
    height: 500,
    width: 500
  },
  welcomeView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: ScaleUtils.floorModerateScale(10)
  },
  loginContainer: {
    flex: 2,
    paddingLeft: ScaleUtils.floorModerateScale(20),
    paddingRight: ScaleUtils.floorModerateScale(20),
    justifyContent: 'flex-start',
    paddingVertical: ScaleUtils.floorModerateScale(20)
  },
  inputContainer: {
    borderWidth: 1,
    borderBottomColor: 'black',
    flexDirection: 'row',
    justifyContent: 'center',
    width: 250,
    borderRadius: 10,
    paddingLeft: 10,
    alignItems: "center"
  },
  inputForm: {
    height: 40,
    flex: 1,
    paddingBottom: 10,
    color: 'red',

  },
  loginButton: {
    height: 40,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: ScaleUtils.floorModerateScale(22),
    // borderColor: 'white',
    // borderWidth: 2,
    backgroundColor: '#FF6260',
    borderRadius: 10,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
})

