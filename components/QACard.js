import React, {Component} from 'react'
import {View, Text, StyleSheet, Platform, Animated} from 'react-native'
import {red, black} from '../utils/colors'
import TextButton from './TextButton'

class QACard extends Component {

  constructor(props) {
    super(props);
    this.flipCard = this.flipCard.bind(this);
  }

  state = {
    flipToShow: 'Answer'
  }

  componentWillReceiveProps(nextProps){
    const {card} = this.props
    if (card.question !== nextProps.card.question) {
      this.reset()
    }
  }

  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({value}) => {
      this.value = value;
    })
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [
        0, 180
      ],
      outputRange: ['0deg', '180deg']
    })
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [
        0, 180
      ],
      outputRange: ['180deg', '360deg']
    })
  }

  reset() {
    if (this.value >= 90) {
      Animated.timing(this.animatedValue, {
        toValue: 0,
        duration: 0
      }).start();
      this.setState({flipToShow: 'Answer'})
    }
  }

  flipCard() {
    if (this.value >= 90) {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10
      }).start();
      this.setState({flipToShow: 'Answer'})
    } else {
      Animated.spring(this.animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10
      }).start();
      this.setState({flipToShow: 'Question'})
    }
  }

  render() {
    const {card} = this.props;
    const {flipToShow} = this.state

    const frontAnimatedStyle = {
      transform: [
        {
          rotateY: this.frontInterpolate
        }
      ]
    }
    const backAnimatedStyle = {
      transform: [
        {
          rotateY: this.backInterpolate
        }
      ]
    }

    return (
      <View style={[styles.container]}>
        <View>
          <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
            <Text style={styles.content}>{card.question}</Text>
          </Animated.View>
          <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
            <Text style={styles.content}>{card.answer}</Text>
          </Animated.View>
        </View>
        <TextButton onPress={() => this.flipCard()}>{flipToShow}</TextButton>
      </View>
    )
  }
}

export default QACard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  flipCard: {
    minHeight: 400,
    marginLeft:10,
    marginRight: 10,
    backfaceVisibility: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipCardBack: {
    position: "absolute",
    top: 0,
    left:10
  },
  content: {
    color: black,
    fontSize: 44,
    textAlign: 'center'
  }
})
