'use strict'
import React from 'react'
import { postTweet, storeTweet, postPhoto } from '../../TwitterAPI/index.js'

function handleSubmit(event) {
  event.preventDefault()
  console.log('Button clicked')

  // Grab the tweet status
  const form = document.getElementById('tweetForm')
  const status = form.value

  // Grab the photo, if it's there
  const photo = document.getElementById('photo').files[0]
  const path = photo ? photo.path : undefined

  // Reset the form
  form.value = ''
  document.getElementById('photo').value = ''
  document.getElementById('remaining').innerHTML = `140 remaining`

  // If there's a photo, post a media tweet
  if (path) {
    return postPhoto(path)
      .then(response => response.media_id_string)
      .then(idString => postTweet(status, [idString]))
      .then(function handleTwitterResponse(result) {
        console.log('Successfully posted tweet!')
        console.log(result.data)
        return result.data
      })
      .then(storeTweet)
      .then(function handleFirebaseResponse() {
        console.log('Firebase sync successful!')
      })
  }

  // If there isn't, post a normal tweet
  else {
    return postTweet(tweet, path)
      .then(function handleTwitterResponse(result) {
        console.log('Successfully posted tweet!')
        console.log(result.data)
        return result.data
      })
      .then(storeTweet)
      .then(function handleFirebaseResponse() {
        console.log('Firebase sync successful!')
      })
  }
}

function handleTyping(event) {
  const string = event.target.value
  const remaining = 140 - string.length
  document.getElementById('remaining').innerHTML = `${remaining} remaining`
}

export default function TweetForm() {
  return <div id="form">
    <textarea id="tweetForm" maxLength="140" placeholder="What's on your mind?" required onChange={ handleTyping }></textarea>
    <div>
      <span id="remaining">140 remaining</span>
      <input type="file" id="photo" />
      <button onClick={ handleSubmit }>Tweet</button>
    </div>
  </div>
}
