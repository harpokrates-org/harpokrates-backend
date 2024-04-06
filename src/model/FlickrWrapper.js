var Mutex = require('async-mutex').Mutex;
const { createFlickr } = require('flickr-sdk')
const { UserNotFoundError, UnknownUserError, PhotoNotFoundError } = require('../errors/FlickerWrapperErrors')
const { logFlickrCall } = require('../utils/logger')
const GRAPH_DEAPTH = 2

const flickrMethods = {
  findUserByUsername: 'flickr.people.findByUsername',
  getPhotos: 'flickr.people.getPhotos',
  getSizes: 'flickr.photos.getSizes',
  getFavorites: 'flickr.photos.getFavorites',
  getUserProfile: 'flickr.people.getInfo',
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

  async getUserProfile(userID) {
    try{
      const params = { user_id: userID }
      const body = await this.caller(flickrMethods.getUserProfile, params)
      logFlickrCall(flickrMethods.getUserProfile, params, body)
      const { nsid, iconfarm, iconserver } = body.person
      const photo = iconfarm !== 0 ? `https://farm${iconfarm}.staticflickr.com/${iconserver}/buddyicons/${nsid}.jpg` : null
      return {
        username: body.person.username._content,
        realname: body.person.realname._content,
        description: body.person.description._content,
        photo,
      }
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
      logFlickrCall(flickrMethods.getSizes, params, body)
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

  async getUsersWhoHaveFavorited(mainUsername, photoIDs, photosPerFavorite, depth = GRAPH_DEAPTH, mutex = new Mutex(),
    nodes = new Set([mainUsername]), edges = new Set(), queue = [mainUsername]) {
    try{
      const release = await mutex.acquire()
      if (depth === 0 || queue.length === 0) {
        release()
        return { nodes: [ ...nodes ], edges: [] }
      }
      const nextUsername = queue.shift()
      release()

      let promises = []
      for (const photoID of photoIDs) {
        promises.push(this._getFavoritesInPhoto(nextUsername, photoID, photosPerFavorite, depth - 1, mutex, nodes, edges, queue))
      }

      await Promise.all(promises)
      return { nodes: Array.from(nodes), edges: Array.from(edges) }
    } catch(error){
      if (errors[error.message]) throw new errors[error.message]()
      throw error
    }
  }

  /*
  Para la foto dada por el photoID, obtiene agrega a nodes y edges los usuarios que hayan
  dado favorito, a dicha foto y a la última foto subida por estos, recursivamente, dando
  como resultado un grafo de profundidad máxima "profundidad".
  Si hay algun error en la búsqueda de un usuario o foto, continúa la búsqueda del grafo
  */
  async _getFavoritesInPhoto(username, photoID, photosPerFavorite, depth, mutex, nodes, edges, queue) {
    try {
      const params = { photo_id: photoID }
      const body = await this.caller(flickrMethods.getFavorites, params)
      logFlickrCall(flickrMethods.getFavorites, params, body)
      const otherProm = body.photo.person.map(async user => {
        const release = await mutex.acquire()
        edges.add([user.username, username])
        if (!nodes.has(user.username)) {
          nodes.add(user.username)
          queue.push(user.username)
          release()
  
          try {
            const userPhotoIDs = await this._getPhotoIds(user.username, photosPerFavorite)
            return await this.getUsersWhoHaveFavorited(user.username, userPhotoIDs, photosPerFavorite, depth, mutex, nodes, edges, queue)
          } catch (error) { return }
        } else {
          release()
        }
      })

      return await Promise.all(otherProm)
    } catch (error) { return }
  }

  async _getPhotoIds(username, q){
    const userId = await this.getUser(username)
    const userPhotos = await this.getPhotos(userId, q)
    return userPhotos.map(photo => photo.id)
  }

  async getUserPhotos(username, count) {
    try{
      const userId = await this.getUser(username);
      const userPhotos = await this.getPhotos(userId, count)
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
  flickrMethods: flickrMethods,
  flickrWrapperInstance: new FlickrWrapper()
}
