const { nanoid } = require('nanoid');
const books = require('./books');

const addBooksHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  // Check whether name is null
  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    })
      .code(400);
    return response;
  }

  // Check readPage > readCount
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    })
      .code(400);
    return response;
  }

  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished,
    insertedAt,
    updatedAt,
  };
  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  // Success add Book
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getAllBookshandler = (request, h) => {
  // request data with query ouput
  const { name, reading, finished } = request.query;

  // Check book contain same name
  if (name !== undefined) {
    const bookfromat = books
      .filter((b) => b.name.toLowerCase().includes(name.toLowerCase()));
    return h.response({
      status: 'success',
      data: {
        books: bookfromat.map((b) => ({
          id: b.id,
          name: b.name,
          publisher: b.publisher,
        })),
      },
    });
  }

  // Check list book that have been read
  if (reading !== undefined) {
    const bookRead = books
      .filter((b) => b.reading === (reading === '1')).map((b) => ({
        id: b.id,
        name: b.name,
        publisher: b.publisher,
      }));

    const response = h.response({
      status: 'success',
      data: {
        books: bookRead,
      },
    });
    response.code(200);
    return response;
  }

  // Check book have been finished read
  if (finished !== undefined) {
    const bookFinish = books
      .filter((book) => book.finished === (finished === '1')).map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      }));

    const response = h.response({
      status: 'success',
      data: {
        books: bookFinish,
      },
    })
      .code(200);
    return response;
  }

  // Check whether name, reading and finished null
  if (!name && !reading && !finished) {
    return h.response({
      status: 'success',
      data: {
        books: books.map((b) => ({
          id: b.id,
          name: b.name,
          publisher: b.publisher,
        })),
      },
    })
      .code(200);
  }

  if (books !== undefined) {
    const response = h.response({
      status: 'success',
      data: {
        books: [],
      },
    }).code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal menampilkan buku',
  }).code(404);
  return response;
};

const getBooksByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const book = books.filter((b) => b.id === bookId)[0];

  // Check whether is bookId or not
  if (book) {
    const response = h.response({
      status: 'success',
      data: {
        book,
      },
    })
      .code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  })
    .code(404);
  return response;
};

const editBookHandler = (request, h) => {
  const { bookId } = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  // Check whether is name or null
  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    })
      .code(400);
    return response;
  }

  // Check readPage > readCount
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    })
      .code(400);
    return response;
  }

  const updatedAt = new Date().toISOString();
  const finished = pageCount === readPage;
  const index = books.findIndex((b) => b.id === bookId);

  // Check was index is -1 or the is true index BookId
  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      finished,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    })
      .code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  })
    .code(404);
  return response;
};

const deleteBookHandler = (request, h) => {
  const { bookId } = request.params;
  const index = books.findIndex((b) => b.id === bookId);

  // Check was index is -1 or the is true index BookId
  if (index !== -1) {
    books.splice(books, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    })
      .code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  })
    .code(404);
  return response;
};

module.exports = {
  addBooksHandler,
  getAllBookshandler,
  getBooksByIdHandler,
  editBookHandler,
  deleteBookHandler,
};
