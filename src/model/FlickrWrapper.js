const { createFlickr } = require('flickr-sdk')
const UserNotFoundError = require('../errors/FlickerWrapperErrors')
const errors = {
  USER_NOT_FOUND: 'User not found',
}

class FlickrWrapper {
  constructor(){
    this.caller = createFlickr(process.env.FLICKR_API_KEY).flickr
  }

  async getUser(username) {
    try{
      const body = await this.caller('flickr.people.findByUsername', { username })
      return body.user.id
    } catch(error){
      if (error.message === errors.USER_NOT_FOUND)
        throw new UserNotFoundError()
    }
  }
}

module.exports = new FlickrWrapper()
