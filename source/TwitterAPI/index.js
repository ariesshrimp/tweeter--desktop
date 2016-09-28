'use strict'
import Twitter from 'twit'
import Firebase from 'firebase'
import Config from './config.json'

/* API console: https://apps.twitter.com/app/12881539/show
*/
const twitter = new Twitter(Config.twitter)


/* API console: https://console.firebase.google.com/project/tweeter-80d2b/database/data
*/
const app = Firebase.initializeApp(config.firebase)


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
