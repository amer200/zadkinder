const express = require('express');
const routes = express.Router();
const studentController = require('../controllers/student');
const adminControllers = require('../controllers/admin');
const adminMiddleware = require('../middlewares/admin');

routes.post("/login", adminControllers.logIn);
routes.post("/change-password", adminMiddleware.isAdmin, adminControllers.changePassword);
routes.get("/logout", adminMiddleware.isAdmin, adminControllers.logOut);
routes.get('/students/:studentsNumber', adminMiddleware.isAdmin, studentController.getStudents);
routes.get('/remove-student/:id', adminMiddleware.isAdmin, studentController.removeStudent);
routes.post('/edit-student/:id', adminMiddleware.isAdmin, studentController.editStudent);

module.exports = routes;