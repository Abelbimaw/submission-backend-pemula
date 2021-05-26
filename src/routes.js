const {
  addBooksHandler,
  getAllBookshandler,
  getBooksByIdHandler,
  editBookHandler,
} = require('./handler');

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

  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBooksByIdHandler,
  },

  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: editBookHandler,
  },

];

module.exports = routes;
