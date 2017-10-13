import React, {Component} from 'react'
import {Text, View, TouchableOpacity, Platform, StyleSheet} from 'react-native'

import {connect} from 'react-redux'
import { white } from '../utils/colors'

import {NavigationActions} from 'react-navigation'

function SubmitBtn({onPress}) {
  return (
    <TouchableOpacity style={Platform.OS === 'ios'
      ? styles.iosSubmitBtn
      : styles.androidSubmitBtn} onPress={onPress}>
      <Text style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  )
}

class AddDeck extends Component {

  submit = () => {

  }

  reset = () => {

  }

  toHome() {

  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Add Deck</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 20
  }
})

function mapStateToProps(decks) {
  return {decks}
}
export default connect(mapStateToProps)(AddDeck)
