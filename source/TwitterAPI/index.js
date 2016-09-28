'use strict'
import Twitter from 'twit'
import Firebase from 'firebase'


/* API console: https://apps.twitter.com/app/12881539/show
*/
const twitter = new Twitter({
  consumer_key: 'L6Ky0Ap1KkZeZxJAOvazq8pwo',
  consumer_secret: '214fCtbl8YX1UDwRdRkHhWGwZUcnhCjoj3Jw5GKU5OWZfvMm7w',
  access_token: '2981248609-5PxgWjsFXfvYlhGE2me9GFHEqF2u9pQrGLHKI2Z',
  access_token_secret: 'rWnAbvpV69P5uwVmsNm2SWILxk6EEtadaugvdYJl4uvrw'
})


/* API console: https://console.firebase.google.com/project/tweeter-80d2b/database/data
*/
const app = Firebase.initializeApp({
  apiKey: 'AIzaSyCtWEs8Hkc-5ysra-uDNBBCVIfZ-PdPRiw',
  authDomain: 'tweeter-80d2b.firebaseapp.com',
  databaseURL: 'https://tweeter-80d2b.firebaseio.com',
  storageBucket: 'tweeter-80d2b.appspot.com',
  messagingSenderId: '720389042280'
})


/* @returns Firebase Promise of <Void>
*/
export function storeTweet(tweet) {
  const notes = Firebase.database().ref(tweet.id)
  return notes.set(tweet)
}


/* @returns <Twit Promise> with result = <Twitter Response Obj>
*/
export function postTweet(status, media_ids) {
  console.log('posting a tweet')
  console.log(status, media_ids)
  return twitter.post('statuses/update', {
    status,
    media_ids,
    trim_user: true
  })
}



export function postPhoto(file_path, status) {
  console.log('posting some media')
  console.log(file_path)
  return new Promise((resolve, reject) => {
    twitter.postMediaChunked({ file_path }, function(error, data, response) {
      if (error) reject(error)
      else resolve(data)
    })
  })
}
