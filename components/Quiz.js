import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native'
import {connect} from 'react-redux'
import {white, black, green, red, charcoal} from '../utils/colors'
import Deck from './Deck'

class Quiz extends Component {

  state = {
    currentQuestionIndex: 0,
    correctAnswersCount: 0
  }

  correctBtnPressed() {
    this.setState((state) => {
      return {
        currentQuestionIndex: state['currentQuestionIndex'] + 1,
        correctAnswersCount: state['correctAnswersCount'] + 1,
      }
    })
  }

  inCorrectBtnPressed() {
    this.setState((state) => {
      return {
        ...state,
        currentQuestionIndex: state['currentQuestionIndex'] + 1
      }
    })
  }

  render() {
    const {currentQuestionIndex, correctAnswersCount} = this.state
    const {questions} = this.props.deck

    if(currentQuestionIndex > 0 && currentQuestionIndex === questions.length) {
      return (
        <View style={[styles.container, styles.center]}>
          <Text style={styles.scoreLbl}>Your Score</Text>
          <Text style={styles.score}>{(correctAnswersCount/questions.length) * 100} %</Text>
        </View>
      )
    }

    const card = questions[currentQuestionIndex]

    return (
      <View style={styles.container}>
        <Text style={styles.pagination}>{currentQuestionIndex + 1}/{questions.length}</Text>
        <View style={[styles.center, styles.quizBody]}>
          <Text style={styles.question}>{card.question}</Text>
          <TouchableOpacity>
            <Text>Answer</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={[styles.btn, Platform.OS === 'ios'
            ? styles.iosBtn
            : styles.androidBtn, styles.greenBtn]} onPress={() => this.correctBtnPressed()}>
            <Text style={[styles.btnText]}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, Platform.OS === 'ios'
            ? styles.iosBtn
            : styles.androidBtn, styles.redBtn]} onPress={() => this.inCorrectBtnPressed()}>
            <Text style={[styles.btnText]}>Incorrect</Text>
          </TouchableOpacity>
        </View>
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
  pagination:{
    flex: 1,
    alignItems: 'flex-start',
    marginLeft: 15
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quizBody:{
    flex: 8
  },
  btnContainer: {
    flex:3,
    alignItems: 'stretch'
  },
  btn: {
    padding: 10,
    height: 45,
    margin:10,
    justifyContent: 'center',
  },
  greenBtn:{
    backgroundColor: green,
  },
  redBtn:{
    backgroundColor: red,
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
  },
  scoreLbl:{
    fontSize:24,
    color: charcoal
  },
  score:{
    fontSize: 36,
    color: green
  },
  question: {
    color: black,
    fontSize: 44,
    textAlign: 'center'
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
    goBack: () => navigation.goBack()
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
