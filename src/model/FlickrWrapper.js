const { UserNotFoundError, UnknownUserError, PhotoNotFoundError } = require('../errors/FlickerWrapperErrors')
const util = require('util')
const retry = require('async-await-retry');
const SafeArray = require('../model/SafeArray')
const { ControlledFlickrCallerInstance } = require('./ControlledFlickrCaller');

const GRAPH_DEAPTH = 2
const RETRY_FACTOR = process.env.NODE_ENV === 'production' ? 10 : 3;
const MILISECS_IN_SEC = 1000

const errors = {
  'User not found': UserNotFoundError,
  'Unknown user': UnknownUserError,
  'Photo not found': PhotoNotFoundError,
}

class FlickrWrapper {
  constructor(){
    this.caller = ControlledFlickrCallerInstance
  }

  async getUser(username) {
    try{
      const body = await this.caller.getUser(username)
      return body.user.id
    } catch(error){
      let errorToThrow = error
      if (errors[error.message]) errorToThrow = new errors[error.message]()
      throw errorToThrow
    }
  }

  async getUserProfile(userID) {
    try{
      const body = await this.caller.getUserProfile(userID)
      const { nsid, iconfarm, iconserver } = body.person
      const photo = iconfarm !== 0 ? `https://farm${iconfarm}.staticflickr.com/${iconserver}/buddyicons/${nsid}.jpg` : null
      return {
        username: body.person.username._content,
        realname: body.person.realname ? body.person.realname._content : body.person.username._content,
        description: body.person.description._content,
        photo,
      }
    } catch(error){
      let errorToThrow = error
      if (errors[error.message]) errorToThrow = new errors[error.message]()
      throw errorToThrow
    }
  }

  async getPhotos(userID, perPage=100, minDate, maxDate) {
    try{
      const body = await this.caller.getPhotos(userID, perPage, minDate / MILISECS_IN_SEC, maxDate / MILISECS_IN_SEC)
      const photos = body.photos.photo.map(p => ({ id: p.id, title: p.title }))
      return photos
    } catch(error){
      if (errors[error.message]) throw new errors[error.message]()
      throw error
    }
  }

  async getSizes(photoID) {
    try{
      const body = await this.caller.getSizes(photoID)
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

  async _getFavorites(photoID) {
    try{
      const body = await this.caller.getFavorites(photoID)
      const favorites = body.photo.person.map(p => p.username)
      return favorites
    } catch(error){
      if (errors[error.message]) throw new errors[error.message]()
      throw error
    }
  }

  async getFavoritesGraph(username, photoIDs, photosPerFavorite, depth = GRAPH_DEAPTH,
    nodes = new SafeArray(), edges = new SafeArray()) {
    try{
      await nodes.pushValue(username)
      if (depth === 0) return { nodes: nodes.getArray(), edges: edges.getArray() }

      let promises = []

      for (const photoID of photoIDs) {
        const favorites = await this._getFavorites(photoID)
        
        const newEdges = favorites.map(favorite => [ favorite, username ])
        await edges.pushArray(newEdges)
        if (depth === 1) {
          await nodes.pushArray(favorites)
          continue
        }
        
        for (const favorite of favorites) {
          if (nodes.includes(favorite)) continue
          promises.push(this.nextUserGraph(favorite, photosPerFavorite, depth, nodes, edges))
        }
      }
      
      await Promise.all(promises)
      return { nodes: nodes.getArray(), edges: edges.getArray() }
    } catch(error){
      if (errors[error.message]) throw new errors[error.message]()
      throw error
    }
  }
  
  async nextUserGraph(username, photosPerFavorite, depth, nodes, edges) {
    try {
      let userPhotoIDs = await retry(async () => {
        const response = await this._getPhotoIds(username, photosPerFavorite);
        return response
      }, null, {retriesMax: 4, interval: 100, exponential: true, factor: RETRY_FACTOR, jitter: 100});
      await this.getFavoritesGraph(username, userPhotoIDs, photosPerFavorite, depth - 1, nodes, edges)
    } catch (error) { 
      console.log(util.inspect(error, {showHidden: false, depth: null, colors: true}))
      return 
    }
  }

  async _getPhotoIds(username, q){
    const userId = await this.getUser(username)
    const userPhotos = await this.getPhotos(userId, q)
    return userPhotos.map(photo => photo.id)
  }

  async getUserPhotos(userID, count, minDate, maxDate) {
    try{
      const userPhotos = await this.getPhotos(userID, count, minDate, maxDate)
      const proms = userPhotos.map(async photo => {
        const data = {
          id: photo.id,
          title: photo.title,
          sizes: await this.getSizes(photo.id)
        }
        return data
      })
      const response = await Promise.all(proms);
      return response;
    } catch(error){
      let errorToThrow = error
      if (errors[error.message]) errorToThrow = new errors[error.message]()
      throw errorToThrow
    }
  }
}

module.exports = {
  flickrWrapperInstance: new FlickrWrapper()
}
