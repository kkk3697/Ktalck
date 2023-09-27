const express = require('express');
const router = express.Router();

const { sequelize, User, Teacher } = require('../../models');

router.post('/TeacherCreate', async (req, res) => {
  const { email, memberName, phoneNumber, gender, address, detailAddress, registrationNumber, teachingLanguage, bankName, accountNumber } = req.body;
  
  const t = await sequelize.transaction();
  const [registrationNumberFront, registrationNumberBack] = registrationNumber.split('-');
  const combinedRegistrationNumber = `${registrationNumberFront}-${registrationNumberBack}`;
  const password = phoneNumber.slice(-4);

  try {
    console.log(req.body);
    const registrationNumber = `${registrationNumberFront}-${registrationNumberBack}`;
    const birthFromRegNum = registrationNumberFront; // 생년월일 추출
    console.log("registrationNumberFront:", registrationNumberFront);
    
    const newUser = await User.create({
      email,
      username: memberName,
      password,
      full_phone_number: phoneNumber,
      birth: birthFromRegNum,
      currentCity: '도시 정보 여기에',
      level: 2
    }, { transaction: t });
    console.log("Created User:", newUser.toJSON());
    if (newUser.level === 2) { 

      const combinedBankInfo = `${bankName} : ${accountNumber}`;

      await Teacher.create({
        email,
        gender,
        address,
        detailAddress,
        registrationNumber: combinedRegistrationNumber,
        teachingLanguage,
        bankName,
        accountNumber,
        bankNo: combinedBankInfo  
      }, { transaction: t });
    }

    await t.commit();
    res.status(201).json({
      message: '강사가 성공적으로 생성되었습니다.',
    });
  } catch (error) {
    await t.rollback();
    console.error(error);
    res.status(500).json({
      message: '강사 생성에 실패했습니다.'
    });
  }
});

module.exports = router;