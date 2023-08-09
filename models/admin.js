const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minLength: 3
    }
    // ,
    // role: {
    //     type: String,
    //     enum: ["user", "admin"],
    //     default: "admin"
    // }
}, {
    timestamps: true
})

const adminModel = mongoose.model('Admin', adminSchema)
module.exports = adminModel