import React, { useState ,useEffect   } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClassCreatorModal from './modal/ClassCreatorModal';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ClassManagement = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [teachers, setTeachers] = useState([]);  
  const [teacher, setTeacher] = useState(1);
  const [classes, setClasses] = useState();
  const [classesData, setClassesData] = useState({ classes: [], totalPages: 0 });
  const [classStatus,setClassStatus] = useState('all');
  const [teacherClasses, setTeacherClasses] = useState([]);
  const [classTypes ,setClassTypes] = useState([]);

 
  const toggleModal = () => {
    setShowModal(!showModal);
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
          <ClassCreatorModal showModal={showModal} toggleModal={toggleModal} />
        </div>
      </div>
   
      <table className="table table-striped">
        <thead>
          <tr>
            <th>클래스 이름</th>
            <th>레벨</th>
            <th>카테고리</th>
            <th>수업 시간</th>
            <th>시작 날짜</th>
            <th>종료 날짜</th>
            <th>Zoom URL</th>
            <th>선생님</th>
            <th>수업 요일</th>
          </tr>
        </thead>
        <tbody>
        {filteredClasses.map((classData, index) => (
              <tr key={index}>
                <td>{classData.className}</td>
                <td>{classData.classLevel}</td>
                <td>{classData.classCategory}</td>
                <td>{classData.classTime}</td>
                <td>{classData.startDate}</td>
                <td>{classData.endDate}</td>
                <td>{classData.zoomURLs.length > 0 ? classData.zoomURLs[0] : '줌 링크 없음'}</td>
                <td>{classData.teacherNames.length > 0 ? classData.teacherNames[0] : '선생님 정보 없음'}</td>
                <td>{classData.scheduleDays}</td>
              </tr>
            ))}
          </tbody>
      </table>
      <button className="btn btn-info">더 보기</button>
    </div>
  );
  };

export default ClassManagement;
