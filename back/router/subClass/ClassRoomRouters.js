// routes/classRoom.js
const express = require('express');
const router = express.Router();

const { ClassRoom,TeacherClass,Teacher,User} = require('../../models');

const { fetchData } = require('../../module/fetchData');
// 클래스 생성

router.post('/ClassCreates', async (req, res) => {
  console.log("클래스 생성 시작");
  try {
    const { className, unitLevel, gradeLevel, classLevel, classCategory, zoomURL, zoomPassword, weeklyFrequency, zoomMeetingID, teacher, textbook, selectedTimes, selectedDays } = req.body;

    // 필수 정보 체크
    if (!className || !selectedTimes) {
      return res.status(400).json({ message: '필수 정보가 누락되었습니다.' });
    }
    const combinedLevel = `${unitLevel}-${gradeLevel}-${classLevel}`;
    console.log(req.body);
    
    // 먼저 ClassRoom 테이블에 데이터를 생성
    const newClass = await ClassRoom.create({
      className,
      classLevel: combinedLevel,
      classCategory,
      classTime: selectedTimes.join(','), 
      zoomURL,
      zoomID : zoomMeetingID,
      zoomPassword,
      weeklyFrequency,
      scheduleDays: JSON.stringify(selectedDays), // 배열을 문자열로 변환하여 저장
      teacher,
      textbook,
      startDate: new Date(),
      endDate: new Date(),
    });

    console.log(newClass + " new Class 테스트");
    
    // TeacherClass에 업데이트
    await TeacherClass.update(
      { classno: newClass.classno },  // 업데이트할 내용
      { where: { teacherId: teacher } }     // 어떤 행을 업데이트할지 조건
    );

    res.status(201).json(newClass);
    console.log("클래스 생성 종료");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '서버 오류' });
    console.log("에러");
  }
});

/// 클래스 전체 목록 가져오기
router.get('/ClassLoad', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const offset = (page - 1) * limit;

  try {
    const { classes, totalPages } = await fetchData('class', { limit, offset });
    res.json({ classes, totalPages });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '서버 오류' });
  }
});

module.exports = router;