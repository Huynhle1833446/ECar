import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Image, Text, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import Header from '../components/Header'
import ImageUltils from '../assets/Images/ImageUltils'
import ScaleUtils from '../utils/ScaleUtils'
import Title from '../components/Title'
import { register, useRegisterMutation } from '../services/authApi'
import Toast from 'react-native-toast-message';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image'

export default function RegisterView({ navigation, route }) {
  const [dataUser, setDataUser] = useState({
    fullname: "",
    username: "",
    phone: route.params.phoneNumber,
    password: ""
  })
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);
  const [register, { isLoading, isError, isSuccess, error }] = useRegisterMutation()


  const handleSignUp = async () => {
    await register(dataUser)
  }

  useEffect(() => {
    if (isSuccess) {
      Toast.show({
        type: 'successed',
        props: { message: "Tạo tài khoản thành công !" }
      });
      setDataUser((prevState) => ({ ...prevState, fullname: "", password: "", phone: "", username: "" }))
      navigation.navigate('login')
    }
    if (isError) {
      Toast.show({
        type: 'invalid',
        props: { message: error.data.error }
      });
    }
  }, [isSuccess, isError])



  return (
    <View style={styles.container}>
      <Header
        goBack={navigation.goBack}
      />
      <View style={styles.container}>
        <FastImage
          style={styles.logoImage}
          source={ImageUltils.getImageSource('logo')}
          resizeMode='contain'

        />
        <View style={styles.welcomeView}>
          <Title>Let's Start Together</Title>
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
                  placeholder='Fullname'
                  style={styles.inputForm}
                  value={dataUser.fullname}
                  onChangeText={text => {
                    setDataUser((prevState) => ({ ...prevState, fullname: text }))
                  }}

                />
              </View>
              <View style={{ marginTop: 30 }} />
              <View style={styles.inputContainer}>
                <TextInput
                  autoCapitalize='none'
                  selectTextOnFocus
                  underlineColorAndroid="transparent"
                  keyboardType="default"
                  placeholder='Username'
                  style={styles.inputForm}
                  value={dataUser.username}
                  onChangeText={text => {
                    setDataUser((prevState) => ({ ...prevState, username: text }))
                  }}

                />
              </View>
              <View style={{ marginTop: 30 }} />
              <View style={styles.inputContainer}>
                <TextInput
                  autoCapitalize='none'
                  selectTextOnFocus
                  underlineColorAndroid="transparent"
                  placeholder='Password'
                  style={styles.inputForm}
                  value={dataUser.password}
                  onChangeText={text => {
                    setDataUser((prevState) => ({ ...prevState, password: text }))
                  }}
                  secureTextEntry={isSecureTextEntry}

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

              <View style={styles.welcomeView}>
                <TouchableOpacity
                  onPress={handleSignUp}
                >
                  <View style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>SIGN UP</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{ alignItems: 'center', justifyContent: "center", marginTop: ScaleUtils.floorModerateScale(10), flexDirection: "row" }}>
                <Text style={{ fontSize: 14, fontWeight: "400", color: "black" }}>Already Joined Us? </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('login')}
                >
                  <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#FF6260' }}>Go Here !</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
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
  logoImage: { height: ScaleUtils.floorModerateScale(120), width: ScaleUtils.floorModerateScale(120) },
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
    alignItems: 'center'
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
