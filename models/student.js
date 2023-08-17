const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Student name is required']
    },
    gender: {
        type: String,
        required: [true, 'Student gender is required']
    },
    nationality: {
        type: String,
        required: [true, 'Student nationality is required']
    },
    cid: {
        type: String,
        required: [true, 'Student cid is required'],
        unique: [true, 'Student cid must be unique']
    },
    kinder: {
        type: String,
        required: [true, 'Student kinder name is required']
    },
    time: {
        type: String,
        required: [true, 'Time is required']
    },
    fathername: {
        type: String,
        required: [true, 'Student father name is required']
    },
    fatherno: {
        type: String,
        required: [true, 'Student father phone number is required']
    },
    motherno: {
        type: String,
        required: [true, 'Student mother phone number is required']
    },
    address: {
        type: String,
        required: [true, 'Student address is required']
    },
    bus: {
        type: String,
        required: [true, 'Bus is required']
    },
    password: String,
    activated: {
        type: Boolean,
        default: false
    }

})
module.exports = mongoose.model('Student', studentSchema);