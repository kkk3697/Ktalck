const express = require('express');
const router = express.Router();
const my_db = require('../config/config');
const escapeHtml = require('escape-html');
const { User, Student, Teacher } = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;


// 모듈 불러오기
const { getCountryCodes } = require('../module/countryCode');
const { getTimezones } = require('../module/timezone');

router.get('/countryCodes', (req, res) => {
  const countryCodes = getCountryCodes();
  
res.json(countryCodes);
});

router.get('/timezones', (req, res) => {
  const timezones = getTimezones();
  res.json(timezones);
});
const createUserAndEntity = async (userData) => {
  let user;
  try {
    // User 생성
    user = await User.create(userData);

    // User 레벨 확인
    if (user.level === 'student') {
      // Student 정보 생성
      await Student.create({ /* 여기서는 user.id와 다른 정보를 사용해서 Student를 생성 */ });
    } else if (user.level === 'teacher') {
      // Teacher 정보 생성
      await Teacher.create({ /* 여기서는 user.id와 다른 정보를 사용해서 Teacher를 생성 */ });
    }
  } catch (error) {
    console.error('데이터베이스 저장 중 오류:', error);
    throw error;
  }
  return user;
};

router.post('/signup', async (req, res) => {
  try {
    const userbodyData = req.body;
    console.log(req.body);
    // 데이터 유효성 체크
    if (!userbodyData.phone_number || !userbodyData.email || !userbodyData.birthYear || !userbodyData.birthMonth || !userbodyData.birthDay) {
      throw new Error("필수 데이터가 누락되었습니다.");
    }
    
    
    const firstName = userbodyData.firstName;
    const lastName = userbodyData.lastName;
    const username = `${firstName} ${lastName}`;
    const password = userbodyData.phone_number.slice(-4);
    const full_phone_number = `${userbodyData.country_code}-${userbodyData.phone_number}`; 

    const birthYear = userbodyData.birthYear;
    const birthMonth = userbodyData.birthMonth;
    const birthDay = userbodyData.birthDay;
    const birth = `${birthYear}-${birthMonth}-${birthDay}`;

    const selectedTimezones = userbodyData.timezones || [];
    const timezoneString = selectedTimezones.join(',');  // 배열을 콤마로 구분된 문자열로 변환

    const countryValue = userbodyData.country.value;
    
    const userData = {
      email: userbodyData.email,
      password: bcrypt.hashSync(password, saltRounds),
      username: username,
      birth: birth,
      language: userbodyData.language,
      full_phone_number: full_phone_number,
      currentCity: userbodyData.currentCity,
      timezone: timezoneString,
      Nationality: userbodyData.nationality,
      country: countryValue,
      level : userbodyData.level,
    };
    // 이메일 중복 체크
    const existingUser = await User.findOne({ where: { email: userbodyData.email } });

    if (existingUser) {
      console.log("email 중복!!!!");
      return res.status(409).json({ message: 'Email already exists' });
    }
   
    await createUserAndEntity(userData);
    res.json({ message: 'Your application is complete.', redirect: '/' });
    

  } catch (error) {
    console.error('데이터베이스 저장 중 오류:', error);
    res.status(500).send('<script>alert("error"); window.location="/signup";</script>');
  }
});



module.exports = router;