const SafeArray = require("../src/model/SafeArray")

describe('SafeArray tests', () => {

  test('push one value', async () => {
    const array = new SafeArray()
    const value = 123
    await array.pushValue(value)

    expect(array.getArray().length).toBe(1)
    expect(array.getArray()[0]).toBe(value)
  })

  test('push a second value', async () => {
    const array = new SafeArray()
    const value1 = 123
    const value2 = 456
    await array.pushValue(value1)
    await array.pushValue(value2)

    expect(array.getArray().length).toBe(2)
    expect(array.getArray()[0]).toBe(value1)
    expect(array.getArray()[1]).toBe(value2)
  })

  test('push array', async () => {
    const array = new SafeArray()
    const arrayToPush = [ 123, 456 ]
    await array.pushArray(arrayToPush)

    expect(array.getArray().length).toBe(2)
    expect(array.getArray()[0]).toBe(arrayToPush[0])
    expect(array.getArray()[1]).toBe(arrayToPush[1])
  })

  test('push a second array', async () => {
    const array = new SafeArray()
    const arrayToPush1 = [ 123, 456 ]
    const arrayToPush2 = [ 789, 100 ]
    await array.pushArray(arrayToPush1)
    await array.pushArray(arrayToPush2)

    expect(array.getArray().length).toBe(4)
    expect(array.getArray()[0]).toBe(arrayToPush1[0])
    expect(array.getArray()[1]).toBe(arrayToPush1[1])
    expect(array.getArray()[2]).toBe(arrayToPush2[0])
    expect(array.getArray()[3]).toBe(arrayToPush2[1])
  })

  afterAll(async () => {
    app.close()
    DataBase.close()
  })
})
