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
    if (this.array.includes(value)) return false
    this.array.push(value)
    releaseMutex()
    return true
  }

  async pushArray(array) {
    let releaseMutex = await this.mutex.acquire()
    this.array.push(...array)
    releaseMutex()
  }
}

module.exports = SafeArray
