// UserController.js
const my_db = require('../config/my_db');
const escapeHtml = require('escape-html');

const createUser = async (userData) => {
  const sql = 'INSERT INTO users (email, password, username, birth, full_phone_number, city, timezone, Nationality, country, status, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [
    escapeHtml(userData.email),
    userData.password,
    userData.username,
    userData.birth,
    escapeHtml(userData.full_phone_number),
    escapeHtml(userData.currentCity),
    userData.timezoneString,
    escapeHtml(userData.Nationality),
    escapeHtml(userData.country),
    '미승인',
    '학생'
  ];
  await my_db.pool.query(sql, values);
};

module.exports = { createUser };
