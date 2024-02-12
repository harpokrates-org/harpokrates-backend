const { createFlickr } = require('flickr-sdk')

class FlickrWrapper {
  constructor(){
    this.caller = createFlickr(process.env.FLICKR_API_KEY).flickr
  }

  async getUser(username) {
    const body = await this.caller('flickr.people.findByUsername', { username })
    return body.user.id
  }
}

module.exports = new FlickrWrapper()
