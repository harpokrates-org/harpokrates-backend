var { Mutex } = require('async-mutex');

class SafeArray {
  constructor(){
    this.array = []
    this.mutex = new Mutex()
  }
  
  getArray() {
    return this.array
  }
  
  async pushValue(value) {
    let releaseMutex = await this.mutex.acquire()
    this.array.push(value)
    releaseMutex()
  }

  async pushArray(array) {
    let releaseMutex = await this.mutex.acquire()
    this.array.push(...array)
    releaseMutex()
  }
}

module.exports = SafeArray
