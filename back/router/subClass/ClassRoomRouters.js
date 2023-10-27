// routes/classRoom.js
const express = require('express');
const router = express.Router();
const { ClassRoom } = require('../../models');

// 클래스 생성
router.post('/ClassCreate', async (req, res) => {
  try {
    const { className, classLevel, BoardId, classCategory, startDate, endDate, classTime, zoomURL, zoomID, zoomPassword, weeklyFrequency, scheduleDays } = req.body;

    // 필수 정보 체크
    if (!className || !startDate || !endDate || !classTime) {
      return res.status(400).json({ message: '필수 정보가 누락되었습니다.' });
    }

    // DB에 데이터 저장
    const newClass = await ClassRoom.create({
      className,
      classLevel,
      BoardId,
      classCategory,
      startDate,
      endDate,
      classTime,
      zoomURL,
      zoomID,
      zoomPassword,
      weeklyFrequency,
      scheduleDays
    });

    res.status(201).json(newClass);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '서버 오류' });
  }
});

// 클래스 전체 목록 가져오기
router.get('/ClassLoad', async (req, res) => {
    try {
      const classList = await ClassRoom.findAll();
      res.json(classList);
      console("넘어왔나?");
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: '서버 오류' });
    }
  });
  
  // 특정 클래스 정보 가져오기
  router.get('/:id', async (req, res) => {
    try {
      const classInfo = await ClassRoom.findByPk(req.params.id);
      if (!classInfo) {
        return res.status(404).json({ message: '클래스 정보가 없습니다.' });
      }
      res.json(classInfo);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: '서버 오류' });
    }
  });
  

module.exports = router;
