import React, { useState ,useEffect   } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../../style/ClassRoom.css';
import ClassCreatorModal from './modal/ClassCreatorModal';
import DetailModal  from './modal/DetailModal';
import EditModal  from './modal/EditModal';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ClassManagement = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [teachers, setTeachers] = useState([]);  
  const [teacher, setTeacher] = useState(1);
  const [classes, setClasses] = useState();
  const [classesData, setClassesData] = useState({ classes: [], totalPages: 0 });
  const [classStatus,setClassStatus] = useState('all');
  const [teacherClasses, setTeacherClasses] = useState([]);
  const [classTypes ,setClassTypes] = useState([]);
  const [expanded, setExpanded] = useState({}); // 각 셀의 확장 상태 관리
  const [viewMode, setViewMode] = useState('table'); // 'table' 또는 'box'
  const [selectedClass, setSelectedClass] = useState(null);
  
  //모달 관리
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const toggleModal = () => {
    setShowCreateModal(!showCreateModal);
  };

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/ClassLoad`);
        setClassesData(response.data); // setClassRoom에서 setClassesData로 변경
      } catch (error) {
        console.error('클래스 정보 로딩에 실패했습니다.', error);
      }
    };
  
    fetchTeachers();
  }, []);
  
  
  function formatClassLevel(level) {
    const parts = level.split("-");
    if (parts.length === 3) {
      return `${parts[0]}권 ${parts[1]}단원 ${parts[2]}페이지`;
    }
    return level; // 형식이 맞지 않는 경우 원본 데이터 반환
  }
  
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR').split('.').slice(0, 3).join('-').trim(); // 'YYYY-MM-DD' 형식으로 변환
  }

  // 강사 클래스 정보 불러오기 (모달이 열릴 때만 호출)
  // useEffect(() => {
  //   const fetchTeacherClasses = async () => {
  //     try {
  //       const response = await axios.get(`${API_BASE_URL}/teacherClassLoad`);
  //       setTeacherClasses(response.data);
  //     } catch (error) {
  //       console.error('teacherClass 정보 로딩에 실패했습니다.', error);
  //     }
  //   };

  //   if (showModal) {
  //     fetchTeacherClasses();
  //   }
  // }, [showModal]);
  const toggleExpand = (index) => {
    setExpanded(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  // '자세히보기' 버튼 클릭 핸들러
const handleShowDetails = (classData) => {
  setSelectedClass(classData);
  setShowDetailModal(true);
};

// '수정' 버튼 클릭 핸들러
const handleShowEdit = (classData) => {
  setSelectedClass(classData);
  setShowEditModal(true);
};

  const filteredClasses = classStatus === 'all' 
  ? classesData.classes 
  : classesData.classes.filter(cls => cls.status === classStatus);


  return (
    <div className="container">
      <h1 className="mt-3 mb-3">클래스 관리</h1>
      <div className="mb-3 d-flex justify-content-between">
        <div>
          <button className={`btn ${classStatus === 'all' ? "btn-primary" : "btn-secondary"}`} style={{ marginRight: '10px' }} onClick={() => setClassStatus('all')}>전체 클래스</button>
          <button className={`btn ${classStatus === 'active' ? "btn-primary" : "btn-secondary"}`} style={{ marginRight: '10px' }} onClick={() => setClassStatus('active')}>활동 클래스</button>
          <button className={`btn ${classStatus === 'ended' ? "btn-primary" : "btn-secondary"}`} style={{ marginRight: '10px' }} onClick={() => setClassStatus('ended')}>종료 클래스</button>
        </div>
        <div>
        <button className="btn btn-secondary" onClick={toggleModal}>클래스 생성</button>
          <ClassCreatorModal showModal={showCreateModal} toggleModal={toggleModal} />
        </div>
      </div>
      <button style={{ marginRight: '10px' }} className="btn btn-secondary" onClick={() => handleViewModeChange('table')}>테이블 형태</button>
<button className="btn btn-secondary" onClick={() => handleViewModeChange('box')}>상자 형태</button>
      {viewMode === 'table' ? (
        // 테이블 뷰
        <table className="table table-striped">
          <thead>
          <tr>
            <th>클래스 이름</th>
            <th>레벨</th>
            <th>카테고리</th>
            <th>수업 시간</th>
            <th>시작 날짜</th>
            <th>Zoom URL</th>
            <th>선생님</th>
            <th>수업 요일</th>
          </tr>
        </thead>
        <tbody>
            {filteredClasses.map((classData, index) => (

              <tr key={index} onClick={() => toggleExpand(index)}>
                <td style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '150px' }}>
                  {classData.className}
                </td>
                <td style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '150px' }}>
                  {classData.classLevel}
                </td>
                <td style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '150px' }}>
                  {classData.classCategory}
                </td>
                <td style={expanded[index] ? {} : { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '150px' }}>
                  {classData.classTime}
                </td>
                <td>{formatDate(classData.startDate)}</td>
               
                <td>{classData.zoomURLs.length > 0 ? classData.zoomURLs[0] : '줌 링크 없음'}</td>
                <td>{classData.teacherNames.length > 0 ? classData.teacherNames[0] : '선생님 정보 없음'}</td>
                <td>{classData.scheduleDays}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
<div className="box-view">
  {filteredClasses.map((classData, index) => (
    <div key={index} className="class-box">
      <div className="class-content">
        <div className="left-content">
          <div className="schedule-days">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar2-date" viewBox="0 0 16 16">
              <path d="M6.445 12.688V7.354h-.633A12.6 12.6 0 0 0 4.5 8.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23z"/>
              <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z"/>
              <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z"/>
            </svg>
            
            {classData.scheduleDays ? JSON.parse(classData.scheduleDays).join(" ") : ''}
          </div>
          <p className="time">{classData.classTime}</p>
          <div className="name-teacher">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-card-list" viewBox="0 0 16 16">
            <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
            <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
          </svg>
            <span>{classData.teacherNames.length > 0 ? classData.teacherNames[0] : '선생님 정보 없음'}/{classData.className}</span>
          </div>
          <hr/>
          <p className="student-list">학생 명단: [학생 명단]</p>
      
          <div className="class-actions" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <button 
              style={{ whiteSpace: 'nowrap', margin: '10px 10px 10px 40px', backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px' }} 
              className="btn btn-secondary" 
              onClick={() => handleShowDetails(classData)}>
              자세히 보기
            </button>
            <button 
              style={{ whiteSpace: 'nowrap', margin: '10px', backgroundColor: '#008CBA', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px' }} 
              className="btn btn-secondary" 
              onClick={() => handleShowEdit(classData)}>
              수정
            </button>
          </div>
        </div>
        <div className="right-content">
          <p className="level">{formatClassLevel(classData.classLevel)}</p>
          <p className="start-date">수업 시작일 :{formatDate(classData.startDate)}</p>
        </div>
      </div>
    </div>
  ))}
</div>

          
      )}
      <button className="btn btn-info">더 보기</button>


   
    <DetailModal showModal={showDetailModal} toggleModal={() => setShowDetailModal(false)} classData={selectedClass} />
    <EditModal showModal={showEditModal} toggleModal={() => setShowEditModal(false)} classData={selectedClass} />

    </div>
  );
  };

export default ClassManagement;
