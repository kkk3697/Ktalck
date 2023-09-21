const express = require('express');
const router = express.Router();

// Nested Routes for student
router.get('/', (req, res) => {
  res.send('Student Home');
});

router.get('/courses', (req, res) => {
  res.send('Student Courses');
});

module.exports = router;
