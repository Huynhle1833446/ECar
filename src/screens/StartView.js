import React from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'
import ImageUltils from '../assets/Images/ImageUltils'
import ScaleUtils from '../utils/ScaleUtils'
import Title from '../components/Title'
import Button from '../components/Button'
import Video from 'react-native-video'
import VideosUltils from '../assets/Videos/VidUtils'
import FastImage from 'react-native-fast-image'


export default function StartView({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <Video
          source={VideosUltils.getVideoSource('intro')}
          muted={true}
          repeat={true}
          resizeMode={"cover"}
          rate={1.0}
          ignoreSilentSwitch={"obey"}
          style={styles.backgroundVideo}
        />
        <FastImage
          style={styles.logoImage}
          source={ImageUltils.getImageSource('logo')}
          resizeMode='contain'

        />
        <View style={styles.welcomeView}>
          {/* <Text style = {{fontSize : 25, fontWeight : 'bold', color : "white"}}>ELECTRIC CAR</Text> */}
          <Text style={{ fontWeight: "bold", fontSize: 20, color: "white" }}>Make the trip better</Text>
        </View>
        <View style={{ paddingVertical: ScaleUtils.floorModerateScale(20) }}>
          <Button
            mode='contained'
            labelStyle={{ color: "white", fontWeight: "700", fontSize: 16 }}
            style={{ backgroundColor: "#FF6260", width: 200 }}
            onPress={() => navigation.navigate('login')}
          >LOGIN</Button>
          <Button
            mode='outlined'
            labelStyle={{ color: "#FF6260", fontWeight: "700", fontSize: 16 }}
            style={{ width: 200 }}
            onPress={() => navigation.navigate('phoneRegister')}
          >SIGN UP</Button>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logoImage: { height: ScaleUtils.floorModerateScale(120), width: ScaleUtils.floorModerateScale(120), overflow: "hidden" },
  welcomeView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: ScaleUtils.floorModerateScale(10)
  },
  loginContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'flex-start',
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    alignItems: "stretch",
    bottom: 0,
    right: 0

  }
})
