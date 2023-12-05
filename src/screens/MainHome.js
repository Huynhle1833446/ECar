import React, { useRef, useEffect, useState } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, FlatList, KeyboardAvoidingView, TextInput } from 'react-native'
import HeaderDb from '../components/HeaderDb';
import ImageUltils from '../assets/Images/ImageUltils';
import ScaleUtils from '../utils/ScaleUtils';
import { imageCarousel } from '../assets/Resource/index'
import PopularNews from '../components/PopularNew';
import Places from '../components/Places';
import Platform from '../components/Platform';
import CustomerFeedback from '../components/CustomerFeedback';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from '../features/auth/authSlice';
import Carousel from 'react-native-snap-carousel';
import { useGetLocationMutation, useGetTripsMutation, useUpdateTripMutation, useGetTicketBookedMutation, useGetUserInTripMutation, useCreateTripMutation } from '../services/ticketApi';
import { setLocationFrom, setLocationTo, setChosenRoute, setFinishedRoute, setTicketBooked, setListUserInTrip, setAvailableRoute } from '../features/ticket/locationSlice';
import Toast from 'react-native-toast-message';
import PriceFormat from '../common/PriceFormat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import Modal from "react-native-modal";
import { selectLocation } from '../features/ticket/locationSlice'
import { Dropdown } from 'react-native-element-dropdown';



