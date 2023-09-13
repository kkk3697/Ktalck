const express = require('express');
const router = express.Router();
const my_db = require('../config/config');
const escapeHtml = require('escape-html');
const { User } = require('../models'); 

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


const createUser = async (userData, timezoneString) => {
  try {
    await User.create({
      email: escapeHtml(userData.email),
      password: userData.password,
      username: userData.username,
      birth: userData.birth,
      full_phone_number: escapeHtml(userData.full_phone_number),
      currentCity: escapeHtml(userData.currentCity),
      timezone: userData.timezone,  
      Nationality: escapeHtml(userData.nationality),
      country: escapeHtml(userData.country),
      level: '1',
    });
  } catch (error) {
    console.error('데이터베이스 저장 중 오류:', error);
    throw error;
  }
};

router.post('/signup', async (req, res) => {
  try {
    const userbodyData = req.body;
    console.log(req.body);
    // 데이터 유효성 체크
    if (!userbodyData.phone_number || !userbodyData.email || !userbodyData.birthYear || !userbodyData.birthMonth || !userbodyData.birthDay) {
      throw new Error("필수 데이터가 누락되었습니다.");
    }

    
    const firstName = escapeHtml(userbodyData.firstName);
    const lastName = escapeHtml(userbodyData.lastName);
    const username = `${firstName} ${lastName}`;
    const password = escapeHtml(userbodyData.phone_number.slice(-4));
    const full_phone_number = `${userbodyData.country_code}-${userbodyData.phone_number}`; 

    const birthYear = escapeHtml(userbodyData.birthYear);
    const birthMonth = escapeHtml(userbodyData.birthMonth);
    const birthDay = escapeHtml(userbodyData.birthDay);
    const birth = `${birthYear}-${birthMonth}-${birthDay}`;

    const selectedTimezones = userbodyData.timezones || [];
    const timezoneString = selectedTimezones.join(',');  // 배열을 콤마로 구분된 문자열로 변환

    const countryValue = escapeHtml(userbodyData.country.value);
    console.log("이메일 값 확인:", escapeHtml(userbodyData.email));
    console.log('timezoneString 값 확인:', timezoneString);

  

    const userData = {
      email: escapeHtml(userbodyData.email),
      password: password,
      username: username,
      birth: birth,
      full_phone_number: full_phone_number,
      currentCity: escapeHtml(userbodyData.currentCity),
      timezone: timezoneString,
      nationality: escapeHtml(userbodyData.nationality),
      country: countryValue,
    };
    await createUser(userData, timezoneString); 
    res.send('<script>alert("Your application is complete."); window.location="/";</script>');

  } catch (error) {
    console.error('데이터베이스 저장 중 오류:', error);
    res.status(500).send('<script>alert("error"); window.location="/signup";</script>');
  }
});



module.exports = router;
