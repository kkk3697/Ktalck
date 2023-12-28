const express = require('express');
const cors = require('cors');
const app = express();
const session = require('express-session');
const loginRouter = require('./router/loginRouter.js');
const signupRouter = require('./router/signupRouter.js');
const path = require('path');
const studentRouter = require('./router/mypage/StudentRouter.js');
const teacherRouter = require('./router/mypage/TeacherRouter.js');
const adminRouter = require('./router/mypage/AdminsRouter.js');
const studentClassRouter = require('./router/subClass/StudentClassRouter.js');
const classroomRouter = require('./router/subClass/ClassRoomRouters.js');

// 기본 미들웨어 설정
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// 세션 미들웨어 설정 (라우터 설정 이전에)
app.use(session({
  secret: '비밀 키',  // 세션을 암호화하기 위한 키 값
  resave: false,  // 세션을 항상 저장할 지 여부를 설정
  saveUninitialized: true,  // 초기화되지 않은 세션도 저장할지 설정
  // 다른 설정들도 가능
}));

// 라우터 설정
app.use('/api', signupRouter);
app.use('/api', loginRouter);
app.use('/api', studentRouter );
app.use('/api', teacherRouter );
app.use('/api', adminRouter );
app.use('/api',studentClassRouter);
app.use('/api',classroomRouter);


// React 앱 정적 파일 제공
app.use(express.static(path.join(__dirname, 'build')));

// 모든 요청을 index.html로 리디렉트 (SPA 라우팅 지원)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(4020, () => {
  console.log('Server running on http://localhost:4020');
});
