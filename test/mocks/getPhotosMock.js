const successMock = (id) => {
  return {
    photos: {
      page: 1,
      pages: 5,
      perpage: 100,
      total: 451,
      photo: [
        {
          id: '53526923995',
          owner: id,
          secret: 'cdc04156f8',
          server: '65535',
          farm: 66,
          title: 'North Caucasus',
          ispublic: 1,
          isfriend: 0,
          isfamily: 0
        },
        {
          id: '53517261997',
          owner: id,
          secret: '43305b9e8f',
          server: '65535',
          farm: 66,
          title: 'View of Elbrus',
          ispublic: 1,
          isfriend: 0,
          isfamily: 0
        },
        {
          id: '53492541823',
          owner: id,
          secret: '03316de04f',
          server: '65535',
          farm: 66,
          title: 'On the way to Djily-Su',
          ispublic: 1,
          isfriend: 0,
          isfamily: 0
        },
      ]
    },
    stat: 'ok'
  }
}

const unknownUserMock = () => {
  throw {
    message: 'Unknown user'
  }
}

module.exports = {
  successMock,
  unknownUserMock,
}

