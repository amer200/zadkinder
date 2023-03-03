const express = require('express');
const routes = express.Router();
const studentController = require('../controllers/student');


routes.post('/student-reg', studentController.regNewStudent);


module.exports = routes;