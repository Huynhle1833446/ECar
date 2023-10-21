import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import ScaleUtils from '../utils/ScaleUtils'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function Header({goBack}) {
  return (
    <View style = {styles.container}>
        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
            <TouchableOpacity onPress={goBack}>
            <Ionicons
                name={'arrow-back-outline'}
                size={25}
                color={"#FF6260"}
              />   
            </TouchableOpacity>
        </View>
    </View>
  )
}
const styles = StyleSheet.create ({
    container : {
        flexDirection: 'row',
        alignItems: 'center',
        height: ScaleUtils.floorModerateScale(49),
        // backgroundColor: '#FFF',
        shadowColor: 'black',
        shadowOpacity: 0.1,
        paddingLeft : ScaleUtils.floorModerateScale(12),
        shadowRadius: 3,
        shadowOffset: {
          height: 3,
        },
        elevation: 4,
    }
})
