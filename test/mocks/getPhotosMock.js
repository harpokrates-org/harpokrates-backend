const successMock = (id, count) => {
  const photosBase = {
    photos: {
      page: 1,
      pages: 17,
      perpage: 3,
      total: 50,
      photo: []
    },
    stat: 'ok'
  }
  const titles = ['North Caucasus', 'View of Elbrus', 'On the way to Djily-Su']
  const photoBase = {
    id: 53526923995,
    owner: id,
    secret: 'cdc04156f8',
    server: '65535',
    farm: 66,
    title: 'North Caucasus',
    ispublic: 1,
    isfriend: 0,
    isfamily: 0
  }
  
  for (let i = 0; i < count; i++) {
    photosBase.photos.photo.push({
      ...photoBase,
      title: titles[i%3] + ' ' + i,
      id: (photoBase.id + i).toString()
    })
  }

  return photosBase
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

