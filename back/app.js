const express = require('express');
const cors = require('cors');
const app = express();
const session = require('express-session');
const loginRouter = require('./router/loginRouter.js');
const signupRouter = require('./router/signupRouter.js');

const studentRouter = require('./router/mypage/StudentRouter');
const teacherRouter = require('./router/mypage/TeacherRouter');
const adminRouter = require('./router/mypage/AdminsRouter.js');

// 기본 미들웨어 설정
app.use(cors());
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

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/test', (req, res) => {
  res.json({ message: "성공적으로 연결됨!" });
});

app.listen(4020, () => {
  console.log('Server running on http://localhost:4020');
});
