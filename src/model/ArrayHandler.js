class ArrayHandler {
  constructor(){
    this.array = []
  }

  getArray() {
    return this.array
  }

  pushValueUnique(value) {
    if (this.array.includes(value)) return false
    this.array.push(value)
    return true
  }

  pushArray(array) {
    this.array.push(...array)
  }

  pushArrayUnique(array) {
    this.array.push(...array)
    this.array = [...new Set(this.array)]
  }
}

module.exports = ArrayHandler
