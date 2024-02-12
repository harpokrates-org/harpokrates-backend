const { createFlickr } = require('flickr-sdk')
const { UserNotFoundError } = require('../errors/FlickerWrapperErrors')
const { logFlickrCall } = require('../utils/logger')
const flickrMethods = {
  findUserByUsername: 'flickr.people.findByUsername',
}
const errors = {
  USER_NOT_FOUND: 'User not found',
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
      if (error.message === errors.USER_NOT_FOUND)
        throw new UserNotFoundError()
    }
  }
}

module.exports = new FlickrWrapper()
