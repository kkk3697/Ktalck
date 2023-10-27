const express = require('express');
const router = express.Router();

const { sequelize, User, Teacher ,TeacherClass } = require('../../models');


router.post('/TeacherCreate', async (req, res) => {
  const { email, memberName, phoneNumber, gender, address, detailAddress, registrationNumber, teachingLanguage, bankName, accountNumber, zoomMeetingLink } = req.body;

  
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

      const newTeacher = await Teacher.create({
        email,
        gender,
        address,
        detailAddress,
        privatenumber: combinedRegistrationNumber,
        teaLanguage: teachingLanguage,
        bankNo: combinedBankInfo  ,
        
      }, { transaction: t });

      await TeacherClass.create({
        teacherId: newTeacher.tno, 
        zoomMeetingLink,
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

router.get('/teacherLoad', async (req, res) => {
  try {
    const teachers = await Teacher.findAll({
      attributes: ['tno','email', 'zoomMeetingLink'],  // 이메일과 줌 미팅 링크를 저장하는 필드
      include: [{
        model: User,
        attributes: ['username'],
        where: { level: 2 }
      }]
    });

    const teacherData = teachers.map(teacher => ({
      tno: teacher.tno,
      username: teacher.User.username, // 유저 이름
      zoomMeetingLink: teacher.zoomMeetingLink // 줌 미팅 링크
    }));

    res.status(200).json(teacherData);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: '강사 데이터를 불러오는 데 실패했습니다.'
    });
  }
});

router.get('/getZoomMeetingLink/:tno', async (req, res) => {
  const { tno } = req.params;

  try {
    const teacher = await Teacher.findOne({ where: { tno } });
    if (!teacher) {
      return res.status(404).json({ message: '강사를 찾을 수 없습니다.' });
    }

    res.status(200).json({ zoomMeetingLink: teacher.zoomMeetingLink });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Zoom 미팅 링크를 가져오는 데 실패했습니다.' });
  }
});


module.exports = router;