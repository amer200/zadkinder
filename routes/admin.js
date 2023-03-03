const express = require('express');
const routes = express.Router();
const studentController = require('../controllers/student');


routes.get('/students/:studentsNumber', studentController.getStudents);


module.exports = routes;