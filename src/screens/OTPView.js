import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Image, Text, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import Header from '../components/Header'
import ScaleUtils from '../utils/ScaleUtils'
import OTPInputView from '@twotalltotems/react-native-otp-input';
import ImageUltils from '../assets/Images/ImageUltils';
import Title from '../components/Title';
import { useVerifyOtpMutation, useSendOTPMutation } from '../services/authApi';
import Toast from 'react-native-toast-message';
import Loader from '../components/Loader';
import FastImage from 'react-native-fast-image';



export default function OTPView({ navigation, route }) {
  const [otp, setOTP] = useState();
  const [countdown, setCountdown] = useState(100);
  const [isFinished, setIsFinished] = useState(false);
  const [isFull, setIsFull] = useState(false)
  const [phone, setPhone] = useState(route.params.phoneNumber)
  const [isResend, setIsResend] = useState(false)
  const [verifyOtp, { isLoading, isError, isSuccess, error }] = useVerifyOtpMutation()
  const [sendOTP, { isLoading: isLoadResend, isSuccess: isSuccessResend, isError: isErrorResend, error: errResend }] = useSendOTPMutation()


  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prevCountdown => prevCountdown - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      setIsFinished(true);
    }
  }, [countdown]);

  useEffect(() => {
    if (isFull) {
      handleSendOtp()
    }
  }, [otp])

  useEffect(() => {
    if (isSuccess) {
      Toast.show({
        type: 'successed',
        props: { message: "Xác minh thành công!" }
      });
      navigation.navigate('register', { phoneNumber: phone })
    }
    if (isError) {
      Toast.show({
        type: 'invalid',
        props: { message: error.data.error }
      });
      setIsFull(false)
    }
  }, [isSuccess, isError])

  useEffect(() => {
    if (isSuccessResend) {
      Toast.show({
        type: 'successed',
        props: { message: "Đã gửi lại mã thành công! Vui lòng kiểm tra điện thoại." }
      });
      setCountdown(100)
      setIsFinished(false)
    }
    if (isErrorResend) {
      Toast.show({
        type: 'invalid',
        props: { message: error.data.error }
      });
      setIsFull(false)
    }
  }, [isSuccessResend, isErrorResend])

  const handleSendOtp = async () => {
    await verifyOtp({ phone, otp })
  }
  const handleResendOtp = async () => {
    await sendOTP({ phone })
  }


  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <Header
        goBack={navigation.goBack}
      />
      {isLoading ?
        <Loader /> :
        <View style={styles.container}>
          <FastImage
            style={styles.logoImage}
            source={ImageUltils.getImageSource(isFinished ? 'timeOut' : isFull ? 'fullOtp' : 'otpClear')}
            resizeMode='contain'
          />
          <View style={styles.welcomeView}>
            <Title>{isFinished ? "Oopss !!" : "OTP Verification"} </Title>
          </View>
          <Text style={{ fontSize: 15, fontWeight: '400', color: 'black' }}>We Will send you a one time password on </Text>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 15, fontWeight: '400', color: 'black' }}>this</Text>
            <Text style={{ fontSize: 15, fontWeight: '600', color: 'black' }}> Mobile Number</Text>
          </View>

          <Text style={{ fontSize: 16, fontWeight: '700', color: 'black', marginTop: 10 }}>{phone}</Text>
          <OTPInputView
            style={{ width: '80%', height: 130 }}
            pinCount={6}
            onCodeChanged={code => setOTP(code)}
            autoFocusOnLoad
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={(code => {
              setIsFull(true)
              setOTP(code)
            })}
          />
          {isFinished ?
            <TouchableOpacity onPress={handleResendOtp}>
              <Text style={{ fontSize: 15, fontWeight: '600', color: '#FF6260' }}>Send OTP again !</Text>
            </TouchableOpacity> :
            <Text style={{ fontSize: 15, fontWeight: '500' }}>Resend OTP in ({countdown})</Text>
          }

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
  logoImage: { height: ScaleUtils.floorModerateScale(200), width: ScaleUtils.floorModerateScale(250) },
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
  underlineStyleBase: {
    width: 45,
    height: 50,
    borderWidth: 1,
    borderBottomWidth: 1,
    color: "black",
    backgroundColor: "#F9F9F9",
    fontSize: 20,
    fontWeight: "600",
    borderRadius: 5,


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
  underlineStyleHighLighted: {
    borderColor: "#FF6260",
    borderBottomWidth: 2,
    backgroundColor: "white",



  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
})

