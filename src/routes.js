const {
  addBooksHandler,
  getAllBookshandler,
  getBooksByIdHandler,
  editBookHandler,
  deleteBookHandler,
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

  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBookHandler,
  },

];

module.exports = routes;
