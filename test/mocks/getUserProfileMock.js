const successMock = () => {
  return {
    person: {
      id: '147690652@N06',
      nsid: '147690652@N06',
      ispro: 0,
      is_deleted: 0,
      iconserver: '2705',
      iconfarm: 3,
      path_alias: null,
      has_stats: 0,
      username: {
        _content: 'AllaTabashnikova'
      },
      realname: {
        _content: 'Alla Tabashnikova'
      },
      description: {
        _content: 'The more I shoot, the more I love photography! 💕\nThank you so much to everyone for visiting my photostream and taken the time to comment on my images. 😊'
      },
      photosurl: {
        _content: 'https://www.flickr.com/photos/147690652@N06/'
      },
      profileurl: {
        _content: 'https://www.flickr.com/people/147690652@N06/'
      },
      mobileurl: {
        _content: 'https://www.flickr.com/photos/147690652@N06/'
      },
      photos: {
        firstdatetaken: {
          '_content': '2012-07-21 11:39:56'
        },
        firstdate: {
          '_content': '1488297660'
        },
        count: {
          '_content': 453
        }
      },
      has_adfree: 0,
      has_free_standard_shipping: 0,
      has_free_educational_resources: 0
    },
    stat: 'ok',
  }
}

const noPhotoMock = () => {
  return {
    person: {
      id: '197864017@N02',
      nsid: '197864017@N02',
      ispro: 0,
      is_deleted: 0,
      iconserver: '0',
      iconfarm: 0,
      path_alias: null,
      has_stats: 0,
      username: {
        _content: 'eugefranx',
      },
      realname: {
        _content: 'Euge Franchi',
      },
      location: {
        _content: '',
      },
      description: {
        _content: 'Soy un apasionado de la fotografía y me encanta capturar momentos especiales de la vida. Me gusta explorar diferentes estilos y técnicas, y siempre estoy buscando nuevas formas de mejorar mis habilidades.',
      },
      photosurl: {
        _content: 'https://www.flickr.com/photos/197864017@N02/',
      },
      profileurl: {
        _content: 'https://www.flickr.com/people/197864017@N02/',
      },
      mobileurl: {
        _content: 'https://www.flickr.com/photos/197864017@N02/',
      },
      photos: {
        count: {
          _content: 0,
        },
      },
      has_adfree: 0,
      has_free_standard_shipping: 0,
      has_free_educational_resources: 0,
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
  noPhotoMock,
  notFoundMock,
}

