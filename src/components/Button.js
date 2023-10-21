import React from 'react'
import { StyleSheet } from 'react-native'
import { Button as PaperButton } from 'react-native-paper'


export default function Button({ mode, style, ...props }) {
    return (
        <PaperButton
            style = {[
                styles.button,
                mode == 'outlined' && {backgroundColor : 'white'},
                style
            ]}
            
            mode = {mode}
            {...props}

        />
    )
}
const styles = StyleSheet.create({
    button: {
        width: 100,
        marginVertical: 10,
        paddingVertical: 2,
    },
})
