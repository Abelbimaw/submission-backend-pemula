const { addBooksHandler, getAllBookshandler } = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBooksHandler,
  },

  {
    method: 'GET',
    path: '/books',
    handler: getAllBookshandler,
  },
];

module.exports = routes;
