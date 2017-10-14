import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native'
import {connect} from 'react-redux'
import {white, black} from '../utils/colors'
import Deck from './Deck'

class DeckInfo extends Component {
  static navigationOptions = ({navigation}) => {
    const {deckTitle} = navigation.state.params
    return {title: deckTitle}
  }

  render() {
    const {deck, navigateToAddCard} = this.props

    return (
      <View style={styles.container}>
        <Deck id={deck.title} title={deck.title} questions={deck.questions} bigFonts={true}/>
        <TouchableOpacity style={[styles.btn, Platform.OS === 'ios'
          ? styles.iosBtn
          : styles.androidBtn, styles.addCardBtn]} onPress={() => navigateToAddCard(deck.title)}>
          <Text style={[styles.btnText, styles.addCardBtnText]}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, Platform.OS === 'ios'
          ? styles.iosBtn
          : styles.androidBtn, styles.startQuizBtn]} onPress={() => navigateToStartQuiz(deck.title)}>
          <Text style={[styles.btnText, styles.startQuizBtnText]}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15
  },
  btn: {
    padding: 10,
    height: 45,
    margin:10,
    justifyContent: 'center',
  },
  addCardBtn:{
    backgroundColor: white,
    borderWidth: 1,
    borderColor: black,
  },
  addCardBtnText:{
    color:black
  },
  startQuizBtn:{
    backgroundColor: black,
  },
  startQuizBtnText:{
    color: white
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
  btnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  }
})

function mapStateToProps(decks, {navigation}) {
  const {deckTitle} = navigation.state.params
  return {
      deck: decks[deckTitle] || {},
      decks
  }
}

function mapDispatchToProps(dispatch, {navigation}) {
  const {deckTitle} = navigation.state.params

  return {
    goBack: () => navigation.goBack(),
    navigateToAddCard: (deckTitle) => navigation.navigate('AddCard', {
          deckTitle: deckTitle
    }),
    navigateToStartQuiz: (deckTitle) => navigation.navigate('AddCard', {
          deckTitle: deckTitle
    })
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(DeckInfo)
