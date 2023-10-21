import React, { useRef } from 'react'
import { View, Text, ScrollView, Image } from 'react-native'
import HeaderDb from '../components/HeaderDb';
import ImageUltils from '../assets/Images/ImageUltils';
import ScaleUtils from '../utils/ScaleUtils';
import { imageCarousel } from '../assets/Resource/index'
import PopularNews from '../components/PopularNew';
import Places from '../components/Places';
import Platform from '../components/Platform';
import CustomerFeedback from '../components/CustomerFeedback';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import { selectAuth } from '../features/auth/authSlice';
import Carousel from 'react-native-snap-carousel';


export default function MainHome({ navigation }) {
 const {userInfo} = useSelector(selectAuth)

    


  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <HeaderDb name={userInfo.username} />
      <ScrollView style = {{flex : 1}}>
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
        <PopularNews/>
        <Places/>
        <Platform/>
        <CustomerFeedback/>
      </ScrollView>
    </View>
  )
}
