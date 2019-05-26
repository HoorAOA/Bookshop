const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    imagePath: {
        type: String,
        required: true
    },
    Title: {
        type: String,
        required: true
    },
    Author: {
        type: String,
        required: true
    },
    Category: {
        type: String,
        required: true
    },
    Rating: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Price: {
        type: String,
        required: true
    },
    newPrice: {
        type: String,
        required: true
    }
});

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;