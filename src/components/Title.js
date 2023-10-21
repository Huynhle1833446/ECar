import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'

export default function Title(props) {
    return <Text style={styles.header} {...props} />
}
const styles = StyleSheet.create({
    header: {
      fontSize: 25,
      color: "#FF6260",
      fontWeight: 'bold',
    },
  })
