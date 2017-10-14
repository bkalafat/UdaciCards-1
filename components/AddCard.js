import React, {Component} from 'react'
import {Text, TextInput, View, TouchableOpacity, Platform, StyleSheet} from 'react-native'

import {connect} from 'react-redux'
import { black, white, lightGray } from '../utils/colors'

import FormButtons from './FormButtons'
import {NavigationActions} from 'react-navigation'

import { addCardToDeck } from '../utils/api'
import { addCard } from '../actions'

class AddCard extends Component {

  submit = () => {
    const {question, answer} = this.state
    const {addCard, deck, goBack} = this.props
    if(question && answer) {
      addCard(deck.title, {question, answer}) //update Redux
      addCardToDeck(deck.title, {question, answer}) //update db
      goBack()
    }
  }

  reset = () => {
    this.setState({
      question: '',
      answer:''
    })
    this.props.goBack()
  }

  render() {
    const {deck} = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{deck.title}</Text>
        <TextInput
          style={styles.question}
          editable={true}
          maxLength={100}
          placeholder="Enter the question here"
          onChangeText={(question) => this.setState({question})}
        />
        <TextInput
          style={styles.answer}
          editable = {true}
          maxLength = {200}
          multiline = {true}
          placeholder="Enter the answer here"
          onChangeText={(answer) => this.setState({answer})}
        />
        <FormButtons onSubmit={this.submit} onCancel={this.reset} submitBtnText={'Add Card'} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 20
  },
  title: {
    color: black,
    fontSize: 24,
    textAlign: 'center'
  },
  question: {
    marginTop:10,
    marginBottom:10,
    padding:10,
    paddingTop:5,
    paddingBottom:5,
    borderWidth: 1,
    borderColor: lightGray,
    borderRadius: 4
  },
  answer: {
    marginTop:10,
    marginBottom:10,
    padding:10,
    paddingTop:5,
    paddingBottom:5,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: lightGray,
    height: 70
  }
})

function mapStateToProps(decks, {navigation}) {
  const {deckTitle} = navigation.state.params
  return {
      deck: decks[deckTitle] || {}
  }
}

function mapDispatchToProps(dispatch, {navigation}) {
  const {deckTitle} = navigation.state.params

  return {
    goBack: () => navigation.goBack(),
    addCard:(deckTitle, card) => dispatch(addCard(deckTitle, card))
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(AddCard)
