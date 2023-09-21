const express = require('express');
const router = express.Router();

// Nested Routes for teacher
router.get('/', (req, res) => {
  res.send('Teacher Home');
});

router.get('/classes', (req, res) => {
  res.send('Teacher Classes');
});

module.exports = router;
