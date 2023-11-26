import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Button, FlatList } from 'react-native'
import ScaleUtils from '../utils/ScaleUtils'
import { Dropdown } from 'react-native-element-dropdown';
import { useSelector } from 'react-redux'
import { selectLocation } from '../features/ticket/locationSlice'
import { useBookingTicketMutation } from '../services/ticketApi';
import Entypo from 'react-native-vector-icons/Entypo'
import PriceFormat from '../common/PriceFormat'
import moment from 'moment';
import Header from '../components/Header'
import { selectAuth } from '../features/auth/authSlice';
import Toast from 'react-native-toast-message';

export default function TicketDetail({ navigation, route }) {
    const [ticketDetail, setTicketDetail] = useState(route.params.ticketInfo)
    const { userInfo } = useSelector(selectAuth)
    const [bookingTicket, { isLoading, data, isError, isSuccess, error }] = useBookingTicketMutation()


    const formatDate = date => {
        return moment(date).format('HH:mm - DD/MM/YYYY')
    };

    const handleBooking = async () => {
        await bookingTicket({ trip_id: ticketDetail['key'], count_slot: route.params.seats })
    }

    useEffect(() => {
        if (isSuccess) {
            Toast.show({
                type: 'successed',
                props: { message: "Đặt vé thành công !" }
            });
            navigation.navigate('home')
        }
        if (isError) {
            Toast.show({
                type: 'invalid',
                props: { message: error.data.error }
            });
        }
    }, [isSuccess, isError])



    return (
        <View style={{ flex: 1 }}>
            <Header
                goBack={navigation.goBack}
                bgColor={"#FF6260"}
                iconColor={"#FFF"}
                title={"Thông tin thanh toán"}
            />
            <View style={{ backgroundColor: "white", flex: 1, padding: ScaleUtils.floorModerateScale(15) }}>
                <View style={{ flex: 1, backgroundColor: "white" }}>
                    <Text style={{ fontWeight: "bold", fontSize: 20 }}>Thông tin vé</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: ScaleUtils.floorModerateScale(10) }}>
                        <View style={{ flexDirection: "column" }}>
                            <Text style={{ fontWeight: "600", fontSize: 17 }}>Điểm đón</Text>
                            <Text style={{ fontWeight: "600", fontSize: 17, marginTop: ScaleUtils.floorModerateScale(5) }}>Điểm trả</Text>
                            <Text style={{ fontWeight: "600", fontSize: 17, marginTop: ScaleUtils.floorModerateScale(5) }}>Chuyến</Text>
                            <Text style={{ fontWeight: "600", fontSize: 17, marginTop: ScaleUtils.floorModerateScale(5) }}>Loại xe</Text>
                            <Text style={{ fontWeight: "600", fontSize: 17, marginTop: ScaleUtils.floorModerateScale(5) }}>Số vé</Text>
                            <Text style={{ fontWeight: "600", fontSize: 17, marginTop: ScaleUtils.floorModerateScale(5) }}>Tạm tính</Text>
                        </View>
                        <View style={{ flexDirection: "column" }}>
                            <Text style={{ fontWeight: "500", fontSize: 17 }}>{ticketDetail.from_location_name}</Text>
                            <Text style={{ fontWeight: "600", fontSize: 17, marginTop: ScaleUtils.floorModerateScale(5) }}>{ticketDetail.to_location_name}</Text>
                            <Text style={{ fontWeight: "600", fontSize: 17, marginTop: ScaleUtils.floorModerateScale(5) }}>{formatDate(ticketDetail.started_at)}</Text>
                            <Text style={{ fontWeight: "600", fontSize: 17, marginTop: ScaleUtils.floorModerateScale(5) }}>{ticketDetail.car_name}</Text>
                            <Text style={{ fontWeight: "600", fontSize: 17, marginTop: ScaleUtils.floorModerateScale(5) }}>{route.params.seats}</Text>
                            <Text style={{ fontWeight: "600", fontSize: 17, marginTop: ScaleUtils.floorModerateScale(5) }}>{PriceFormat.formatString(ticketDetail.price * route.params.seats)}đ</Text>
                        </View>
                    </View>

                    <View style={{ borderTopColor: "red", borderTopWidth: 1, marginTop: ScaleUtils.floorModerateScale(20), marginBottom: ScaleUtils.floorModerateScale(20) }} />

                    <Text style={{ fontWeight: "bold", fontSize: 20 }}>Thông tin người mua vé</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: ScaleUtils.floorModerateScale(10) }}>
                        <View style={{ flexDirection: "column" }}>
                            <Text style={{ fontWeight: "600", fontSize: 17 }}>Họ và tên</Text>
                            <Text style={{ fontWeight: "600", fontSize: 17, marginTop: ScaleUtils.floorModerateScale(5) }}>Số điện thoại</Text>
                        </View>
                        <View style={{ flexDirection: "column" }}>
                            <Text style={{ fontWeight: "500", fontSize: 17 }}>{userInfo.fullname}</Text>
                            <Text style={{ fontWeight: "500", fontSize: 17, marginTop: ScaleUtils.floorModerateScale(5) }}>{userInfo.phone}</Text>
                        </View>
                    </View>
                </View>
            </View>

            <TouchableOpacity
            onPress={handleBooking}
            style={{
                height: ScaleUtils.floorModerateScale(50),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#FF6260'
            }}>
                <Text style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 23,
                }}>Đặt vé</Text>
            </TouchableOpacity>

        </View>
    )
}
const styles = StyleSheet.create({
    iconCompleted: {
        flexDirection: 'column',
        alignItems: 'center',
        height: 200,
    },
    dash: {
        height: ScaleUtils.floorModerateScale(50),
        alignContent: 'flex-start',
        alignSelf: 'flex-start',
        flexDirection: 'column',
        backgroundColor: "red",
        borderWidth: 1,
        borderRadius: 10,
        borderStyle: "dashed"

    },
});
