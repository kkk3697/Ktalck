const express = require('express');
const router = express.Router();
const my_db = require('../config/config');
const escapeHtml = require('escape-html');

// 모듈 불러오기
const { getCountryCodes } = require('../module/countryCode');
const { getTimezones } = require('../module/timezone');
const { formatPhoneNumber } = require('../module/phoneNumber');

router.get('/countryCodes', (req, res) => {
    console.log("/api/countryCodes 엔드포인트 호출됨");
    const countryCodes = getCountryCodes();
    console.log("countryCodes:", countryCodes);
  res.json(countryCodes);
});

module.exports = router;
