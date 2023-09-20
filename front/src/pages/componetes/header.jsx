import React, { useState } from 'react';
import axios from 'axios';
import '../style/header.css';
import { Link } from 'react-router-dom';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태를 저장

  async function handleLogin() {
    const id = document.querySelector('input[type="text"]').value;
    const password = document.querySelector('input[type="password"]').value;

    try {
      const response = await axios.post('http://localhost:4020/api/login', {
        id,
        password
      });

      if (response.data.success) {
        setIsLoggedIn(true); // 로그인 성공하면 상태 변경
        // 여기서 추가적으로 JWT 토큰을 저장하는 로직 등을 넣을 수 있어
      } else {
        alert('로그인 실패'); // 로그인 실패하면 경고 메시지
      }
    } catch (error) {
      alert('에러 발생'); // 에러 처리
    }
  }

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
          <Link to="/mypage">
            <button className="button">마이페이지</button>
          </Link>
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
