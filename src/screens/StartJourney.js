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

export default function StartJourney({ navigation }) {
    const { chosenRoute } = useSelector(selectLocation)
    const [updateTrip, { isError: isErrUpdate, isSuccess: isSuccessUpdate, error: errorUpdate }] = useUpdateTripMutation()

    const handleCloseTrip = async () => {
        await updateTrip({ status: "finished", trip_id: chosenRoute.key })
    }

    useEffect(() => {
        if (isSuccessUpdate) {
            Toast.show({
                type: 'successed',
                props: { message: 'Hoàn thành chuyến đi thành công !' }
            });
            navigation.navigate('home')
        }
        if (isErrUpdate) {
            Toast.show({
                type: 'invalid',
                props: { message: errorUpdate.data.error }
            });
        }
    }, [isSuccessUpdate, isErrUpdate])


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
