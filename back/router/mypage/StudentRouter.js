const express = require('express');
const router = express.Router();

const { Sequelize, User, Student,StudentClass } = require('.././../models');

// Nested Routes for student
router.get('/', (req, res) => {
  res.send('Student Home');
});
router.get('/StuLoad', async (req, res) => {
  try {
    const students = await Student.findAll({
      attributes: ['stuNo','createdAt', 'Nickname', 'StudentState'],  // Student 테이블에서 필요한 컬럼
      include: [
        {
          model: User,
          attributes: ['email', 'username', 'birth', 'Nationality','full_phone_number','currentCity', 'level','language','timezone'],  // User 테이블에서 필요한 컬럼
        },
        {
          model: StudentClass,
          attributes: ['discountRate']  // StudentClass에서 할인율 정보 추가
        }
      ]
    });
    res.json(students);
    console.log(students);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;
