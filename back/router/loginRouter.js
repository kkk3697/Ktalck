const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User/User'); 
const findUserByIdAndPassword = require('../module/your-db-functions').findUserByIdAndPassword; 

router.get('/check-session', (req, res) => {
    if (req.session && req.session.userId) {
      return res.json({
        isLoggedIn: true,
        username: req.session.username,
        userLevel: req.session.level,
      });
    } else {
      return res.json({
        isLoggedIn: false,
      });
    }
  });
  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('req.body:', req.body);
  
    // 데이터베이스에서 email에 해당하는 사용자 정보 가져오기
    const user = await User.findOne({ where: { email: email } });
  
    if (user) {
      const storedHash = user.password; // 데이터베이스에서 가져온 해시
      if (bcrypt.compareSync(password, storedHash)) {
        // 로그인 성공
        req.session.userId = user.email;
        req.session.username = user.username;
        req.session.level = user.level;
  
        return res.json({ success: true, message: '로그인 성공', username: user.username, userLevel: user.level });
      } else {
        // 로그인 실패: 비밀번호 불일치
        return res.status(401).json({ success: false, message: '아이디 또는 비밀번호가 틀렸습니다' });
      }
    } else {
      // 로그인 실패: 아이디 불일치
      return res.status(401).json({ success: false, message: '아이디 또는 비밀번호가 틀렸습니다' });
    }
  });
  
  router.get('/logout', (req, res) => {
    req.session.destroy(err => {
      if (err) {
        return res.status(500).json({ success: false, message: '로그아웃 실패' });
      }
      res.clearCookie('connect.sid');  // 세션 쿠키 삭제
      return res.json({ success: true, message: '로그아웃 성공' });
    });
  });
  router.get('/checkLogin', (req, res) => {
    if (req.session.user) {
      return res.json({ isLoggedIn: true, username: req.session.user.username, userLevel: req.session.user.userLevel });
    } else {
      return res.json({ isLoggedIn: false });
    }
  });

module.exports = router;
