import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Routes도 추가로 임포트
import Header from './pages/componetes/header';
import Footer from './pages/componetes/footer';
import MainPage from './pages/componetes/main';
import SignupForm from './pages/componetes/signup';
import AdminPage from './pages/componetes/mypage/Admin/Admin';
import StudentPage from './pages/componetes/mypage/Student/Student';
import TeacherPage from './pages/componetes/mypage/Teacher/Teacher';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/student" element={<StudentPage />} />
          <Route path="/teacher" element={<TeacherPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
