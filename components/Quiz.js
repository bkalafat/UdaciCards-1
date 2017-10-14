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

  restartQuiz() {
    this.setState({
      currentQuestionIndex: 0,
      correctAnswersCount: 0
    })
  }

  render() {
    const {currentQuestionIndex, correctAnswersCount} = this.state
    const {deck, goBack} = this.props
    const {questions} = deck

    if(currentQuestionIndex > 0 && currentQuestionIndex === questions.length) {
      return (
        <View style={styles.container}>
          <View style={styles.center}>
            <Text style={styles.scoreLbl}>Your Score</Text>
            <Text style={styles.score}>{(correctAnswersCount/questions.length) * 100} %</Text>
          </View>

          <View style={styles.btnContainer}>
            <TouchableOpacity style={[styles.btn, Platform.OS === 'ios'
              ? styles.iosBtn
              : styles.androidBtn, styles.goBackToDeckBtn]} onPress={() => goBack()}>
              <Text style={[styles.btnText, styles.goBackToDeckBtnText]}>Back to Deck</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, Platform.OS === 'ios'
              ? styles.iosBtn
              : styles.androidBtn, styles.restartQuizBtn]} onPress={() => this.restartQuiz()}>
              <Text style={[styles.btnText, styles.restartQuizBtnText]}>Restart Quiz</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }

    const card = questions[currentQuestionIndex]

    return (
      <View style={styles.container}>
        <Text style={styles.pagination}>{currentQuestionIndex + 1}/{questions.length}</Text>
        <View style={[styles.center]}>
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
    flex: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    flex:3,
    justifyContent: 'flex-end',
    alignItems: 'stretch',
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
  goBackToDeckBtn:{
    backgroundColor: white,
    borderWidth: 1,
    borderColor: black,
  },
  goBackToDeckBtnText:{
    color:black
  },
  restartQuizBtn:{
    backgroundColor: black,
  },
  restartQuizBtnText:{
    color: white
  },
  btnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  scoreLbl:{
    fontSize: 36,
    color: charcoal
  },
  score:{
    fontSize: 48,
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
