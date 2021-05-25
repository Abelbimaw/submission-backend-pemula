const { nanoid } = require('nanoid');
const books = require('./books');

const addBooksHandler = (request, h) => {

    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
  
   
  
    const id = nanoid(16);
  
    const insertedAt = new Date().toISOString();
  
    const updatedAt = insertedAt;
  
   
  
    const newBook = {
  
      id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt,
  
    };
  
   
  
    books.push(newBook);
  
   
  
    const isSuccess = books.filter((book) => book.id === id).length > 0;
  
   
  
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
  
    const nameSucces = books.filter((book) => book.name === name);
  
   
  
    if (nameSucces !== undefined) {
  
      return {
  
        status: 'success',
  
        data: {
  
          bookId: name,
  
        },
  
      };
  
    }
  
   
  
    const responseName = h.responseName({
  
      status: 'fail',
  
      message: "Gagal menambahkan buku. Mohon isi nama buku",
  
    });
  
    responseName.code(400);
  
    return responseName;
  
    const readPageSucces = books.filter((book) => book.readPage === readPage);
  
   
  
   if (readPageSucces < pageCount) {
  
      return {
  
        status: 'success',
  
        data: {
  
          bookId: readPage,
  
        },
  
      };
  
    }
  
   
  
    const responseReadPage = h.responseReadPage({
  
      status: 'fail',
  
      message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
  
    });
  
    responseReadPage.code(400);
  
    return responseReadPage;
  
  };

module.exports = { addBooksHandler };
