const express = require('express');
const routes = express.Router();
const studentController = require('../controllers/student');
const studentMiddleware = require('../middlewares/studentAuth');

routes.post('/register', studentController.regNewStudent);
routes.post('/login', studentController.loginStudent);
routes.get('/student-profile', studentMiddleware.isStudent, studentController.getStudentProfile);


module.exports = routes;