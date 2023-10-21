import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Image, ImageBackground } from 'react-native'
import ScaleUtils from '../utils/ScaleUtils'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import ImageUltils from '../assets/Images/ImageUltils'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'

export default function HeaderDb({ name }) {
    return (
        <LinearGradient colors={['rgba(255, 98, 96, 1)', 'rgba(255, 98, 96, 0)']} style={styles.gradient}>
            <View style={{ alignItems: "center", justifyContent: "space-between", flexDirection: "row" }}>
                <Text style={{ fontSize: 18, fontWeight: "bold", color: "#FFFFFF", letterSpacing: 1 }}>Chào {name}</Text>
            </View>
            <FastImage
                style={styles.logoImage}
                source={ImageUltils.getImageSource('logoDb')}
                resizeMode='contain'
            />
        </LinearGradient>


    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        height: ScaleUtils.floorModerateScale(70),
        padding: ScaleUtils.floorModerateScale(10)
    },
    logoImage: { height: ScaleUtils.floorModerateScale(90), width: ScaleUtils.floorModerateScale(90) },
    gradient: {
        alignItems : "center",
        height : ScaleUtils.floorModerateScale(70),
        flexDirection : "row",
        justifyContent : "space-between",
        padding : ScaleUtils.floorModerateScale(10)
    },
})
