import React from 'react'
import { View, StyleSheet, Image, Text, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import Header from '../components/Header'
import ImageUltils from '../assets/Images/ImageUltils'
import ScaleUtils from '../utils/ScaleUtils'
import Title from '../components/Title'
import { useState } from 'react'
import { sendOTP, useSendOTPMutation } from '../services/authApi'
import { useEffect } from 'react'
import Loader from '../components/Loader'
import Toast from 'react-native-toast-message';
import FastImage from 'react-native-fast-image'
import { useDispatch } from 'react-redux'

export default function PhoneRegister({ navigation }) {

  const [phone, setPhone] = useState('')
  const [isValidPhone, setIsValidPhone] = useState(true)
  const [sendOTP, { isLoading, isSuccess, isError, error }] = useSendOTPMutation()
  const dispatch = useDispatch()


  const onChangeNum = (text) => {
    if (!text.length) {
      setIsValidPhone(true)

    } else {
      let regex = /(0)(3|5|7|8|9)+([0-9]{8})\b/;
      let isValidPhone = regex.test(text)

      if (isValidPhone) {
        setIsValidPhone(true)
      } else {
        setIsValidPhone(false)
      }
    }
    setPhone(text)
  }

  const handleSendOTP = async () => {
    await sendOTP({ phone })
  }

  useEffect(() => {
    if (isSuccess) {
      navigation.navigate('otpValid', { phoneNumber: phone })
    }
    if (isError) {
      Toast.show({
        type: 'invalid',
        props: { message: "Đã có lỗi xảy ra. Vui lòng thử lại !" }
      });
    }
  }, [isSuccess, isError])




  return (
    <View style={styles.container}>
      <Header
        goBack={navigation.goBack}
      />
      {isLoading ?
        <Loader /> :
        <View style={styles.container}>
          <FastImage
            style={styles.logoImage}
            source={ImageUltils.getImageSource('elecCar')}
            resizeMode='contain'

          />
          <View style={styles.welcomeView}>
            <Title>ON CHARGING</Title>
          </View>
          <View style={{ paddingVertical: ScaleUtils.floorModerateScale(20) }}>
            <KeyboardAvoidingView>
              <View>
                <View style={styles.inputContainer}>
                  <TextInput
                    autoCapitalize='none'
                    selectTextOnFocus
                    underlineColorAndroid="transparent"
                    keyboardType="number-pad"
                    placeholder='Your Phone Number'
                    style={styles.inputForm}
                    value={phone}
                    onChangeText={onChangeNum}


                  />

                </View>
                {!isValidPhone ? <Text style={{ fontSize: 15, fontWeight: "500", color: "#FF6260", marginTop: 5 }}>Your phone number is invalid !</Text> : null}


                <View style={styles.welcomeView}>
                  <TouchableOpacity disabled={phone == "" || !isValidPhone ? true : false}
                    onPress={handleSendOTP}
                  >
                    <View style={phone == "" || !isValidPhone ? { ...styles.loginButton, ...styles.disableButton } : styles.loginButton}>
                      <Text style={styles.loginButtonText}>CONTINUE</Text>
                    </View>
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
  logoImage: { height: ScaleUtils.floorModerateScale(250), width: ScaleUtils.floorModerateScale(250) },
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
    borderRadius: 10
  },
  inputForm: {
    height: 40,
    flex: 1,
    paddingBottom: 10,
    color: 'red',
    paddingLeft: 10

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
  disableButton: {
    backgroundColor: "#ccc",
    color: "#999"
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
})
