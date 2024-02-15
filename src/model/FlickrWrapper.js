const { createFlickr } = require('flickr-sdk')
const { UserNotFoundError, UnknownUserError } = require('../errors/FlickerWrapperErrors')
const { logFlickrCall } = require('../utils/logger')
const flickrMethods = {
  findUserByUsername: 'flickr.people.findByUsername',
  getPhotos: 'flickr.people.getPhotos'
}
const errors = {
  'User not found': UserNotFoundError,
  'Unknown user': UnknownUserError,
}

class FlickrWrapper {
  constructor(){
    this.caller = createFlickr(process.env.FLICKR_API_KEY).flickr
  }

  async getUser(username) {
    try{
      const params = { username }
      const body = await this.caller(flickrMethods.findUserByUsername, params)
      logFlickrCall(flickrMethods.findUserByUsername, params, body)
      return body.user.id
    } catch(error){
      if (errors[error.message]) throw new errors[error.message]()
      throw error
    }
  }

  async getPhotos(userID, perPage=100) {
    try{
      const params = { user_id: userID, per_page: perPage }
      const body = await this.caller(flickrMethods.getPhotos, params)
      logFlickrCall(flickrMethods.getPhotos, params, body)
      const photos = body.photos.photo.map(p => ({ id: p.id, title: p.title }))
      return photos
    } catch(error){
      if (errors[error.message]) throw new errors[error.message]()
      throw error
    }
  }
}

module.exports = new FlickrWrapper()
