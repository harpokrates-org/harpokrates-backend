var Mutex = require('async-mutex').Mutex;
const { createFlickr } = require('flickr-sdk')
const { UserNotFoundError, UnknownUserError, PhotoNotFoundError } = require('../errors/FlickerWrapperErrors')
const { logFlickrCall } = require('../utils/logger')
const PROFUNDIDAD_GRAFO = 2
const flickrMethods = {
  findUserByUsername: 'flickr.people.findByUsername',
  getPhotos: 'flickr.people.getPhotos',
  getSizes: 'flickr.photos.getSizes',
  getFavorites: 'flickr.photos.getFavorites',
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

  async getUsersWhoHaveFavorited(mainUsername, photoIDs, profundidad = PROFUNDIDAD_GRAFO, mutex = new Mutex(),
  nodes = new Set([mainUsername]), edges = new Set(), queue = [mainUsername]) {
    try{
      const release = await mutex.acquire()
      if (profundidad === 0 || queue.length === 0) return release()
      const nextUsername = queue.shift()
      release()

      let promises = []
      for (const photoID of photoIDs) {
        promises.push(this._getFavoritesInPhoto(nextUsername, photoID, profundidad - 1, mutex, nodes, edges, queue))
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
  async _getFavoritesInPhoto(username, photoID, profundidad, mutex, nodes, edges, queue) {
    try {
      const params = { photo_id: photoID }
      const body = await this.caller(flickrMethods.getFavorites, params)
      logFlickrCall(flickrMethods.getFavorites, params, body)
      const otherProm = body.photo.person.map(async user => {
        const release = await mutex.acquire()
        if (!nodes.has(user.username)) {
          nodes.add(user.username)
          edges.add([user.username, username])
          queue.push(user.username)
          release()
  
          try {
            const userId = await this.getUser(user.username)
            const userPhotos = await this.getPhotos(userId, 1)
            const userPhotoIDs = userPhotos.map(photo => photo.id)
            return await this.getUsersWhoHaveFavorited(user.username, userPhotoIDs, profundidad, mutex, nodes, edges, queue)
          } catch (error) { return }
        } else {
          release()
        }
      })

      return await Promise.all(otherProm)
    } catch (error) { return }
  }
}

module.exports = new FlickrWrapper()
