import React from 'react';
import {AsyncStorage} from 'react-native'

const DECKS_STORAGE_KEY = 'com.santhoshn.udacicards.decks'

function dummyDecks() {
  return {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        }, {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  }
}

function parseDecks(results) {
  if (results) {
    results = JSON.parse(results)
  }
  return (results)
    ? results
    : dummyDecks()
}

export function getDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(parseDecks)
}

export function getDeck(id) {
  return getDecks()[id]
}

export function saveDeckTitle(deckTitle) {
  const results = getDecks()
  if (!results[deckTitle]) {
    results[deckTitle] = {
      title: deckTitle,
      questions: []
    }
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(results))
  }
}

export function addCardToDeck(deckTitle, {question, answer, isCorrect}) {
  const results = getDecks()
  if (results[deckTitle] && results[deckTitle]['questions']) {
    results[deckTitle]['questions'].push({questions, answer, isCorrect})
  }
  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(results))
}
