const express = require('express');
const routes = express.Router();
const studentController = require('../controllers/student');
const adminControllers = require('../controllers/admin');
const adminMiddelwares = require('../middlewares/admin');
routes.post("/login", adminControllers.logIn);
routes.get("/logout", adminMiddelwares.isAdmin, adminControllers.logOut);
routes.get('/students/:studentsNumber', adminMiddelwares.isAdmin, studentController.getStudents);


module.exports = routes;