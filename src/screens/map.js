import React from "react";
import { View, Image } from "react-native";
import mapPic from '../assets/Images/map.jpg';

export default function MapScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: 'red' }}>
      <Image
        source={mapPic}
        resizeMode="cover"
        style={{ flex: 1, transform: [{ rotate: '90deg' }] }}
      />
    </View>
  );
}
