import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/header.css';
import { Link, useLocation } from 'react-router-dom';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userLevel, setUserLevel] = useState(null);
  const [username, setUsername] = useState('');
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/checkLogin`);
        if (response.data.isLoggedIn) {
          setIsLoggedIn(true);
          setUsername(response.data.username);
          setUserLevel(response.data.userLevel);
        } else {
          setIsLoggedIn(false);
          setUsername('');
          setUserLevel(null);
          if (currentPath !== '/') {
            window.location.href = "/";
          }
        }
      } catch (error) {
        alert('로그인 상태 체크 중 에러 발생');
      }
    };
  
    checkLoginStatus();
  }, []);
  
  
  const handleLogout = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/logout`);
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
      const response = await axios.post(`${API_BASE_URL}/login`, {
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
        alert('로그인 에러 발생');
      }
    }
  };

    return (
      <header className="header">
        <div className="logo">
          <Link to="/">로고</Link>
        </div>
  
        {currentPath === '/' ? (
          <>
            <div className="title">
              <Link to="/">STUDENTS'REVIEW</Link>
            </div>
            <div className="WHAT IS-KTAL LIVE">
              <Link to="/">WHAT IS-KTAL LIVE?</Link>
            </div>
            <div className="nav-links">
              <Link to="/">TUTORS</Link>
            </div>
          </>
        ) : (
          <>
            {userLevel === 3 && (
              <div className="admin-menu">
                <Link to="/admin/class-management">클래스관리</Link>
                <Link to="/admin/student-management">학생관리</Link>
                <Link to="/admin/payment-management">결제관리</Link>
                <Link to="/admin/teacher-management">강사관리</Link>
                <Link to="/admin/board-management">게시판 관리</Link>
                <Link to="/admin/book-management">교재 관리</Link>
                <Link to="/admin/review-management">리뷰 관리</Link>
                <Link to="/admin/teacher-introduction">선생님 소개 관리</Link>
              </div>
            )}
            {userLevel === 2 && (
              <div className="teacher-menu">
                <Link to="/teacher/teacher-main">강사메인</Link>
                <Link to="/teacher/lecture-fee">강의료산정</Link>
                <Link to="/teacher/availability">수업가능시간</Link>
                <Link to="/teacher/book-management">교재관리</Link>
                <Link to="/teacher/resource-room">자료실</Link>
              </div>
            )}
            <div className="title invisible">
              {/* 이 부분은 보이지 않지만 공간은 차지 */}
            </div>
            {/* ... */}
          </>
        )}
  
        <div className="login button-container">
          {isLoggedIn ? (
            <>
              <span>{username}님</span>
              {['/student', '/admin', '/teacher'].includes(currentPath) ? (
                <>
                  <button className="button">마이페이지</button>
                  <button className="button" onClick={handleLogout}>로그아웃</button>
                </>
              ) : (
                <>
                  <Link to={userLevel === 3 ? '/admin' : userLevel === 2 ? '/teacher' : '/student'}>
                    <button className="button">마이페이지</button>
                  </Link>
                  <button className="button" onClick={handleLogout}>로그아웃</button>
                </>
              )}
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
  };
  
  export default Header;