export default function MainHome({ navigation }) {
  const { userInfo } = useSelector(selectAuth)
  const [isOpenCreate, setIsOpenCreate] = React.useState(false);
  const [stage, setStage] = React.useState(0);
  const [countSlot, setCountSlot] = React.useState(0);
  const [dataCreateTrip, setDataCreateTrip] = React.useState([]);
  const [startAt, setStartAt] = React.useState(moment().format('DD-MM-YYYY HH:mm:ss'));
  const dateTimeRegex = /^\d{2}-\d{2}-\d{4} \d{2}:\d{2}:\d{2}$/;
  const [alertError, setAlertError] = React.useState('')
  const [isModal, setIsModal] = useState(false)
  const [acceptRoute, setAcceptRoute] = useState([])
  const { availableRoute } = useSelector(selectLocation)
  const [getLocation, { data, isError, isSuccess, error }] = useGetLocationMutation()
  const [getTrips, { data: trips, isError: isErrTrip, isSuccess: isSuccessTrip, error: errTrip }] = useGetTripsMutation()
  const [updateTrip, { isError: isErrUpdate, isSuccess: isSuccessUpdate, error: errorUpdate }] = useUpdateTripMutation()
  const [getTicketBooked, { data: ticked, isError: isErrTicked, isSuccess: isSuccessTicked, error: errTicked }] = useGetTicketBookedMutation()
  const [getUserInTrip, { data: userTrip, isError: isErrUserTrip, isSuccess: isSuccessUserTrip, error: errUserTrip }] = useGetUserInTripMutation()
  const [createTrip, { data: resCreateTrip, isError: isErrCreateTrip, isSuccess: isSuccessCreateTrip, error: errCreateTrip }] = useCreateTripMutation()

  const dispatch = useDispatch()
  const handleBooking = async () => {
    await getLocation({ current: 1, pageSize: 15 })
  }
  const handleGetTrip = async () => {
    await getTrips()
  }
  const handleGetTicketBooked = async () => {
    await getTicketBooked()
  }
  const formatDate = date => {
    return moment(date).format('DD/MM/YYYY | HH:mm')
  };
  const handleTurnOnCreate = () => {
    setIsOpenCreate(true);
  }

  const handleTakeTrip = async (route) => {
    setAcceptRoute(route)
    await updateTrip({ status: "in_progress", trip_id: route.key })
    await getUserInTrip({ trip_id: route.key })
  }
  const handleValidateRoute = (route) => {
    if (route.total_slot_ticket > 0) {
      setIsModal(!isModal)
    } else {
      Toast.show({
        type: 'invalid',
        props: { message: "Chuyến đi này chưa có khách đặt !" }
      });
    }
  }

  const check = () => {
    let flag = true;
    if(!stage) {
      flag = false;
      setAlertError('Vui lòng chọn tuyến xe!')
    } else if(!countSlot) {
      flag = false;
      setAlertError('Vui lòng điền số lượng chỗ ngồi!')
    } else if(!startAt) {
      flag = false;
      setAlertError('Vui lòng điền thời gian khởi hành!')
    } else if(startAt && !dateTimeRegex.test(startAt)) {
      flag = false;
      setAlertError('Vui lòng điền đúng format thời gian khởi hành (dd-mm-yyyy hh:mm:ss)!')
    }
    return flag;
  }

  const handleCreateTrip =  async () => {
    const bool = check();
    if(bool) {
      setAlertError('')
      await createTrip({
        stageId: stage,
        countSlot: countSlot,
        startTime: startAt,
        driverId: userInfo.id
      })
    } 
  }

  useEffect(() => {
    if (isSuccess) {
      dispatch(setLocationFrom(data.data.data.filter(item => item.type == "from")))
      dispatch(setLocationTo(data.data.data.filter(item => item.type == "to")))
      navigation.navigate("createRoute")
    }
    if (isError) {
      Toast.show({
        type: 'invalid',
        props: { message: error.data.error }
      });
    }
  }, [isSuccess, isError])

  useEffect(() => {
    if (isSuccessTrip) {
      dispatch(setFinishedRoute(trips.data.filter(item => item.status == "finished")))
      dispatch(setAvailableRoute(trips.data.filter(item => item.status == "new")))
      setDataCreateTrip(trips?.dataStage)
      Toast.show({
        type: 'successed',
        props: { message: 'Lấy dữ liệu chuyến đi thành công!' }
      });
    }
    if (isErrTrip) {
      Toast.show({
        type: 'invalid',
        props: { message: errTrip.data.error }
      });
    }
  }, [isSuccessTrip, isErrTrip])

  useEffect(() => {
    if (isSuccessCreateTrip) {
      handleGetTrip()
      setIsOpenCreate(false)
      Toast.show({
        type: 'successed',
        props: { message: 'Đã tạo chuyến đi thành công!' }
      });
    }
    if (isErrCreateTrip) {
      Toast.show({
        type: 'invalid',
        props: { message: errCreateTrip.data.error }
      });
    }
  }, [isSuccessCreateTrip, isErrCreateTrip])

  useEffect(() => {
    if (isSuccessTicked) {
      dispatch(setTicketBooked(ticked.data))
      Toast.show({
        type: 'successed',
        props: { message: 'Lấy dữ liệu vé đã đặt thành công !' }
      });
    }
    if (isErrTicked) {
      Toast.show({
        type: 'invalid',
        props: { message: errTicked.data.error }
      });
    }
  }, [isSuccessTicked, isErrTicked])

  useEffect(() => {
    if (userInfo['role'] == "staff") {
      handleGetTrip()
    } else {
      handleGetTicketBooked()
    }
  }, [userInfo])

  useEffect(() => {
    if (isSuccessUpdate) {
      setIsModal(false)
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
    if (isSuccessUserTrip) {
      Toast.show({
        type: 'successed',
        props: { message: 'Lấy dữ liệu khách đặt vé thành công !' }
      });
      dispatch(setListUserInTrip(userTrip.data['customer']))
    }
    if (isErrUserTrip) {
      Toast.show({
        type: 'invalid',
        props: { message: errUserTrip.data.error }
      });
    }
  }, [isSuccessUserTrip, isErrUserTrip])

  const _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity key={index} style={styles.smallBox} onPress={() => handleValidateRoute(item)}>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>{item.from_location_name} - {item.to_location_name}</Text>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: ScaleUtils.floorModerateScale(15) }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              name={"ticket-account"}
              size={23}
              color="red"
              style={{ marginRight: ScaleUtils.floorModerateScale(8) }}
            />
            <Text>{item.total_slot_ticket || 0} vé</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AntDesign
              name={"clockcircleo"}
              size={23}
              color="red"
              style={{ marginRight: ScaleUtils.floorModerateScale(8) }}
            />
            <Text>15 phút</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AntDesign
              name={"creditcard"}
              size={23}
              color="red"
              style={{ marginRight: ScaleUtils.floorModerateScale(8) }}
            />
            <Text>Tổng thu : {PriceFormat.formatString(item.price * Number(item.total_slot_ticket))}đ</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: ScaleUtils.floorModerateScale(15) }}>
          <Text>Thời gian khởi hành</Text>
          <Text>{formatDate(item.stage_created_at)}</Text>
        </View>
        <Modal
          onBackdropPress={() => setIsModal(false)}
          isVisible={isModal}
          backdropOpacity={0.8}
          animationIn="zoomInDown"
          animationOut="zoomOutUp"
          animationInTiming={600}
          animationOutTiming={600}
          backdropTransitionInTiming={600}
          backdropTransitionOutTiming={600}
        >
          <View style={styles.containerModal}>
            <Text style={{ fontSize: 20, fontWeight: "600" }}>Tài xế {userInfo.username} có muốn thực hiện chuyến đi này ?</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: ScaleUtils.floorModerateScale(20) }}>
              <TouchableOpacity style={[styles.btnModal, { backgroundColor: "green" }]} onPress={() => handleTakeTrip(item)}>
                <Text style={{ fontSize: 17, fontWeight: "bold", color: "white" }}>Nhận chuyến</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnModal} onPress={() => setIsModal(false)}>
                <Text style={{ fontSize: 17, fontWeight: "bold", color: "white" }}>Không nhận</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </TouchableOpacity>

    )
  }


  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <HeaderDb name={userInfo['role'] == 'staff' ? `Tài xế ${userInfo.username}` : userInfo.username} />
      <Modal
        onBackdropPress={() => setIsOpenCreate(false)}
        isVisible={isOpenCreate}
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
          <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: 'center' }}>Tạo chuyến xe</Text>
          <View style={{ paddingVertical: ScaleUtils.floorModerateScale(20) }}>
            <KeyboardAvoidingView>
              <View>
                <View >
                  <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={[styles.placeholderStyle]}
                    selectedTextStyle={[styles.selectedTextStyle]}
                    data={dataCreateTrip.map(item => ({
                      label: `#${item.key} | ${item.from_location_name} - ${item.to_location_name}`,
                      value: item.key
                    }))}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Chọn tuyến xe"
                    renderRightIcon={false}
                    value={stage}
                    onChange={item => {
                      setStage(item.value);
                    }}
                  />
                </View>
                <View style={styles.inputContainer}>

                  <TextInput
                    autoCapitalize='none'
                    selectTextOnFocus
                    underlineColorAndroid="transparent"
                    keyboardType="numeric"
                    placeholder='Số lượng ghế'
                    
                    value={countSlot}
                    onChangeText={text => {
                      setCountSlot(text);
                    }}
                    style={styles.inputForm}
                  />
                </View>

                <View style={styles.inputContainer}>

                  <TextInput
                    autoCapitalize='none'
                    selectTextOnFocus
                    underlineColorAndroid="transparent"
                    keyboardType="default"
                    placeholder='Thời gian xuất phát'
                    value={startAt}
                    onChangeText={text => {
                      setStartAt(text);
                    }}
                    style={styles.inputForm}
                  />
                </View>

                {
                  alertError !== '' && (
                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ color: 'red' }}>{alertError}</Text>
                    </View>
                  )
                }
                <View >
                  <TouchableOpacity
                    onPress={() => handleCreateTrip()}
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
      {userInfo['role'] == 'staff'
        ?
        <View style={{ flex: 1, padding: ScaleUtils.floorModerateScale(10) }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "red" }}>Lịch trình hôm nay của tài xế {userInfo.username}</Text>
          {
            availableRoute.length > 0 ? (
              <FlatList
                data={availableRoute}
                renderItem={_renderItem}
                keyExtractor={(item, index) => index.toString()}
                style={{ marginTop: ScaleUtils.floorModerateScale(15) }}
              />
            ) : (
              <View style={{ display: "flex", justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <TouchableOpacity style={{ backgroundColor: "#E48700", borderRadius: 5, padding: 20, marginTop: ScaleUtils.floorModerateScale(15), width: '100%' }} onPress={handleTurnOnCreate}>
                  <Text style={{ fontSize: 20, fontWeight: "bold", color: "white", textAlign: "center" }}>Tạo chuyến xe</Text>
                </TouchableOpacity>
                <Text>*Bạn chỉ được tạo 1 chuyến xe ở 1 thời điểm nhất định.</Text>
              </View>
            )
          }

        </View>
        :
        <ScrollView style={{ flex: 1 }}>
          <View style={{ alignItems: 'center', justifyContent: "center", marginTop: ScaleUtils.floorModerateScale(20) }}>
            <Carousel
              layout={"default"}
              data={imageCarousel}
              sliderWidth={ScaleUtils.floorModerateScale(600)}
              itemWidth={ScaleUtils.floorModerateScale(320)}
              renderItem={({ item }) => (
                <FastImage
                  source={item.image}
                  style={{ width: ScaleUtils.floorModerateScale(320), height: ScaleUtils.floorModerateScale(160), borderRadius: 10 }}
                />
              )}
              hasParallaxImages={true}
              inactiveSlideScale={0.9}
              inactiveSlideOpacity={0.8}
              loop={true}
              loopClonesPerSide={2}
              autoplay={true}
              autoplayInterval={2000}
            />
          </View>
          <View style={{ padding: ScaleUtils.floorModerateScale(10) }}>
            <View style={styles.containerFunction}>
              <TouchableOpacity
                onPress={handleBooking}
                style={{ alignItems: "center", flexDirection: "column" }}>
                <FastImage
                  style={styles.logoIcon}
                  source={ImageUltils.getImageSource("buyTicket")}
                  resizeMode='contain'
                />
                <Text style={{ fontSize: 13, fontWeight: "bold", marginTop: ScaleUtils.floorModerateScale(5) }}>Mua vé xe</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
                onPress={() => navigation.navigate("findRoute")}
                style={{ alignItems: "center", flexDirection: "column" }}>
                <FastImage
                  style={{ width: ScaleUtils.floorModerateScale(50), height: ScaleUtils.floorModerateScale(50) }}
                  source={ImageUltils.getImageSource("buildRoute")}
                  resizeMode='contain'
                />
                <Text style={{ fontSize: 13, fontWeight: "bold", marginTop: ScaleUtils.floorModerateScale(5) }}>Dựng hành trình</Text>
              </TouchableOpacity> */}
            </View>
          </View>
          <PopularNews />
          <Places />
          <Platform />
          <CustomerFeedback />
        </ScrollView>
      }

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
  dropdown: {
    marginBottom: 16,
    borderWidth: 1,
    borderBottomColor: 'black',
    borderRadius: 10,
    paddingLeft: 10,
    // height: ScaleUtils.floorModerateScale(40),
    // width: ScaleUtils.floorModerateScale(120)
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
  btnModal: {
    backgroundColor: "#FF6260",
    padding: ScaleUtils.floorModerateScale(10)
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
})
