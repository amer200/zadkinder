const express = require('express');
const routes = express.Router();
const studentController = require('../controllers/student');


routes.post('/register', studentController.regNewStudent);


module.exports = routes;