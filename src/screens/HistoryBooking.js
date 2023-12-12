import React, { useRef, useEffect, useState } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import Header from '../components/Header'
import PriceFormat from '../common/PriceFormat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import ScaleUtils from '../utils/ScaleUtils';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import { useUpdateTripMutation, useGetTicketBookedMutation, useGetUserInTripMutation, useDeleteTicketMutation } from '../services/ticketApi';
import Toast from 'react-native-toast-message';
import { selectLocation, setChosenRoute, setListUserInTrip, removeTicket } from '../features/ticket/locationSlice'
import { selectAuth } from '../features/auth/authSlice';

export default function HistoryBooking({navigation}) {
    const { finishedRoute, ticketBooked, availableRoute } = useSelector(selectLocation)
    const { userInfo } = useSelector(selectAuth)
    const dispatch = useDispatch()
  const [acceptRoute, setAcceptRoute] = useState([])
  const [updateTrip, { isError: isErrUpdate, isSuccess: isSuccessUpdate, error: errorUpdate }] = useUpdateTripMutation()
  const [deleteTicket, { data: dataDelete, isError: isErrDelete, isSuccess: isSuccessDelete, error: errorDelete }] = useDeleteTicketMutation();

  const [getUserInTrip, { data: userTrip, isError: isErrUserTrip, isSuccess: isSuccessUserTrip, error: errUserTrip }] = useGetUserInTripMutation()

    const handleTakeTrip = async (route) => {
        if(route.status ==='in_progress') {
            setAcceptRoute(route)
            // await updateTrip({ status: "in_progress", trip_id: route.key })
            await getUserInTrip({ trip_id: route.key })
        } else {
            Toast.show({
                type: 'invalid',
                props: { message: 'Chuyến đi này đã hoàn thành !' }
            })
        }
      }
      useEffect(() => {
        if (isSuccessUpdate) {
          dispatch(setChosenRoute(acceptRoute))
          navigation.navigate('startJourney')
    
        }
        if (isErrUpdate) {
          Toast.show({
            type: 'invalid',
            props: { message: errorUpdate.data.error }
          });
        }
      }, [isSuccessUpdate, isErrUpdate])

      useEffect(() => {
        if (isSuccessDelete) {
            Toast.show({
                type: 'successed',
                props: { message: dataDelete.data.msg || 'Xoá vé thành công' }
            })
            dispatch(removeTicket(dataDelete.data.ticket_id))
        }
        if (isErrDelete) {
          Toast.show({
            type: 'invalid',
            props: { message: errorDelete.data.error }
          });
        }
      }, [isSuccessDelete, isErrDelete])

      useEffect(() => {
        if (isSuccessUserTrip) {
          dispatch(setListUserInTrip(userTrip.data['customer']))
          dispatch(setChosenRoute(acceptRoute))
          navigation.navigate('startJourney')
        }
        if (isErrUserTrip) {
          Toast.show({
            type: 'invalid',
            props: { message: errUserTrip.data.error }
          });
        }
      }, [isSuccessUserTrip, isErrUserTrip])

      const handleDeleteTicket = async (item) => {
          await deleteTicket({ ticket_id: item.ticket_id })
      }

    const _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity key={index} style={styles.smallBox} onPress={() => handleTakeTrip(item)}>
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
                        <Text>{item.finished_at ? moment.utc(moment.duration(moment(item.finished_at).diff(moment(item.stage_created_at))).asMinutes() * 60 * 1000).format("HH:mm") : "Chưa có"}</Text>
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
                    <Text>Trạng thái </Text>
                    <Text>{viStatus(item.status)}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: ScaleUtils.floorModerateScale(15) }}>
                    <Text>Thời gian khởi hành </Text>
                    <Text>{formatDate(item.stage_created_at)}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: ScaleUtils.floorModerateScale(15) }}>
                    <Text>Thời gian lăn bánh </Text>
                    <Text>{item.moved_at ? formatDate(item.moved_at) : "Chưa có"}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: ScaleUtils.floorModerateScale(5) }}>
                    <Text>Hoàn thành lúc</Text>
                    <Text>{item.finished_at ? formatDate(item.finished_at) : "Chưa có"}</Text>
                </View>
            </TouchableOpacity>

        )
    }
    const viStatus = (status)=> {
        switch (status) {
            case 'in_progress':
                return "Đang thực hiện"
                case 'finished':
                    return "Đã xong"
            default:
                return 'Đã huỷ'
        }
    }
    const formatDate = date => {
        return moment(date).format('DD/MM/YYYY | HH:mm')
    };
    const _renderTicked = ({ item, index }) => {
        return (
            <View key={index} style={styles.smallBox}>
                <View style={{display: 'flex', justifyContent : "space-between", flexDirection : "row"}}>
                    <Text style={{ fontSize: 15, fontWeight: "bold",textAlign : "center" }}>
                        {item.from_location_name} - {item.to_location_name}
                    </Text>
                    <TouchableOpacity onPress={() => handleDeleteTicket(item)}> 
                        <MaterialCommunityIcons
                            name={"delete"}
                            size={23}
                            color="red"
                            style={{ marginRight: ScaleUtils.floorModerateScale(9) }}
                        />
                    </TouchableOpacity>
                </View>
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
                    <Text style={{color : "blue"}}>Điểm đón</Text>
                    <Text style={{color : "blue"}}>{item.from_location_name}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: ScaleUtils.floorModerateScale(15) }}>
                    <Text style={{color : "red", fontWeight: 'bold'}}>Điểm đang dừng</Text>
                    <Text style={{color : "red", fontWeight: 'bold'}}>{item.stop_location_name}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: ScaleUtils.floorModerateScale(15) }}>
                    <Text>Thời gian khởi hành</Text>
                    <Text>{item.started_at}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: ScaleUtils.floorModerateScale(15) }}>
                    <Text>Thời gian lăn bánh</Text>
                    <Text>{item.moved_at ? moment(item.moved_at).format('DD/MM/YYYY | HH:mm') : "Chưa có"}</Text>
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

