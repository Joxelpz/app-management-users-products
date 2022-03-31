const mongoose = require('mongoose');

const productSquema = mongoose.Schema({
    identificator: {
        unique: true,
        type: Number,
        required: true
        
    },
    namep: {
        type: String,
        required: true
    },
    category: {
        type: String,
        values: ['Tecnologia', 'Cocina', 'Muebles'],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('product', productSquema);