import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/header.css';
import { Link } from 'react-router-dom';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userLevel, setUserLevel] = useState(null);
  const [username, setUsername] = useState('');
  
  const handleLogout = async () => {
    try {
      const response = await axios.get('http://localhost:4020/api/logout');
      if (response.data.success) {
        setIsLoggedIn(false);
        setUsername('');
        setUserLevel(null);
        window.location.href = "/"; // 로그아웃 성공 후 메인 페이지로 이동
      }
    } catch (error) {
      alert('로그아웃 중 에러 발생');
    }
  };
  
  const handleLogin = async () => {
    const email = document.querySelector('input[type="text"]').value;
    const password = document.querySelector('input[type="password"]').value;
    

    try {
      const response = await axios.post('http://localhost:4020/api/login', {
        email,
        password
      });
    
      if (response.data.success) {
        setIsLoggedIn(true);
        setUsername(response.data.username);
        setUserLevel(response.data.userLevel);
      } else {
        alert(response.data.message); // 서버에서 받은 메시지 사용
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message); // 서버에서 보낸 에러 메시지 사용
      } else {
        alert('에러 발생');
      }
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">로고</Link>
      </div>
      <div className="title">
        <Link to="/">STUDENTS'REVIEW</Link>
      </div>
      <div className="WHAT IS-KTAL LIVE">
        <Link to="/">WHAT IS-KTAL LIVE?</Link>
      </div>
      <div className="nav-links">
        <Link to="/">TUTORS</Link>
      </div>
      <div className="login">
      {isLoggedIn ? (
        <>
          <span>{username}님</span>
          <Link to={userLevel === 3 ? '/admin' : userLevel === 2 ? '/teacher' : '/student'}>
            <button className="button">마이페이지</button>
          </Link>
          <button className="button" onClick={handleLogout}>로그아웃</button>
        </>
      ) : (
          <>
            <input type="text" placeholder="아이디" />
            <input type="password" placeholder="비밀번호" />
            <button className="button" onClick={handleLogin}>로그인</button>
            <Link to="/signup">
              <button className="button">회원가입</button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
  }

export default Header;