const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    name: String,
    gender: String,
    nationality: String,
    cid: String,
    kinder: String,
    time: String,
    fathername: String,
    fatherno: String,
    motherno: String,
    address: String,
    bus: String
})
module.exports = mongoose.model('Student', studentSchema);