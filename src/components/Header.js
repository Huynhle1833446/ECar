import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import ScaleUtils from '../utils/ScaleUtils'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function Header({ goBack, bgColor, iconColor, title, noIcon }) {
  return (
    <View style={[styles.container, { backgroundColor: bgColor || "#FFF" }]}>
      <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
        {!noIcon ?
          <TouchableOpacity onPress={goBack}>
            <Ionicons
              name={'arrow-back-outline'}
              size={25}
              color={iconColor || "#FF6260"}
            />
          </TouchableOpacity> : null}

        <View style={{ flex: 0.9, alignItems: "center" }}>
          {title && <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>{title}</Text>}
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: ScaleUtils.floorModerateScale(49),
    shadowColor: 'black',
    paddingLeft: ScaleUtils.floorModerateScale(12),
    minHeight: ScaleUtils.floorModerateScale(49)
    // shadowOpacity: 0.1,
    // shadowRadius: 3,
    // shadowOffset: {
    //   height: 3,
    // },
    // elevation: 4,
  }
})
