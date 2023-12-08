import React, { useRef, useEffect } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import Header from '../components/Header'
import PriceFormat from '../common/PriceFormat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import ScaleUtils from '../utils/ScaleUtils';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import { useUpdateTripMutation } from '../services/ticketApi';
import Toast from 'react-native-toast-message';
import { selectLocation } from '../features/ticket/locationSlice'
import { selectAuth } from '../features/auth/authSlice';

export default function HistoryBooking() {
    const { finishedRoute, ticketBooked } = useSelector(selectLocation)
    const { userInfo } = useSelector(selectAuth)


    const _renderItem = ({ item, index }) => {
        return (
            <View key={index} style={styles.smallBox}>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>{item.from_location_name} - {item.to_location_name}</Text>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: ScaleUtils.floorModerateScale(15) }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <MaterialCommunityIcons
                            name={"ticket-account"}
                            size={23}
                            color="red"
                            style={{ marginRight: ScaleUtils.floorModerateScale(5) }}
                        />
                        <Text>{item.total_slot_ticket || 0} vé</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <AntDesign
                            name={"clockcircleo"}
                            size={23}
                            color="red"
                            style={{ marginRight: ScaleUtils.floorModerateScale(5) }}
                        />
                        <Text>{moment.utc(moment.duration(moment(item.finished_at).diff(moment(item.stage_created_at))).asMinutes() * 60 * 1000).format("HH:mm")}</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <AntDesign
                            name={"creditcard"}
                            size={23}
                            color="red"
                            style={{ marginRight: ScaleUtils.floorModerateScale(5) }}
                        />
                        <Text>Tổng thu : {PriceFormat.formatString(item.price * Number(item.total_slot_ticket))}đ</Text>
                    </View>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: ScaleUtils.floorModerateScale(15) }}>
                    <Text>Thời gian khởi hành </Text>
                    <Text>{formatDate(item.stage_created_at)}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: ScaleUtils.floorModerateScale(5) }}>
                    <Text>Hoàn thành lúc</Text>
                    <Text>{formatDate(item.finished_at)}</Text>
                </View>
            </View>

        )
    }
    const formatDate = date => {
        return moment(date).format('DD/MM/YYYY | HH:mm')
    };
    const _renderTicked = ({ item, index }) => {
        return (
            <View key={index} style={styles.smallBox}>
                <Text style={{ fontSize: 15, fontWeight: "bold",textAlign : "center" }}>{item.from_location_name} - {item.to_location_name}</Text>
                <View style={{ flexDirection: "row", marginTop: ScaleUtils.floorModerateScale(15),alignItems : "center",justifyContent : "space-between" }}>
                    <View style = {{flexDirection : "column"}}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <MaterialCommunityIcons
                                name={"ticket-account"}
                                size={23}
                                color="red"
                                style={{ marginRight: ScaleUtils.floorModerateScale(9) }}
                            />
                            <Text>Vé đã mua : {item.ticket_buy_slot}</Text>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: ScaleUtils.floorModerateScale(7) }}>
                            <AntDesign
                                name={"creditcard"}
                                size={23}
                                color="red"
                                style={{ marginRight: ScaleUtils.floorModerateScale(9) }}
                            />
                            <Text>Đã trả : {PriceFormat.formatString(item.price * Number(item.ticket_buy_slot))}đ</Text>
                        </View>
                    </View>

                    <View style = {{flexDirection : "column"}}>
                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: ScaleUtils.floorModerateScale(7) }}>
                            <AntDesign
                                name={"user"}
                                size={23}
                                color="red"
                                style={{ marginRight: ScaleUtils.floorModerateScale(9) }}
                            />
                            <Text>Tài xế : {item.driver_name}</Text>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: ScaleUtils.floorModerateScale(7) }}>
                            <AntDesign
                                name={"info"}
                                size={23}
                                color="red"
                                style={{ marginRight: ScaleUtils.floorModerateScale(9) }}
                            />
                            <Text>Biển số : {item.number_plate}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: ScaleUtils.floorModerateScale(15) }}>
                    <Text>Thời gian khởi hành</Text>
                    <Text>{item.started_at}</Text>
                </View>
            </View>

        )
    }

    return (
        <View style={{ backgroundColor: "white", flex: 1 }}>
            <Header
                bgColor={"#FF6260"}
                noIcon={true}
                title={userInfo['role'] == 'staff' ? `Lịch sử chuyến đi của tài xế ${userInfo.username}` : `Lịch sử đặt vé của ${userInfo.username}`}
            />
            {userInfo['role'] == 'staff' ?
                <FlatList
                    data={finishedRoute}
                    renderItem={_renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    style={{ padding: ScaleUtils.floorModerateScale(10) }}
                /> :
                <FlatList
                    data={ticketBooked}
                    renderItem={_renderTicked}
                    keyExtractor={(item, index) => index.toString()}
                    style={{ padding: ScaleUtils.floorModerateScale(10) }}
                />}
        </View>
    )
}
const styles = StyleSheet.create({
    logoIcon: {
        width: ScaleUtils.floorModerateScale(50),
        height: ScaleUtils.floorModerateScale(50),
    },
    containerFunction: {
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: ScaleUtils.floorModerateScale(20),
        borderWidth: 1,
        borderRadius: 5,
        padding: ScaleUtils.floorModerateScale(10),
        borderColor: "#D3D3D3",
    },
    smallBox: {
        marginTop: ScaleUtils.floorModerateScale(15),
        padding: ScaleUtils.floorModerateScale(10),
        borderWidth: 1,
        borderRadius: 10
    },
    containerModal: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    btnModal: {
        backgroundColor: "#FF6260",
        padding: ScaleUtils.floorModerateScale(10)
    }

})

