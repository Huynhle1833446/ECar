import React from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native';

export default function Loader() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#FF6260" />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });


