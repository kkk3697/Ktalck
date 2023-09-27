const express = require('express');
const router = express.Router();


const { Sequelize, User, Student } = require('.././../models');

// Nested Routes for student
router.get('/', (req, res) => {
  res.send('Student Home');
});

router.get('/courses', (req, res) => {
  res.send('Student Courses');
});

module.exports = router;
