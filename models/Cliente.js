const mongoose = require('mongoose')

const Cliente = mongoose.model('Cliente', {
    name: String,
    cpf: Number,
    email: String,
    phoneNumber: String,
    processNumber: String,
    accessKey: Number,
    description: String,

})
module.exports = Cliente;