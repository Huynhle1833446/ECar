import React from 'react';
import { View, Text } from 'react-native';
import { BaseToast, ErrorToast } from 'react-native-toast-message';
/*
  1. Create the config
*/
export const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'green' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400'
      }}
    >
      <View><Text>xxx</Text></View>
    </BaseToast>
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17
      }}
      text2Style={{
        fontSize: 15
      }}
    />
  ),
  /*
    Or create a completely new type - `tomatoToast`,
    building the layout from scratch.

    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
  invalid: ({ props }) => (
    <View style={{ paddingHorizontal: 12, paddingVertical: 8, width: '80%', backgroundColor: `${props.bgColor ? props.bgColor : "#EF5350"}`, borderRadius: 4, justifyContent: "center" }}>
      <Text style={{ color: "white", fontWeight: "700", lineHeight: 20 }}>{props.message}</Text>
    </View>
  ),
  successed: ({ props }) => (
    <View style={{ paddingHorizontal: 12, paddingVertical: 8, width: '80%', backgroundColor: `${props.bgColor ? props.bgColor : "#49be25"}`, borderRadius: 4, justifyContent: "center" }}>
      <Text style={{ color: "white", fontWeight: "700", lineHeight: 20 }}>{props.message}</Text>
    </View>
  )
};