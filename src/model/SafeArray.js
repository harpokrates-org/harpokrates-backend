var { Mutex } = require('async-mutex');

class SafeArray {
  constructor(){
    this.array = []
    this.mutex = new Mutex()
  }

  getArray() {
    return this.array
  }

  async pushValueIfNotExists(value) {
    let releaseMutex = await this.mutex.acquire()
    if (this.array.includes(value)){
      releaseMutex()
      return false
    }
    this.array.push(value)
    releaseMutex()
    return true
  }

  async pushArray(array) {
    let releaseMutex = await this.mutex.acquire()
    this.array.push(...array)
    releaseMutex()
  }

  async pushArrayUnique(array) {
    let releaseMutex = await this.mutex.acquire()
    this.array.push(...array)
    this.array = [...new Set(this.array)]
    releaseMutex()
  }
}

module.exports = SafeArray
