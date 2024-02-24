const { createFlickr } = require('flickr-sdk')
const { UserNotFoundError, UnknownUserError, PhotoNotFoundError } = require('../errors/FlickerWrapperErrors')
const { logFlickrCall } = require('../utils/logger')

const flickrMethods = {
  findUserByUsername: 'flickr.people.findByUsername',
  getPhotos: 'flickr.people.getPhotos',
  getSizes: 'flickr.photos.getSizes'
}

const errors = {
  'User not found': UserNotFoundError,
  'Unknown user': UnknownUserError,
  'Photo not found': PhotoNotFoundError,
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
      let errorToThrow = error
      if (errors[error.message]) errorToThrow = new errors[error.message]()
      throw errorToThrow
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

  async getSizes(photoID) {
    try{
      const params = { photo_id: photoID }
      const body = await this.caller(flickrMethods.getSizes, params)
      logFlickrCall(flickrMethods.getPhotos, params, body)
      const sizes = body.sizes.size.map(p => ({ 
        label: p.label, 
        width: p.width,
        height: p.height,
        source: p.source 
      }))
      return sizes
    } catch(error){
      if (errors[error.message]) throw new errors[error.message]()
      throw error
    }
  }
}

module.exports = new FlickrWrapper()
