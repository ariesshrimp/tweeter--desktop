'use strict'
import React from 'react'
import { postTweet, storeTweet, addExternalLink } from '../../TwitterAPI/index.js'


function handleSubmit(event) {
  console.log('Button clicked')

  event.preventDefault()
  const tweet = document.getElementById('tweet').value
  return postTweet(tweet)
    .then(function handleTwitterResponse(result) {
      console.log('Successfully posted tweet!')
      console.log(result.data)
      return result.data
    })
    .then(addExternalLink)
    .then(storeTweet)
    .then(function handleFirebaseResponse() {
      console.log('Firebase sync successful!')
    })
}

export default function TweetForm() {
  return <div>
    <textarea id="tweet" maxLength="140" placeholder="What's on your mind?" required></textarea>
    <button onClick={ handleSubmit }>Send Tweet</button>
  </div>
}
