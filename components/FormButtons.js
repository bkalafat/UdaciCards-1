
import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { black, white, lightGray } from '../utils/colors'

export default function FormButtons({onSubmit, onCancel, submitBtnText, cancelBtnText}) {
  return (
    <View style={styles.row}>
      <TouchableOpacity style={[styles.btn, Platform.OS === 'ios'
        ? styles.iosBtn
        : styles.androidBtn, styles.cancelBtn]} onPress={onCancel}>
        <Text style={styles.btnText}>{cancelBtnText || 'Cancel'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.btn, Platform.OS === 'ios'
        ? styles.iosBtn
        : styles.androidBtn]} onPress={onSubmit}>
        <Text style={styles.btnText}>{submitBtnText || 'Submit'}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  btn: {
    flex: 1,
    backgroundColor: black,
    padding: 10,
    height: 45,
    margin:10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iosBtn:{
    borderRadius: 7,
    height: 45,
  },
  androidBtn:{
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 2,
  },
  cancelBtn: {
    backgroundColor: lightGray,
  },
  btnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  }
})
