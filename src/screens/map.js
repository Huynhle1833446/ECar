import React from "react";
import { View, Image, StyleSheet } from "react-native";
import mapPic from '../assets/Images/map.jpg';
import ImageViewer from 'react-native-image-zoom-viewer';
const images = [
  {
    url: 'https://cdn.alongwalk.info/vn/wp-content/uploads/2022/05/07175217/image-ban-do-khu-du-lich-dai-nam-online-moi-va-day-du-nhat-165189553795869.jpg',
  },
  {
    url: 'https://disantrangan.vn/wp-content/uploads/2021/05/Khu_du_lich_dai_nam_1.jpg'
  }
  // Add more images as needed
];
export default function MapScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: 'red' }}>
      {/* <Image
        source={mapPic}
        resizeMode="cover"
        style={{ flex: 1, transform: [{ rotate: '90deg' }] }}
      /> */}
            <ImageViewer imageUrls={images} />

    </View>
  );
}
