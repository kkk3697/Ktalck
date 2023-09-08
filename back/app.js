const express = require('express');
const cors = require('cors');
const app = express();
const signupRouter = require('./router/signupRouter.js');


// 기본 미들웨어 설정
app.use(cors());
app.use(express.json());
app.use('/api', signupRouter);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/test', (req, res) => {
  res.json({ message: "성공적으로 연결됨!" });
});

app.listen(4020, () => {
  console.log('Server running on http://localhost:4020');
});
