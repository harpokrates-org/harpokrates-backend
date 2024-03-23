const successMock = (callNumber) => {
  const persons = [
    {
      nsid: '200309924@N08',
      ispro: 0,
      is_deleted: 0,
      iconserver: '0',
      iconfarm: 0,
      path_alias: null,
      has_stats: 0,
      username: 'cla.morelli',
      realname: 'Claudio Morelli',
      location: '',
      description: '',
      photosurl: 'https://www.flickr.com/photos/200309924@N08/',
      profileurl: 'https://www.flickr.com/people/200309924@N08/',
      mobileurl: 'https://www.flickr.com/photos/200309924@N08/',
      photos: {
        firstdatetaken: '2024-03-05 09:41:09',
        firstdate: '1710167377',
        count: 1,
      },
      has_adfree: 0,
      has_free_standard_shipping: 0,
      has_free_educational_resources: 0,
      favedate: '1710510928',
    },
    {
      nsid: '194269202@N04',
      ispro: 0,
      is_deleted: 0,
      iconserver: '65535',
      iconfarm: 66,
      path_alias: 'nicoocares_',
      has_stats: 0,
      username: 'Nico.Ocares_',
      realname: 'Nicolás  Ocares',
      location: 'hamburgo',
      description: 'fotografía por el mundo',
      photosurl: 'https://www.flickr.com/photos/nicoocares_/',
      profileurl: 'https://www.flickr.com/people/nicoocares_/',
      mobileurl: 'https://www.flickr.com/photos/nicoocares_/',
      photos: {
        firstdatetaken: '2021-07-11 06:55:00',
        firstdate: '1635272075',
        count: 109,
      },
      has_adfree: 0,
      has_free_standard_shipping: 0,
      has_free_educational_resources: 0,
      favedate: '1709596626',
    },
    {
      nsid: '200160903@N07',
      ispro: 0,
      is_deleted: 0,
      iconserver: '65535',
      iconfarm: 66,
      path_alias: null,
      has_stats: 0,
      username: 'bluewolf2089',
      realname: 'Bryce Irving',
      location: 'Baytown, Texas',
      description: 'My name is Bryce Irving. I am a professional graphic designer and photographer from Beaumont, Texas in 2008 I graduated  from Lee College in Baytown, Tx in Creative Arts then 2018 I went to Northwestern State University and  graduated with a Bachelors in Graphic and Fine Arts.',
      photosurl: 'https://www.flickr.com/photos/200160903@N07/',
      profileurl: 'https://www.flickr.com/people/200160903@N07/',
      mobileurl: 'https://www.flickr.com/photos/200160903@N07/',
      photos: {
        firstdatetaken: '2020-12-13 18:25:01',
        firstdate: '1709141411',
        count: 55,
      },
      has_adfree: 0,
      has_free_standard_shipping: 0,
      has_free_educational_resources: 0,
      favedate: '1709315452',
    },
    {
      nsid: '199650309@N03',
      ispro: 0,
      is_deleted: 0,
      iconserver: '65535',
      iconfarm: 66,
      path_alias: null,
      has_stats: 0,
      username: 'Carl Ku',
      realname: 'Carl Ku',
      location: '',
      description: '',
      photosurl: 'https://www.flickr.com/photos/199650309@N03/',
      profileurl: 'https://www.flickr.com/people/199650309@N03/',
      mobileurl: 'https://www.flickr.com/photos/199650309@N03/',
      photos: {
        firstdatetaken: '2017-10-22 17:30:37',
        firstdate: '1701787281',
        count: 8,
      },
      has_adfree: 0,
      has_free_standard_shipping: 0,
      has_free_educational_resources: 0,
      favedate: '1709234088',
    },
    {
      nsid: '52937224@N08',
      ispro: 1,
      is_deleted: 0,
      iconserver: '65535',
      iconfarm: 66,
      path_alias: 'sigpho',
      has_stats: 0,
      pro_badge: 'standard',
      expire: '0',
      username: 'Sigpho',
      description: 'In 1984 I got my first Camera, a Nikon FE2 which I still have. It took me a few years before I had a clue what I was doing with it. In the late 80’s I started taking picture of mostly models until about the mid 90’s. I stopped doing that and begun taking wedding photos for friends, family and the occasional friend of a friend using rented Hasselblad equipment. I slowly lost interest in that and only took pictures of my family.\n\n“Sigpho” is short for Signature Photography, in case you’re wondering about the name. It was the name I used during my wedding and modeling days.\n\nIn 2003 I got my first digital camera, a Canon G2. It took incredible close-ups but it lacked the speed and details I was use to with film, especially medium format. In 2005 I got a Nikon D70 with a kit lens. I enjoyed not having to buy and develop film, but wasn’t too happy with the digital resolution. For several years I stopped taking pictures and only took the camera out during holidays. \n\nIt wasn’t until August of 2010 a good friend got me back into it. I had lost my appetite for taking pictures until I started looking at some of his work and the incredible photo’s on Flickr (see some of my favorites). I still use the D70 but now with a few pro-grade lenses. \n\nThanks to all of you, I’m starting to rekindle my desire for something I once loved. After looking at some of my fellow flickr photographers, I feel I’ve lost a fair bit of ground over the years. Nevertheless, I once again really love taking pictures just as much as I love looking at them. I spend most of my time these days in awe of some of the work on this site.\n\nHopefully you’ll find something in my photostream that’s a little pleasing to your eyes. Enjoy and thanks.\n\n\nThanks for the visit.',
      photosurl: 'https://www.flickr.com/photos/sigpho/',
      profileurl: 'https://www.flickr.com/people/sigpho/',
      mobileurl: 'https://www.flickr.com/photos/sigpho/',
      photos: {
        firstdatetaken: '2010-01-10 00:00:00',
        firstdate: '1281376800',
        count: 3176,
      },
      has_adfree: 0,
      has_free_standard_shipping: 0,
      has_free_educational_resources: 0,
      favedate: '1709158958',
    },
    {
      nsid: '199565274@N07',
      ispro: 0,
      is_deleted: 0,
      iconserver: '0',
      iconfarm: 0,
      path_alias: null,
      has_stats: 0,
      username: 'maiytcuseless',
      realname: 'Thibault Couturier',
      location: '',
      description: '',
      photosurl: 'https://www.flickr.com/photos/199565274@N07/',
      profileurl: 'https://www.flickr.com/people/199565274@N07/',
      mobileurl: 'https://www.flickr.com/photos/199565274@N07/',
      photos: {
        count: 0,
      },
      has_adfree: 0,
      has_free_standard_shipping: 0,
      has_free_educational_resources: 0,
      favedate: '1708283762',
    },
    {
      nsid: '61501664@N08',
      ispro: 0,
      is_deleted: 0,
      iconserver: '4597',
      iconfarm: 5,
      path_alias: 'k4rla',
      has_stats: 0,
      username: 'Karolina Jantas',
      description: '',
      photosurl: 'https://www.flickr.com/photos/k4rla/',
      profileurl: 'https://www.flickr.com/people/k4rla/',
      mobileurl: 'https://www.flickr.com/photos/k4rla/',
      photos: {
        firstdatetaken: '2008-06-12 21:26:18',
        firstdate: '1329687768',
        count: 315,
      },
      has_adfree: 0,
      has_free_standard_shipping: 0,
      has_free_educational_resources: 0,
      favedate: '1708117940',
    },
    {
      nsid: '134617293@N02',
      ispro: 0,
      is_deleted: 0,
      iconserver: '304',
      iconfarm: 1,
      path_alias: null,
      has_stats: 0,
      username: 'mflowe1950',
      realname: 'Michael Lowe',
      location: 'Port Deposit, United States',
      description: '',
      photosurl: 'https://www.flickr.com/photos/134617293@N02/',
      profileurl: 'https://www.flickr.com/people/134617293@N02/',
      mobileurl: 'https://www.flickr.com/photos/134617293@N02/',
      photos: {
        firstdatetaken: '2007-05-29 11:42:13',
        firstdate: '1485394161',
        count: 696,
      },
      has_adfree: 0,
      has_free_standard_shipping: 0,
      has_free_educational_resources: 0,
      favedate: '1708025637',
    },
    {
      nsid: '200137242@N08',
      ispro: 0,
      is_deleted: 0,
      iconserver: '65535',
      iconfarm: 66,
      path_alias: null,
      has_stats: 0,
      username: 'kanaraslihan30',
      realname: 'Aslimu Aslimu',
      location: '',
      description: '',
      photosurl: 'https://www.flickr.com/photos/200137242@N08/',
      profileurl: 'https://www.flickr.com/people/200137242@N08/',
      mobileurl: 'https://www.flickr.com/photos/200137242@N08/',
      photos: {
        firstdatetaken: '2023-11-04 16:50:43',
        firstdate: '1707905158',
        count: 7,
      },
      has_adfree: 0,
      has_free_standard_shipping: 0,
      has_free_educational_resources: 0,
      favedate: '1707905444',
    },
    {
      nsid: '200017628@N03',
      ispro: 0,
      is_deleted: 0,
      iconserver: '65535',
      iconfarm: 66,
      path_alias: null,
      has_stats: 0,
      username: 'carlorenzi02',
      realname: 'Carlo Renzi',
      location: '',
      description: '',
      photosurl: 'https://www.flickr.com/photos/200017628@N03/',
      profileurl: 'https://www.flickr.com/people/200017628@N03/',
      mobileurl: 'https://www.flickr.com/photos/200017628@N03/',
      photos: {
        firstdatetaken: '2023-02-22 13:59:32',
        firstdate: '1707184790',
        count: 57,
      },
      has_adfree: 0,
      has_free_standard_shipping: 0,
      has_free_educational_resources: 0,
      favedate: '1707234759',
    },
  ]

  const askljfd = {
    photo: {
      person: [
        persons[callNumber % persons.length],
        persons[(callNumber + 1) % persons.length],
        persons[(callNumber + 2) % persons.length],
      ],
      id: '51298709139',
      secret: '6af0f7313f',
      server: '65535',
      farm: 66,
      page: 1,
      pages: 254,
      perpage: 10,
      total: 2534,
    },
    stat: 'ok',
  }
  return askljfd
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

