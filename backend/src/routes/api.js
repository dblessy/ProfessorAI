const express = require('express');
const router = express.Router();
const professorCtrl = require('../controllers/professor');

// Define routes
router.get('/professor', professorCtrl.getAllProfessors);
router.get('/professor/profile/:professor_id', professorCtrl.getProfessorProfileDetails);
router.put('/professor/profile/update/:professor_id', professorCtrl.updateProfileInformation);
router.get('/professor/students/list/:course_id', professorCtrl.getEnrolledStudentDetails);

module.exports = (sequelize) => {
    // Pass Sequelize instance to controller
    professorCtrl.setSequelize(sequelize);

    return router;
};
