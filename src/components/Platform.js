import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Image, ImageBackground } from 'react-native'
import ScaleUtils from '../utils/ScaleUtils'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import ImageUltils from '../assets/Images/ImageUltils'
import { platForm } from '../assets/Resource/index'


export default function Platform() {
    return (
        <View style={{ flex: 1, marginTop: ScaleUtils.floorModerateScale(20), padding: ScaleUtils.floorModerateScale(10) }}>
            <Text style={{ fontSize: 25, fontWeight: "bold" }}>Nền tảng kết nối người dùng và nhà xe</Text>
            <View style={{ marginTop: ScaleUtils.floorModerateScale(15),flex : 1 }}>
                {platForm.map((item, index) => (
                    <View key={index} style = {[{flexDirection : "row",alignItems : "center",justifyContent : "space-between"},item.id != 1 && {marginTop : ScaleUtils.floorModerateScale(10)}]}>
                        <FontAwesome
                            name={item.icon}
                            size={30}
                            color= {item.colorIcon}
                        />
                        <View style = {{flex : 1,marginHorizontal : ScaleUtils.floorModerateScale(15)}}>
                            <Text style = {{fontSize : 20, color : "black",fontWeight : "bold"}}>{item.title}</Text>
                            <Text numberOfLines={2} style = {{fontSize : 17, color : "black",fontWeight : "600"}}>{item.detail}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {

    },
    content: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: "center",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
    },
    logoImage: { height: ScaleUtils.floorModerateScale(40), width: ScaleUtils.floorModerateScale(60) },
    logoText: {
        alignItems: "center",
        justifyContent: "center"
    },
    textLogo: {
        fontWeight: "bold",
        fontSize: ScaleUtils.floorModerateScale(15),
        marginTop: ScaleUtils.floorModerateScale(5),
        color: "white"
    }

})
