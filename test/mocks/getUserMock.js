const successMock = (id) => {
  return {
    user: {
      id,
      nsid: id,
      username: {
        _content: 'shutterbug_uk2012',
      },
    },
    stat: 'ok',
  }
}

const notFoundMock = () => {
  throw {
    message: 'User not found'
  }
}

module.exports = {
  successMock,
  notFoundMock,
}

