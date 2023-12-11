import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Button, FlatList } from 'react-native'
import ScaleUtils from '../utils/ScaleUtils'
import ImageUltils from '../assets/Images/ImageUltils'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import DatePicker from 'react-native-date-picker'
import { Dropdown } from 'react-native-element-dropdown';
import { useSelector } from 'react-redux'
import { selectLocation } from '../features/ticket/locationSlice'
import { useGetRouteMutation } from '../services/ticketApi';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import PriceFormat from '../common/PriceFormat'
import moment from 'moment';
import Toast from 'react-native-toast-message';

export default function CreateRoute({ navigation }) {
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const weekday = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
    const [valueFrom, setValueFrom] = useState(null);
    const [valueTo, setValueTo] = useState(null);
    const [valueSeat, setValueSeat] = useState(1);
    const [listRoute, setListRoute] = useState([])
    const { locationFrom, locationTo } = useSelector(selectLocation)
    const [getRoute, { isLoading, data, isError, isSuccess, error }] = useGetRouteMutation()

    const handleFindTicket = async () => {
        let formatDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        await getRoute({ from_location_id: valueFrom, to_location_id: valueTo, started_at: formatDate })
    }
    const formatDate = date => {
        return moment(date).format('DD/MM/YYYY | HH:mm')
    };
    const handleConfirm = (item) => {
        navigation.navigate("ticketDetail", {ticketInfo : item, seats : valueSeat})
    }

    useEffect(() => {
        if (isSuccess) {
            setListRoute(data.data)
        }
        if (isError) {
            Toast.show({
                type: 'invalid',
                props: { message: error.data.error }
            });
        }
    }, [isSuccess, isError])


    const _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity  key={index} style={styles.smallBox} onPress={() => handleConfirm(item)}>
                <View  style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <View style={{ flexDirection: "row" }}>
                        <FastImage
                            style={styles.logoImage}
                            source={ImageUltils.getImageSource('avtDriver')}
                            resizeMode='contain'
                        />
                        <View style={{ flexDirection: "column" }}>
                            <Text style={{ fontSize: 18, fontWeight: "700" }}>{item.driver_name}</Text>
                            <Text style={{ fontSize: 16, fontWeight: "600", marginTop: ScaleUtils.floorModerateScale(5) }}>{item.car_name}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: "column" }}>
                        <Text style={{ borderWidth: 1, backgroundColor: "green", color: 'white', padding: ScaleUtils.floorModerateScale(3), textAlign: "center", borderColor: "white" }}>Active</Text>
                        <Text style={{ fontSize: 16, fontWeight: "700", marginTop: ScaleUtils.floorModerateScale(5) }}>{item.number_plate}</Text>
                    </View>


                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: ScaleUtils.floorModerateScale(15) }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <MaterialCommunityIcons
                            name={"car-seat"}
                            size={20}
                            color="red"
                            style={{ marginRight: ScaleUtils.floorModerateScale(8) }}
                        />
                        <Text>Còn lại {item.slot_remain} chỗ</Text>
                    </View>
                    {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <AntDesign
                            name={"clockcircleo"}
                            size={20}
                            color="red"
                            style={{ marginRight: ScaleUtils.floorModerateScale(8) }}
                        />
                        <Text>15 phút</Text>
                    </View> */}
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <AntDesign
                            name={"creditcard"}
                            size={20}
                            color="red"
                            style={{ marginRight: ScaleUtils.floorModerateScale(8) }}
                        />
                        <Text>{PriceFormat.formatString(item.price)}đ</Text>
                    </View>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: ScaleUtils.floorModerateScale(15) }}>
                    <Text>Thời gian khởi hành</Text>
                    <Text>{formatDate(item.started_at)}</Text>
                </View>
            </TouchableOpacity>
        )
    }



    return (
        <View style={{ backgroundColor: "white", flex: 1 }}>
            <DatePicker
                mode='date'
                modal
                open={open}
                date={date}
                onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
                title={"Chọn ngày khởi hành"}
            // minimumDate={new Date()}
            // maximumDate={new Date("2023-12-28")}

            />
            <LinearGradient colors={['rgba(255, 98, 96, 1)', 'rgba(255, 98, 96, 0)']} style={{ padding: ScaleUtils.floorModerateScale(10) }}>
                <View style={{ flexDirection: "row", marginBottom: ScaleUtils.floorModerateScale(17), alignItems: "center" }}>
                    <TouchableOpacity style={{ justifyContent: "flex-start" }} onPress={() => navigation.goBack()}>
                        <AntDesign
                            name={"left"}
                            size={20}
                            color="white"
                        />
                    </TouchableOpacity>
                    <View style={{ justifyContent: "center", flex: 1 }}>
                        <Text style={{ fontSize: 20, fontWeight: "bold", color: "white", textAlign: "center" }}>Mua vé ECar</Text>
                    </View>
                </View>

                <View style={styles.container}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", }}>
                        <View style={{ justifyContent: "flex-start" }}>
                            <Text style={{ fontSize: 14, fontWeight: "600" }}>Điểm đón</Text>
                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                data={locationFrom.map(item => ({
                                    label: item.vi_name,
                                    value: item.key
                                }))}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder="Chọn điểm đón"
                                value={valueFrom}
                                onChange={item => {
                                    setValueFrom(item.value);
                                }}
                                renderRightIcon={false}
                            />
                        </View>
                        <AntDesign
                            name={"rightcircleo"}
                            size={20}
                            color="#FF6260"
                        />
                        {/* <View style={{ justifyContent: "flex-end" }}>
                            <Text style={{ fontSize: 14, fontWeight: "600", textAlign: "right" }}>Điểm đến</Text>
                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={[styles.placeholderStyle, { textAlign: "right" }]}
                                selectedTextStyle={[styles.selectedTextStyle, { textAlign: "right" }]}
                                data={locationTo.map(item => ({
                                    label: item.vi_name,
                                    value: item.key
                                }))}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder="Chọn điểm đến"
                                renderRightIcon={false}
                                value={valueTo}
                                onChange={item => {
                                    setValueTo(item.value);
                                }}
                            />
                        </View> */}
                    </View>
                    <View style={{ borderTopWidth: 1, marginTop: ScaleUtils.floorModerateScale(20), marginBottom: ScaleUtils.floorModerateScale(20), borderTopColor: "#D3D3D3" }}></View>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <View>
                            <Text style={{ fontSize: 13, fontWeight: "600" }}>Ngày khởi hành</Text>
                            <TouchableOpacity style={{ marginTop: ScaleUtils.floorModerateScale(5) }} onPress={() => setOpen(true)}>
                                <Text style={{ fontSize: 15, fontWeight: "bold", color: "#FF6260" }}>{`${weekday[date.getDay()]}, ${date.getDate()}/${date.getMonth() + 1}`}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ justifyContent: "flex-end" }}>
                            <Text style={{ fontSize: 13, fontWeight: "600", textAlign: "right" }}>Số vé đặt</Text>
                            <Dropdown
                                style={styles.dropdownSeat}
                                placeholderStyle={[styles.placeholderStyle, { textAlign: "right" }]}
                                selectedTextStyle={[styles.selectedTextStyle, { textAlign: "right" }]}
                                data={Array.from({ length: 20 }, (_, index) => ({
                                    label: (index + 1).toString(),
                                    value: index + 1
                                }))}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder="Chọn số vé"
                                renderRightIcon={false}
                                value={valueSeat}
                                onChange={item => {
                                    setValueSeat(item.value);
                                }}

                            />
                        </View>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={handleFindTicket}
                    disabled={(valueFrom) != null ? false : true}
                    style={[styles.btnFind, { backgroundColor: (valueFrom) != null ? "#FF6260" : "#D3D3D3" }]}>
                    <Text style={{ color: "white", fontSize: 13, fontWeight: "bold" }}>Tìm tuyến xe</Text>
                </TouchableOpacity>
            </LinearGradient>
            <View style={{ padding: ScaleUtils.floorModerateScale(10) }}>
                {listRoute
                    &&
                    <FlatList
                        data={listRoute}
                        renderItem={_renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                }
            </View>


        </View>
    )
}
const styles = StyleSheet.create({
    dropdown: {
        height: ScaleUtils.floorModerateScale(40),
        width: ScaleUtils.floorModerateScale(120)
    },
    dropdownSeat: {
        height: ScaleUtils.floorModerateScale(30),
        width: ScaleUtils.floorModerateScale(50)
    },
    placeholderStyle: {
        fontSize: 15,
        fontWeight: "800",
        color: '#D3D3D3'
    },
    selectedTextStyle: {
        fontSize: 15,
        color: "#FF6260",
        fontWeight: "bold"
    },
    container: {
        padding: ScaleUtils.floorModerateScale(15),
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: "white",
        borderColor: "red",
    },
    destination: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    btnFind: {
        backgroundColor: "#FF6260",
        alignItems: 'center',
        padding: ScaleUtils.floorModerateScale(15),
        alignSelf: "center",
        borderRadius: 15,
        marginTop: ScaleUtils.floorModerateScale(-23)
    },
    logoImage: { height: ScaleUtils.floorModerateScale(50), width: ScaleUtils.floorModerateScale(50), marginRight: ScaleUtils.floorModerateScale(10) },
    smallBox: {
        marginTop: ScaleUtils.floorModerateScale(5),
        padding: ScaleUtils.floorModerateScale(20),
        elevation: 5,
    },
})
