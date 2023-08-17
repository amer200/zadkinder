const express = require('express');
const routes = express.Router();
const adminControllers = require('../controllers/admin');
const studentController = require('../controllers/student');
const adminMiddleware = require('../middlewares/admin');

routes.post("/login", adminControllers.logIn);
routes.post("/change-password", adminMiddleware.isAdmin, adminControllers.changePassword);
routes.get("/logout", adminMiddleware.isAdmin, adminControllers.logOut);

routes.put('/students/:id', adminMiddleware.isAdmin, studentController.setStudentPassword);

routes.get('/students', adminMiddleware.isAdmin, studentController.getStudents);
routes.get('/students/:id', adminMiddleware.isAdmin, studentController.getStudentById);
routes.get('/remove-student/:id', adminMiddleware.isAdmin, studentController.removeStudent);
routes.post('/edit-student/:id', adminMiddleware.isAdmin, studentController.editStudent);


module.exports = routes;