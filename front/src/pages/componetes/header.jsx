import React from 'react';
import '../style/header.css';
import { Link } from 'react-router-dom'; // Link 컴포넌트를 추가

function Header() {
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
        <input type="text" placeholder="아이디" />
        <input type="password" placeholder="비밀번호" />
        <button className="button">로그인</button>

        <Link to="/signup">
          <button className="button">회원가입</button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
