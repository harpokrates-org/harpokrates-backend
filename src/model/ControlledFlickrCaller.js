const { createFlickr } = require('flickr-sdk')
var { Semaphore } = require('async-mutex');
const { logFlickrCall } = require('../utils/logger')

const flickrMethods = {
  findUserByUsername: 'flickr.people.findByUsername',
  getPhotos: 'flickr.people.getPhotos',
  getSizes: 'flickr.photos.getSizes',
  getFavorites: 'flickr.photos.getFavorites',
  getUserProfile: 'flickr.people.getInfo',
}

class ControlledFlickrCaller {
  constructor(){
    this.caller = createFlickr(process.env.FLICKR_API_KEY).flickr
    this.semaphore = new Semaphore(process.env.FLICKR_CALLS_LIMIT)
  }
  
  async getUser(username) {
    const params = { username }
    const [,releaseSemaphore] = await this.semaphore.acquire()
    const body = await this.caller(flickrMethods.findUserByUsername, params)
    releaseSemaphore()
    logFlickrCall(flickrMethods.findUserByUsername, params, body)
    return body
  }
  
  async getUserProfile(userID) {
    const params = { user_id: userID }
    const [,releaseSemaphore] = await this.semaphore.acquire()
    const body = await this.caller(flickrMethods.getUserProfile, params)
    releaseSemaphore()
    logFlickrCall(flickrMethods.getUserProfile, params, body)
    return body
  }
  
  async getPhotos(userID, perPage, minDate, maxDate) {
    const params = { 
      user_id: userID,
      per_page: perPage, 
      min_upload_date: minDate, 
      max_upload_date: maxDate
    }
    const [,releaseSemaphore] = await this.semaphore.acquire()
    const body = await this.caller(flickrMethods.getPhotos, params)
    releaseSemaphore()
    logFlickrCall(flickrMethods.getPhotos, params, body)
    return body
  }
  
  async getSizes(photoID) {
    const params = { photo_id: photoID }
    const [,releaseSemaphore] = await this.semaphore.acquire()
    const body = await this.caller(flickrMethods.getSizes, params)
    releaseSemaphore()
    logFlickrCall(flickrMethods.getSizes, params, body)
    return body
  }
  
  async getFavorites(photoID) {
    const params = { photo_id: photoID }
    const [,releaseSemaphore] = await this.semaphore.acquire()
    const body = await this.caller(flickrMethods.getFavorites, params)
    releaseSemaphore()
    logFlickrCall(flickrMethods.getFavorites, params, body)
    return body
  }
}

module.exports = {
  flickrMethods: flickrMethods,
  ControlledFlickrCallerInstance: new ControlledFlickrCaller()
}