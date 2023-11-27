import React, { useRef, useEffect } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
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
import {logoutUser} from '../features/auth/authSlice'

export default function AccountManagement({ navigation }) {
    const { userInfo } = useSelector(selectAuth)
    const dispatch = useDispatch()
    const handleLogOut = () => {
        dispatch(logoutUser())
    }
    
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
});

