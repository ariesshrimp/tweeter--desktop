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
  const photo = document.getElementById('file').files[0]
  const path = photo ? photo.path : undefined

  // Reset the form
  form.value = ''
  document.getElementById('file').value = ''
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
      .catch(error => console.error(error))
  }

  // If there isn't, post a normal tweet
  else {
    return postTweet(status)
      .then(function handleTwitterResponse(result) {
        console.log('Successfully posted tweet!')
        console.log(result.data)
        return result.data
      })
      .then(storeTweet)
      .then(function handleFirebaseResponse() {
        console.log('Firebase sync successful!')
      })
      .catch(error => console.error(error))
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
    <div className="column">
      <span id="remaining">140 remaining</span>
      <div className="column">
        <input type="file" id="file" />
        <button onClick={ handleSubmit }>Tweet</button>
      </div>
    </div>
  </div>
}
