import React, { useRef } from 'react'
import { View, Text, ScrollView, Image, StyleSheet, FlatList, Dimensions,TouchableOpacity } from 'react-native'
import ScaleUtils from '../utils/ScaleUtils';
import { location } from '../assets/Resource/index'
import Entypo from 'react-native-vector-icons/Entypo'
import FastImage from 'react-native-fast-image';

export default function Places() {
    return (
        <View style={{ flex: 1, marginTop: ScaleUtils.floorModerateScale(20), padding: ScaleUtils.floorModerateScale(10) }}>
            <Text style={{ fontSize: 25, fontWeight: "bold" }}>Chúng tôi đang ở đâu</Text>
            <View style={{ marginTop: ScaleUtils.floorModerateScale(15) }}>
                <FlatList
                    data={location}
                    horizontal
                    snapToInterval={20}
                    decelerationRate="fast"
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={i => i.id}
                    ItemSeparatorComponent={() => <View style={{ width: ScaleUtils.floorModerateScale(15) }} />}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity>
                                <View style={styles.card}>
                                    <View style={styles.imageBox}>
                                        <FastImage source={item.image} style={styles.image} />
                                    </View>
                                    <View style={styles.titleBox}>
                                        <Entypo
                                            name={'location'}
                                            size={20}
                                            color="white"
                                            style = {{marginRight : ScaleUtils.floorModerateScale(5)}}
                                        />
                                        <Text style={styles.title}>{item.title}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        height: ScaleUtils.floorModerateScale(210),
        width: ScaleUtils.floorModerateScale(258),
        shadowColor: '#000',
        shadowRadius: 4,
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
    // favorite: {
    //     position: 'absolute',
    //     top: spacing.m,
    //     right: spacing.m,
    //     zIndex: 1,
    // },
    imageBox: {
        height: ScaleUtils.floorModerateScale(210),
        width: ScaleUtils.floorModerateScale(258),
        borderRadius: 10,
        overflow: 'hidden',
    },
    image: {
        height: ScaleUtils.floorModerateScale(210),
        width: ScaleUtils.floorModerateScale(258),
        resizeMode: 'cover',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    titleBox: {
        position: 'absolute',
        top: ScaleUtils.floorModerateScale(160),
        left: 10,
        backgroundColor: "#FF6260",
        borderWidth: 1,
        borderRadius: 20,
        padding: 8,
        borderColor: "white",
        justifyContent : "center",
        flexDirection : "row",
        alignItems : "center"
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',

    },
    location: {
        fontSize: 18,
        color: '#fff',
        backgroundColor: "#FF6260"
    },
});

