import React, { useRef, useEffect, useState } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
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
import { useGetLocationMutation, useGetTripsMutation,useUpdateTripMutation,useGetTicketBookedMutation,useGetUserInTripMutation } from '../services/ticketApi';
import { setLocationFrom, setLocationTo, setChosenRoute, setFinishedRoute,setTicketBooked,setListUserInTrip } from '../features/ticket/locationSlice';
import Toast from 'react-native-toast-message';
import PriceFormat from '../common/PriceFormat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import Modal from "react-native-modal";

export default function MainHome({ navigation }) {
  const { userInfo } = useSelector(selectAuth)
  const [isModal, setIsModal] = useState(false)
  const [acceptRoute,setAcceptRoute] = useState([])
  const [getLocation, { data, isError, isSuccess, error }] = useGetLocationMutation()
  const [getTrips, { data: trips, isError: isErrTrip, isSuccess: isSuccessTrip, error: errTrip }] = useGetTripsMutation()
  const [updateTrip,{ isError : isErrUpdate, isSuccess : isSuccessUpdate, error : errorUpdate}] = useUpdateTripMutation()
  const [getTicketBooked,{data: ticked, isError: isErrTicked, isSuccess: isSuccessTicked, error: errTicked}] = useGetTicketBookedMutation()
  const [getUserInTrip,{data: userTrip, isError: isErrUserTrip, isSuccess: isSuccessUserTrip, error: errUserTrip}] = useGetUserInTripMutation()
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
  const handleTakeTrip = async (route) => {
    setAcceptRoute(route)
    await updateTrip({status : "in_progress", trip_id : route.key})
    await getUserInTrip({trip_id : route.key})
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
              <Text style = {{fontSize : 20, fontWeight : "600"}}>Tài xế {userInfo.username} có muốn thực hiện chuyến đi này ?</Text>
              <View style = {{flexDirection : "row",justifyContent : "space-between",marginTop : ScaleUtils.floorModerateScale(20)}}>
                <TouchableOpacity style = {[styles.btnModal,{backgroundColor : "green"}]} onPress={() => handleTakeTrip(item)}>
                  <Text style = {{fontSize : 17, fontWeight : "bold",color : "white"}}>Nhận chuyến</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.btnModal} onPress={() => setIsModal(false)}>
                  <Text style = {{fontSize : 17, fontWeight : "bold",color : "white"}}>Không nhận</Text>
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
      {userInfo['role'] == 'staff'
        ?
        <View style={{ flex: 1, padding: ScaleUtils.floorModerateScale(10) }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "red" }}>Lịch trình hôm nay của tài xế {userInfo.username}</Text>
          <FlatList
            data={trips?.data.filter(item => item.status == "new")}
            renderItem={_renderItem}
            keyExtractor={(item, index) => index.toString()}
            style={{ marginTop: ScaleUtils.floorModerateScale(15) }}
          />
       
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
  btnModal : {
    backgroundColor : "#FF6260",
    padding : ScaleUtils.floorModerateScale(10)
  }

})
