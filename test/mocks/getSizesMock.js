const successMock = () => {
  return {
    sizes: {
      canblog: 0,
      canprint: 0,
      candownload: 0,
      size: [
        {
          label: 'Square',
          width: 75,
          height: 75,
          source: 'https://live.staticflickr.com/65535/51298709139_6af0f7313f_s.jpg',
          url: 'https://www.flickr.com/photos/86832534@N03/51298709139/sizes/sq/',
          media: 'photo',
        },
        {
          label: 'Large Square',
          width: 150,
          height: 150,
          source: 'https://live.staticflickr.com/65535/51298709139_6af0f7313f_q.jpg',
          url: 'https://www.flickr.com/photos/86832534@N03/51298709139/sizes/q/',
          media: 'photo',
        },
        {
          label: 'Thumbnail',
          width: 100,
          height: 67,
          source: 'https://live.staticflickr.com/65535/51298709139_6af0f7313f_t.jpg',
          url: 'https://www.flickr.com/photos/86832534@N03/51298709139/sizes/t/',
          media: 'photo',
        },
        {
          label: 'Small',
          width: 240,
          height: 160,
          source: 'https://live.staticflickr.com/65535/51298709139_6af0f7313f_m.jpg',
          url: 'https://www.flickr.com/photos/86832534@N03/51298709139/sizes/s/',
          media: 'photo',
        },
        {
          label: 'Small 320',
          width: 320,
          height: 213,
          source: 'https://live.staticflickr.com/65535/51298709139_6af0f7313f_n.jpg',
          url: 'https://www.flickr.com/photos/86832534@N03/51298709139/sizes/n/',
          media: 'photo',
        },
        {
          label: 'Small 400',
          width: 400,
          height: 267,
          source: 'https://live.staticflickr.com/65535/51298709139_6af0f7313f_w.jpg',
          url: 'https://www.flickr.com/photos/86832534@N03/51298709139/sizes/w/',
          media: 'photo',
        },
        {
          label: 'Medium',
          width: 500,
          height: 333,
          source: 'https://live.staticflickr.com/65535/51298709139_6af0f7313f.jpg',
          url: 'https://www.flickr.com/photos/86832534@N03/51298709139/sizes/m/',
          media: 'photo',
        },
        {
          label: 'Medium 640',
          width: 640,
          height: 427,
          source: 'https://live.staticflickr.com/65535/51298709139_6af0f7313f_z.jpg',
          url: 'https://www.flickr.com/photos/86832534@N03/51298709139/sizes/z/',
          media: 'photo',
        },
        {
          label: 'Medium 800',
          width: 800,
          height: 533,
          source: 'https://live.staticflickr.com/65535/51298709139_6af0f7313f_c.jpg',
          url: 'https://www.flickr.com/photos/86832534@N03/51298709139/sizes/c/',
          media: 'photo',
        },
        {
          label: 'Large',
          width: 1024,
          height: 683,
          source: 'https://live.staticflickr.com/65535/51298709139_6af0f7313f_b.jpg',
          url: 'https://www.flickr.com/photos/86832534@N03/51298709139/sizes/l/',
          media: 'photo',
        },
        {
          label: 'Large 1600',
          width: 1600,
          height: 1067,
          source: 'https://live.staticflickr.com/65535/51298709139_06fa7ab24f_h.jpg',
          url: 'https://www.flickr.com/photos/86832534@N03/51298709139/sizes/h/',
          media: 'photo',
        },
        {
          label: 'Large 2048',
          width: 2048,
          height: 1365,
          source: 'https://live.staticflickr.com/65535/51298709139_230e0d4089_k.jpg',
          url: 'https://www.flickr.com/photos/86832534@N03/51298709139/sizes/k/',
          media: 'photo',
        },
        {
          label: 'X-Large 3K',
          width: 3072,
          height: 2048,
          source: 'https://live.staticflickr.com/65535/51298709139_b2662bbf70_3k.jpg',
          url: 'https://www.flickr.com/photos/86832534@N03/51298709139/sizes/3k/',
          media: 'photo',
        },
        {
          label: 'X-Large 4K',
          width: 4096,
          height: 2731,
          source: 'https://live.staticflickr.com/65535/51298709139_262fb89783_4k.jpg',
          url: 'https://www.flickr.com/photos/86832534@N03/51298709139/sizes/4k/',
          media: 'photo',
        },
        {
          label: 'X-Large 5K',
          width: 5120,
          height: 3413,
          source: 'https://live.staticflickr.com/65535/51298709139_8104cb3013_5k.jpg',
          url: 'https://www.flickr.com/photos/86832534@N03/51298709139/sizes/5k/',
          media: 'photo',
        },
        {
          label: 'X-Large 6K',
          width: 6000,
          height: 4000,
          source: 'https://live.staticflickr.com/65535/51298709139_10fe49721f_6k.jpg',
          url: 'https://www.flickr.com/photos/86832534@N03/51298709139/sizes/6k/',
          media: 'photo',
        },
      ],
    },
    stat: 'ok',
  }
}

const photoNotFoundMock = () => {
  throw {
    message: 'Photo not found'
  }
}

module.exports = {
  successMock,
  photoNotFoundMock,
}

