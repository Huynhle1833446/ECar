import React, { useRef, useEffect } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, FlatList, KeyboardAvoidingView, TextInput } from 'react-native'
import Header from '../components/Header'
import ImageUltils from '../assets/Images/ImageUltils';
import ScaleUtils from '../utils/ScaleUtils';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import { useUpdateTripMutation } from '../services/ticketApi';
import Toast from 'react-native-toast-message';
import { selectLocation } from '../features/ticket/locationSlice'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient'
import { selectAuth } from '../features/auth/authSlice';
import {logoutUser,} from '../features/auth/authSlice'
import Modal from "react-native-modal";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useChangePasswordMutation } from '../services/userApi'
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function AccountManagement({ navigation }) {
    const { userInfo } = useSelector(selectAuth);
    const [isOpenModalChangePassword, setIsOpenModalChangePassword] = React.useState(false);
    const [isSecureTextEntryOld, setIsSecureTextEntryOld] = React.useState(true);
    const [isSecureTextEntryNew, setIsSecureTextEntryNew] = React.useState(true);
    const [isSecureTextEntryNewConfirm, setIsSecureTextEntryNewConfirm] = React.useState(true);
    const [oldPass, setOldPass] = React.useState('');
    const [newPass, setNewPass] = React.useState('');
    const [confirmNewPass, setConfirmNewPass] = React.useState('');
    const [alertError, setAlertError] = React.useState('');
    const [changePassword, { isLoading, data, isError, isSuccess, error }] = useChangePasswordMutation()
    const dispatch = useDispatch()
    const handleLogOut = async () => {
        dispatch(logoutUser())
        await AsyncStorage.removeItem('user');
    }
    
    const handleChangePassword = () => {
        setIsOpenModalChangePassword(true);
    }

    const handleCloseModalChangePassword = () => {
        setIsOpenModalChangePassword(false);
    }

    const check = () => {
        let flag = true;
        if(oldPass.trim() === '' || newPass.trim() === '' || confirmNewPass.trim() === '') {
            flag = false;
            setAlertError('Vui lòng điền đầy đủ thông tin')
        } else if(newPass !== confirmNewPass) {
            flag = false;
            setAlertError('Mật khẩu mới không khớp')
        } else if(newPass === oldPass) {
            flag = false;
            setAlertError('Mật khẩu mới trùng với mật khẩu cũ')
        }
        return flag;
    }

    const proceedChangePassword = async () => {
        const bool = check();
        if(bool) {
            const username = userInfo.username;
            const oldPassword = oldPass;
            const newPassword = newPass;
            await changePassword({ username, oldPassword, newPassword })
        }
    }
    useEffect(() => {
        if (isSuccess) {
            setIsOpenModalChangePassword(false);
            setTimeout(() => {
                Toast.show({
                    type: 'successed',
                    props: { message: data.data || "Đã đổi mật khẩu thành công !" }
                });
            }, 500);
        }
        if (isError) {
            console.log('e', error)
            setAlertError(error.data.error);
            Toast.show({
                type: 'invalid',
                props: { message: error.data.error }
            });
        }
      }, [isSuccess, isError])
    
    return (
        <View style={{ backgroundColor: "white", flex: 1 }}>
            {/* <View style={{ flexDirection: "column", alignItems : "center", marginTop : ScaleUtils.floorModerateScale(15) }}>
                <FontAwesome
                    name={'user-circle'}
                    style={styles.icon}
                    size={120}
                    color="red"
                />
                <View></View>
            </View> */}
            <Modal
            onBackdropPress={() => setIsOpenModalChangePassword(false)}
            isVisible={isOpenModalChangePassword}
            backdropOpacity={0.8}
            animationIn="zoomInDown"
            animationOut="zoomOutUp"
            animationInTiming={600}
            animationOutTiming={600}
            backdropTransitionInTiming={600}
            backdropTransitionOutTiming={600}
          >
                <View style={{
                    backgroundColor: 'white',
                    padding: 22,
                    justifyContent: 'center',
                    borderRadius: 4,
                    borderColor: 'rgba(0, 0, 0, 0.1)'
                }}>
                     <Text style = {{fontSize : 20, fontWeight : "bold", textAlign: 'center'}}>Đổi mật khẩu</Text>
                    <View style={{ paddingVertical: ScaleUtils.floorModerateScale(20) }}>
                        <KeyboardAvoidingView>
                            <View>
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        secureTextEntry={isSecureTextEntryOld}
                                        autoCapitalize='none'
                                        selectTextOnFocus
                                        underlineColorAndroid="transparent"
                                        keyboardType="default"
                                        placeholder='Mật khẩu cũ'
                                        value={oldPass}
                                        onChangeText={text => {
                                            setOldPass(text);
                                        }}
                                        style={styles.inputForm}
                                    />
                                     <TouchableOpacity
                                        style={{ width: 50, alignItems: 'flex-end', paddingRight: 10 }}
                                        onPress={() => setIsSecureTextEntryOld(!isSecureTextEntryOld)}>
                                        <Ionicons
                                            name={isSecureTextEntryOld ? 'ios-eye-off' : 'ios-eye'}
                                            size={20}
                                            color="#FF6260"
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        autoCapitalize='none'
                                        selectTextOnFocus
                                        value={newPass}
                                        onChangeText={text => {
                                            setNewPass(text)
                                        }}
                                        underlineColorAndroid="transparent"
                                        secureTextEntry={isSecureTextEntryNew}
                                        placeholder='Mật khẩu mới'
                                        style={styles.inputForm}

                                    />
                                    <TouchableOpacity
                                        style={{ width: 50, alignItems: 'flex-end', paddingRight: 10 }}
                                        onPress={() => setIsSecureTextEntryNew(!isSecureTextEntryNew)}>
                                        <Ionicons
                                            name={isSecureTextEntryNew ? 'ios-eye-off' : 'ios-eye'}
                                            size={20}
                                            color="#FF6260"
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        autoCapitalize='none'
                                        selectTextOnFocus
                                        value={confirmNewPass}
                                        onChangeText={text => {
                                            setConfirmNewPass(text)
                                        }}
                                        underlineColorAndroid="transparent"
                                        secureTextEntry={isSecureTextEntryNewConfirm}
                                        placeholder='Xác nhận khẩu mới'
                                        style={styles.inputForm}

                                    />
                                    <TouchableOpacity
                                        style={{ width: 50, alignItems: 'flex-end', paddingRight: 10 }}
                                        onPress={() => setIsSecureTextEntryNewConfirm(!isSecureTextEntryNewConfirm)}>
                                        <Ionicons
                                            name={isSecureTextEntryNewConfirm ? 'ios-eye-off' : 'ios-eye'}
                                            size={20}
                                            color="#FF6260"
                                        />
                                    </TouchableOpacity>
                                </View>
                                {
                                    alertError !== '' && (
                                        <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                            <Text style={{ color: 'red' }}>{alertError}</Text>
                                        </View>
                                    )
                                }
                                <View >
                                    <TouchableOpacity
                                        onPress={proceedChangePassword}
                                    >
                                        <View style={styles.loginButton}>
                                            <Text style={styles.loginButtonText}>Thực hiện</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                               
                            </View>
                        </KeyboardAvoidingView>
                    </View>
                </View>
            </Modal>
            <LinearGradient colors={['rgba(255, 98, 96, 1)', 'rgba(255, 98, 96, 0)']} style={{ padding: ScaleUtils.floorModerateScale(10), alignItems: "center" }}>
                <FontAwesome
                    name={'user-circle'}
                    style={styles.icon}
                    size={70}
                    color="white"
                />
                <Text style={{ fontSize: 25, fontWeight: "bold" }}>{userInfo.fullname}</Text>
                <Text style={{ fontSize: 15, fontWeight: "600", marginTop: ScaleUtils.floorModerateScale(8) }}>{userInfo.phone}</Text>
            </LinearGradient>
            <View
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0
                }}
            >   
             <TouchableOpacity
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#E48700",
                        height: 50,
                    }}
                    onPress={() => handleChangePassword()}
                    >
                    <Text
                        style={[
                            {
                                color: 'white',
                                fontSize: 20,
                                fontWeight: 'bold',
                            }
                        ]}
                    >
                        Đổi mật khẩu
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#FF6260",
                        height: 50,
                    }}
                    onPress={() => handleLogOut()}
                    >
                    <Text
                        style={[
                            {
                                color: 'white',
                                fontSize: 20,
                                fontWeight: 'bold',
                            }
                        ]}
                    >
                        Đăng xuất
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    rowSetting: {
        margin: 10,
        zIndex: 1,
        marginHorizontal: 30,
        padding: 5,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: "#D3D3D3",
    },
    menuSetting: {
        margin: 10,
        zIndex: 1,
        marginHorizontal: 30,
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: "#D3D3D3",
    },
    icon: {
        paddingHorizontal: 15,
    },
    inputContainer: {
        marginBottom: 16,
        borderWidth: 1,
        borderBottomColor: 'black',
        flexDirection: 'row',
        justifyContent: 'center',
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
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: ScaleUtils.floorModerateScale(22),
        // borderColor: 'white',
        // borderWidth: 2,
        backgroundColor: '#E48700',
        borderRadius: 10,
      },
      loginButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
      },
      welcomeView: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: ScaleUtils.floorModerateScale(10)
      },
});

