import React, { useRef, useEffect, useState } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import Header from '../components/Header'
import ImageUltils from '../assets/Images/ImageUltils';
import ScaleUtils from '../utils/ScaleUtils';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import { useUpdateTripMutation,useGetTripsMutation, useGetLocationMutation, useStopLocationTripMutation } from '../services/ticketApi';
import Toast from 'react-native-toast-message';
import { selectLocation,setAvailableRoute,setFinishedRoute, setLocationFrom, setLocationTo } from '../features/ticket/locationSlice'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dropdown } from 'react-native-element-dropdown';

export default function StartJourney({ navigation }) {
    const [stopLocation, setStopLocation] = useState(null)
    const { chosenRoute, listUserInTrip, locationFrom, locationTo } = useSelector(selectLocation)
    const [updateTrip, { isError: isErrUpdate, isSuccess: isSuccessUpdate, error: errorUpdate }] = useUpdateTripMutation()
    const [getTrips, { data: trips, isError: isErrTrip, isSuccess: isSuccessTrip, error: errTrip }] = useGetTripsMutation()
    const [getLocation, { data, isError, isSuccess, error }] = useGetLocationMutation()
    const [stopLocationTrip, {data: dataStop, isError: isErrorStop, isSuccess: isSuccessStop, error: errorStop}] = useStopLocationTripMutation()
    const [arrMapping, setArrMapping] = useState([])

    const dispatch = useDispatch()
    
    const handleBooking = async () => {
        await getLocation({ current: 1, pageSize: 15 })
      }
    const handleCloseTrip = async () => {
        await updateTrip({ status: "finished", trip_id: chosenRoute.key })
    }
    const handleGetTrips = async () => {
        await getTrips()
    }

    const handleStop = async () => {
        await stopLocationTrip({location_id: stopLocation.value, trip_id: chosenRoute.key})
    }

    useEffect(() => {
        if (isSuccessStop) {
          Toast.show({
            type: 'successed',
            props: { message: dataStop.data?.msg || 'Đã dừng chuyến !' }
          });
          handleGetTrips()
        }
        if (isErrorStop) {
          Toast.show({
            type: 'invalid',
            props: { message: errorStop.data.error }
          });
        }
      }, [isSuccessStop, isErrorStop])

    useEffect(() => {
        if (isSuccess) {
          dispatch(setLocationFrom(data.data.data.filter(item => item.type == "from")))
          dispatch(setLocationTo(data.data.data.filter(item => item.type == "to")))
        }
        if (isError) {
          Toast.show({
            type: 'invalid',
            props: { message: error.data.error }
          });
        }
      }, [isSuccess, isError])

    useEffect(() => {
        if (isSuccessUpdate) {
            Toast.show({
                type: 'successed',
                props: { message: 'Hoàn thành chuyến đi thành công !' }
            });
            handleGetTrips()
            navigation.navigate('home')
        }
        if (isErrUpdate) {
            Toast.show({
                type: 'invalid',
                props: { message: errorUpdate.data.error }
            });
        }
    }, [isSuccessUpdate, isErrUpdate])

    useEffect(() => {
        if (isSuccessTrip) {
            dispatch(setFinishedRoute(trips.data.filter(item => item.status == "finished")))
            dispatch(setAvailableRoute(trips.data.filter(item => item.status == "new")))
        }
        if (isErrTrip) {
            Toast.show({
                type: 'invalid',
                props: { message: errTrip?.data?.error || "Đang xảy ra lỗi! Vui lòng thử lại"}
            });
        }
    }, [isSuccessTrip, isErrTrip])


    useEffect(() => {
        handleBooking()
    }, [])

useEffect(() => {
    setArrMapping([
        ...locationFrom,
        ...locationTo
    ])

    if(chosenRoute.stop_location_id) {
        const findItem = arrMapping.find(item => item.key == chosenRoute.stop_location_id)
        if(findItem) {
            setStopLocation({
                label: findItem.vi_name,
                value: findItem.key
            })
        }
      }
}, [locationFrom, locationTo, chosenRoute])


    const _renderItem = ({ item, index }) => {
        return (
            <View key={index} style={styles.smallBox}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>{item.fullname}</Text>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: ScaleUtils.floorModerateScale(15) }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <MaterialCommunityIcons
                            name={"cellphone"}
                            size={23}
                            color="red"
                            style={{ marginRight: ScaleUtils.floorModerateScale(8) }}
                        />
                        <Text style = {{fontSize : 15,fontWeight : "600"}}>{item.phone}</Text>
                    </View>
                     <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <MaterialCommunityIcons
                            name={"ticket-account"}
                            size={23}
                            color="red"
                            style={{ marginRight: ScaleUtils.floorModerateScale(8) }}
                        />
                        <Text style = {{fontSize : 15,fontWeight : "600"}}>{item.ticket_user_buy} vé</Text>
                    </View>
                </View>
            </View>

        )
    }
    return (
        <View style={{ backgroundColor: "white", flex: 1 }}>
            <Header
                bgColor={"#FF6260"}
                noIcon={true}
                title={`${chosenRoute.from_location_name} - ${chosenRoute.to_location_name}`}
            />
            <View style={{ borderBottomWidth: 2, justifyContent: "space-around", flexDirection: "row", alignItems: "center", flexWrap: "wrap" }}>
                <FastImage
                    style={{ width: ScaleUtils.floorModerateScale(130), height: ScaleUtils.floorModerateScale(130) }}
                    source={ImageUltils.getImageSource('runningCar')}
                    resizeMode='contain'
                />
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Đang thực hiện chuyến đi ...</Text>
            </View>
            <View style={{padding: ScaleUtils.floorModerateScale(15), borderBottomColor: 'black', borderBottomWidth: 2, display: 'flex'}}>
                  <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={[styles.placeholderStyle]}
                    selectedTextStyle={[styles.selectedTextStyle]}
                    data={arrMapping.map(item => ({
                      label: `${item.vi_name}`,
                      value: item.key
                    }))}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Chọn điểm dừng"
                    renderRightIcon={false}
                    value={stopLocation}
                    onChange={item => {
                      setStopLocation(item);
                    }}
                  />
                <TouchableOpacity onPress={handleStop}>
                    <View
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "red",
                            height: 50,
                        }}
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
                            Dừng
                        </Text>
                    </View>
                </TouchableOpacity>
                </View>
            <FlatList
                data={listUserInTrip}
                renderItem={_renderItem}
                keyExtractor={(item, index) => index.toString()}
                style={{padding : ScaleUtils.floorModerateScale(15) }}
            />
            <View
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0
                }}
            >
                <TouchableOpacity
                    onPress={() => handleCloseTrip()}
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#FF6260",
                        height: 50,
                    }}>
                    <Text
                        style={[
                            {
                                color: 'white',
                                fontSize: 20,
                                fontWeight: 'bold',
                            }
                        ]}
                    >
                        Kết thúc chuyến đi
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    dropdown: {
        marginBottom: 16,
        borderWidth: 1,
        borderBottomColor: 'black',
        borderRadius: 10,
        paddingLeft: 10,
    },
    dropdownSeat: {
        height: ScaleUtils.floorModerateScale(30),
        width: ScaleUtils.floorModerateScale(50)
    },
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
    btnModal : {
      backgroundColor : "#FF6260",
      padding : ScaleUtils.floorModerateScale(10)
    }
  
  })
  
