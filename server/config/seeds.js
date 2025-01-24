const db = require('./connection');
const { User, Product, Category } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  await cleanDB('Category', 'categories');
  await cleanDB('Product', 'products');
  await cleanDB('User', 'users');

  const categories = await Category.insertMany([
    { name: 'Camera' },
    { name: 'Microphone' },
    { name: 'switch' },
    { name: 'Lights' },
    { name: 'Stand' }
  ]);

  console.log('categories seeded');

  const products = await Product.insertMany([
    {
      name: 'Sony A1 II Mirrorless Camera',
      description:
        'The Sony a1 II is their most versatile camera yet, offering the best overall mixture of speed, video capabilities, high-resolution stills, and a robust, professional-worthy body design. It pulls much of the original a1',
      image: 'Sonya1.jpg',
      category: categories[0]._id,
      price: 6498.00,
      quantity: 200
    },
    {
      name: 'Sony FE 24-70mm f/2.8 GM II Lens (Sony E)',
      description:
        'A refined take on the fast standard zoom, the Sony FE 24-70mm f/2.8 GM II is not only smaller and lighter than the previous generation',
      image: 'sonyFE28.jpg',
      category: categories[0]._id,
      price: 2298.00,
      quantity: 110
    },
    {
      name: 'Canon EOS R5 Mirrorless Camera',
      description:
        'For the professional image-maker who needs resolution, speed, and video capabilities, the Canon EOS R5 full-frame mirrorless camera features a newly developed 45MP CMOS sensor, which offers 8K raw video recording',
      image: 'canonEOSR5.jpg',
      category: categories[0]._id,
      price: 3399.00,
      quantity: 100
    },
    {
      name: 'Canon RF 24-70mm f/2.8 L IS USM Lens',
      description:
        'oised to be the new workhorse zoom, the Canon RF 24-70mm f/2.8 L IS USM is a versatile wide-angle to portrait-length lens characterized by its bright',
      image: 'canon_3680.jpg',
      category: categories[0]._id,
      price: 2199.00,
      quantity: 50
    },
    {
      name: 'Shure SM7B Vocal Microphone',
      category: categories[1]._id,
      description:
        'The gray Shure SM7B is a vocal microphone with a smooth, flat, and wide-range frequency response appropriate for music and speech in professional audio applications.',
      image: 'shuresm7b.jpeg',
      price: 399.00,
      quantity: 30
    },
    {
      name: 'Shure Super 55',
      category: categories[1]._id,
      description:
        'Presented in a chrome casing with blue foam, the Shure Super 55 is a supercardioid dynamic microphone boasting a classic look and vocal-tailored sound for recording sessions, live stage applications, podcasting, and on-camera use.',
      image: 'Shuresuper55.jpg',
      price: 249.99,
      quantity: 62
    },
    {
      name: 'Blackmagic Design ATEM Mini Pro',
      category: categories[2]._id,
      description:
        'Similar to its predecessor, the ATEM Mini, the ATEM Mini Pro from Blackmagic Design is a four-input, live production switcher with an integrated control panel designed for multi-camera live streaming up to HD video to the internet or broadcast applications',
      image: 'atemminipro.jpeg',
      price: 295.00,
      quantity: 30
    },
    {
      name: 'Blackmagic Design ATEM Mini Pro ISO',
      category: categories[2]._id,
      description:
        'The ATEM Mini Pro ISO HDMI Live Stream Switcher from Blackmagic Design is a four-input live production switcher with an integrated control panel designed for multicamera live streaming up to HD video to the internet via Ethernet output.',
      image: 'atemminiproiso.jpeg',
      price: 495.00,
      quantity: 30
    },
    {
      name: 'Elgato Ring Light',
      category: categories[3]._id,
      description:
        'This Ring Light from Elgato is a 17" light source with a variable color temperature from 2900 to 7000K and a high CRI of 94 to ensure precise color rendition.',
      image: 'elgato.jpg',
      price: 99.99,
      quantity: 110
    },
    {
      name: 'GVM Bi-Color LED Ring Light ',
      category: categories[3]._id,
      description:
        'The 14" Bi-Color LED Ring Light from GVM is a unique light source that envelopes your subject in soft, nearly shadowless light that is very flattering to skin tones and renders interesting catchlights in the eyes of your subject.',
      image: 'gvm.jpg',
      price: 39.99,
      quantity: 110
    },
    {
      name: 'Gator Frameworks Deluxe Frameworks Desk Mount',
      category: categories[4]._id,
      description: 'Gator Frameworks Deluxe Frameworks Desk Mount Mic Boom Stand',
      image: 'gatorframeworks.jpg',
      price: 68.99,
      quantity: 1000
    },
    {
      name: 'Samson MBA38 38" Microphone Boom Arm',
      category: categories[4]._id,
      description:
        'Samson MBA38 38" Microphone Boom Arm',
      image: 'samsonMBA38.jpg',
      price: 69.99,
      quantity: 1000
    }
  ]);

  console.log('products seeded');

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});
