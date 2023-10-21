import React, { useRef } from 'react'
import { View, Text, ScrollView, Image, StyleSheet, FlatList, Dimensions,TouchableOpacity } from 'react-native'
import ScaleUtils from '../utils/ScaleUtils';
import { news } from '../assets/Resource/index'
import FastImage from 'react-native-fast-image';


const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width - 80;
const CARD_HEIGHT = 200;
const CARD_WIDTH_SPACING = CARD_WIDTH + 24;

export default function PopularNews() {

    return (
        <View style={{ flex: 1, marginTop: ScaleUtils.floorModerateScale(20), padding: ScaleUtils.floorModerateScale(10) }}>
            <Text style={{ fontSize: 25, fontWeight: "bold" }}>Tin tức nổi bật</Text>
            <View style={{ marginTop: ScaleUtils.floorModerateScale(15) }}>
                <FlatList
                    data={news}
                    horizontal
                    decelerationRate="fast"
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={i => i.id}
                    ItemSeparatorComponent={() => <View style={{ width: ScaleUtils.floorModerateScale(15) }}/>}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity>
                                <View style = {styles.card}>
                                    <View style = {styles.imageBox}>
                                        <FastImage style={styles.logoImage} source={item.illustration} />
                                    </View>
                                        <View style = {{padding : ScaleUtils.floorModerateScale(15)}}>
                                            <Text style = {{fontSize : 20, fontWeight : 'bold',color : 'black'}} numberOfLines={1}>{item.title}</Text>
                                            <Text style = {{fontSize : 15,color : 'black',marginTop : ScaleUtils.floorModerateScale(5)}} numberOfLines={2}>{item.subtitle}</Text>
                                        </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    itemContainer: {
        paddingBottom: ScaleUtils.floorModerateScale(20),
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 10
    },
    logoImage: { 
        height: ScaleUtils.floorModerateScale(210), 
        width: ScaleUtils.floorModerateScale(258) ,
        resizeMode: 'cover',
        borderTopLeftRadius : 10,
        borderTopRightRadius : 10
    },
    cardContainer: {
        marginLeft: ScaleUtils.floorModerateScale(24),
        marginBottom: ScaleUtils.floorModerateScale(24),
    },
    card: {
        width: ScaleUtils.floorModerateScale(260),
        height : ScaleUtils.floorModerateScale(220),
        backgroundColor : "white",
        borderRadius : 12,
        borderWidth : 1,
        borderColor : "#D3D3D3"
    },
    imageBox: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT - 60,
        overflow: 'hidden',
      },

})
