const express = require('express');
const router = express.Router();

const { Sequelize, User, Student,Teacher,StudentClass } = require('.././../models');

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
          attributes: ['discountRate', 'zoomMeetingData', 'timeDifference'],
          include: [
            {
              model: Teacher,
              include: [{
                model: User,
                attributes: ['username'] // Teacher의 User 모델에서 필요한 속성
              }]
            }
          ]
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
