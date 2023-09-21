const express = require('express');
const router = express.Router();

// Nested Routes for admin
router.get('/', (req, res) => {
  res.send('Admin Home');
});

router.get('/users', (req, res) => {
  res.send('Admin Users');
});

router.get('/settings', (req, res) => {
  res.send('Admin Settings');
});

module.exports = router;
