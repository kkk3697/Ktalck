import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/header.css';
import { Link, useLocation } from 'react-router-dom';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const levelToPath = {
  3: '/admin',
  2: '/teacher',
  1: '/student',  // 1이 일반 사용자라고 가정
};


function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userLevel, setUserLevel] = useState(null);
  const [username, setUsername] = useState('');
  const location = useLocation();
  const currentPath = location.pathname;

  // State를 추가해주자, 메뉴바가 열려있는지 여부를 확인하기 위해
const [menuOpen, setMenuOpen] = useState(false);


useEffect(() => {
  console.log("Menu is now: ", menuOpen);
}, [menuOpen]);
// 메뉴를 열고 닫는 함수
const toggleMenu = () => {

  console.log("Before toggle: ", menuOpen);
  setMenuOpen(!menuOpen);
  console.log("After toggle: ", menuOpen);
};

function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowWidth;
}


const windowWidth = useWindowWidth();

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
  const CommonMenu = () => (
    <>
      <div className="common-menu-item">
        <Link to="/">STUDENTS'REVIEW</Link>
      </div>
      <div className="common-menu-item">
        <Link to="/">WHAT IS-KTAL LIVE?</Link>
      </div>
      <div className="common-menu-item">
        <Link to="/">TUTORS</Link>
      </div>
    </>
  );
  const AdminMenu = () => (
    <div className={`admin-menu ${menuOpen ? 'show' : ''}`}>
       <Link to="/admin/class-management">클래스관리</Link>
        <Link to="/admin/student-management">학생관리</Link>
        <Link to="/admin/payment-management">결제관리</Link>
        <Link to="/admin/teacher-management">강사관리</Link>
        <Link to="/admin/board-management">게시판 관리</Link>
        <Link to="/admin/book-management">교재 관리</Link>
        <Link to="/admin/review-management">리뷰 관리</Link>
        <Link to="/admin/teacher-introduction">선생님 소개 관리</Link>
    </div>
  );
  
  const TeacherMenu = () => (
    <div className={`admin-menu ${menuOpen ? 'show' : ''}`}>
      <Link to="/teacher/teacher-main">강사메인</Link>
      <Link to="/teacher/lecture-fee">강의료산정</Link>
      <Link to="/teacher/availability">수업가능시간</Link>
      <Link to="/teacher/book-management">교재관리</Link>
      <Link to="/teacher/resource-room">자료실</Link>
    </div>
  );
  
  return (
    <header className="header">
      <div className="logo-menu-container">
        <div className="logo">
          <Link to="/">로고</Link>
        </div>
        {currentPath === '/' ? (
      <>
        <CommonMenu/>
      </>
    ) : null
  }
   </div>
   {(currentPath !== '/') ? (
  <>
    <button className="button toggle-button" onClick={toggleMenu}>=</button>
    <div className={`menu-content ${menuOpen || windowWidth > 768 ? 'menu-open' : ''}`}>
    </div>
  </>
) : null}
 <div className="login button-container">
          {isLoggedIn ? (
            <>
            
             {currentPath === '/' ? null : (
                <>
                   
                  {windowWidth > 768 && (
                    <>
                      {userLevel === 3 && <AdminMenu />}
                      {userLevel === 2 && <TeacherMenu />}
                    </>
                  )}
                </>
              )}
               {(windowWidth <= 768 && menuOpen) && (
            <>
              {userLevel === 3 && <AdminMenu />}
              {userLevel === 2 && <TeacherMenu />}
            </>
          )}
              <span>{username}님</span>
              <div className="menu-bar">
                <Link to={userLevel === 3 ? '/admin' : userLevel === 2 ? '/teacher' : '/student'}>
                  <button className="button menu-item">마이페이지</button>
                </Link>
                <button className="button menu-item" onClick={handleLogout}>로그아웃</button>
              </div>
            </>
          ) : (
           
          <div className="row">
          <div className="col-12 col-md-3">
            <div className="form-group">
              <input type="text" className="form-control" placeholder="아이디" />
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="form-group">
              <input type="password" className="form-control" placeholder="비밀번호" />
            </div>
          </div>
          <div className="col-6 col-md-2">
            <button className="btn btn-primary" onClick={handleLogin}>로그인</button>
          </div>
          <div className="col-6 col-md-2">
            <Link to="/signup">
              <button className="btn btn-secondary">회원가입</button>
            </Link>
          </div>
        </div>
          )}
        </div>
            </header>
            );
          };
          export default Header