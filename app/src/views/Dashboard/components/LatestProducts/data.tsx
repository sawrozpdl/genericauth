import moment from 'moment';

export default [
  {
    id: 1,
    name: 'Dropbox',
    imageUrl: '/images/products/product_1.png',
    updatedAt: moment().subtract(2, 'hours'),
  },
  {
    id: 2,
    name: 'Medium Corporation',
    imageUrl: '/images/products/product_2.png',
    updatedAt: moment().subtract(2, 'hours'),
  },
  {
    id: 3,
    name: 'Slack',
    imageUrl: '/images/products/product_3.png',
    updatedAt: moment().subtract(3, 'hours'),
  },
  {
    id: 4,
    name: 'Lyft',
    imageUrl: '/images/products/product_4.png',
    updatedAt: moment().subtract(5, 'hours'),
  },
  {
    id: 5,
    name: 'GitHub',
    imageUrl: '/images/products/product_5.png',
    updatedAt: moment().subtract(9, 'hours'),
  },
];
