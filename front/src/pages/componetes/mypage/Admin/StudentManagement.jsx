import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PendingModalBody from './modal/PendingModalBody';
import ZoomRegisteredModalBody from './modal/ZoomRegisteredModalBody';
import ZoomCompletedModalBody from './modal/ZoomCompletedModalBody';
import CurrentStudentBody from './modal/CurrentStudentBody';
import AbsenceStudentBody from './modal/AbsenceStudentBody';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const StudentManagement = () => {
  
  const [students, setStudents] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(0); // 추가된 상태변수
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [childData, setChildData] = useState(null);

  const [pendingData, setPendingData] = useState({
    timeDifference: 0,
    meetingDate: null,
    zoomMeetingTeacher: null,
    selectedZoomLink: null
  });

  const [modalData, setModalData] = useState({
    pending: null,
    zoomRegistered: null,
    zoomCompleted: null,
    currentStudent: null,
    absenceStudent: null
  });

  const handleSaveData = async (newData, type) => {
    // 먼저 로컬 상태 업데이트
    setModalData({
      ...modalData,
      [type]: newData
    });
  
    // 여기서 pendingData도 업데이트
    setPendingData({
      ...pendingData,
    });
  
    // 서버로 데이터 전송
    try {
      const response = await axios.post(`${API_BASE_URL}/saveModalData`, {
        stuNo: selectedStudent.stuNo,
        ...modalData,
        [type]: newData,
        pendingData // 이렇게 pendingData도 같이 보내
      });
      if (response.status === 200 || response.status === 204) {
        // 성공적으로 데이터가 저장됐을 때의 로직
        console.log("데이터 저장 성공:", response.data);
      }
    } catch (error) {
      // 에러 발생 시 처리
      console.error("데이터 저장 실패:", error);
    }
  };
  

  const handleShowModal = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    axios.get(`${API_BASE_URL}/StuLoad`)
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error('데이터를 불러오는 데 실패했습니다', error);
      });
  }, []);

 // 필터링된 학생 목록
 const filteredStudents = selectedStatus === 0 ? students.filter(student => student.StudentState === 0) : students.filter(student => student.StudentState === selectedStatus);

  return (
    <div className="container ">
      <h1 className="mt-3 mb-3">학생 관리</h1>
      <div className="mb-3 d-flex justify-content-between">
        <div>
         <button className={`btn ${selectedStatus === 0 ? "btn-primary" : "btn-secondary"}`} style={{ marginRight: '10px' }} onClick={() => setSelectedStatus(0)}>잠정 가입</button>
         <button className={`btn ${selectedStatus === 1 ? "btn-primary" : "btn-secondary"}`} style={{ marginRight: '10px' }} onClick={() => setSelectedStatus(1)}>줌미팅 등록</button>
         <button className={`btn ${selectedStatus === 2 ? "btn-primary" : "btn-secondary"}`} style={{ marginRight: '10px' }} onClick={() => setSelectedStatus(2)}>줌미팅 완료</button>
         <button className={`btn ${selectedStatus === 3 ? "btn-primary" : "btn-secondary"}`} style={{ marginRight: '10px' }} onClick={() => setSelectedStatus(3)}>재학 학생</button>
         <button className={`btn ${selectedStatus === 4 ? "btn-primary" : "btn-secondary"}`} style={{ marginRight: '10px' }} onClick={() => setSelectedStatus(4)}>휴학 학생</button>
         
        </div>
        <Link to="/signup">
              <button className="btn btn-secondary">학생 생성</button>
        </Link>
      </div>
      <table className="table table-striped" style={{ whiteSpace: 'nowrap' }}>
        <thead>
          <tr>
            <th>신청일시</th>
            <th>이름</th>
            <th>애칭</th>
            <th>이메일</th>
            <th>생년월일</th>
            <th>국적</th>
            <th>거주도시</th>
            <th>등록 상황</th> 
            <th>메모</th>
          </tr>
        </thead>
        <tbody>
        {filteredStudents.map((student, index) => (  // 변경된 부분
          <tr key={index}>
            <td>{student.createdAt}</td>
            <td onClick={() => handleShowModal(student)}>{student.User.username}</td>
            <td onClick={() => handleShowModal(student)}>{student.Nickname}</td>
            <td onClick={() => handleShowModal(student)}>{student.User.email}</td>
            <td>{student.User.birth}</td>
            <td>{student.User.Nationality}</td>
            <td>{student.User.currentCity}</td>
            <td>{
              student.StudentState === 0 ? "잠정 가입" :
              student.StudentState === 1 ? "줌미팅 등록 상태" :
              student.StudentState === 2 ? "줌미팅 후 상태" :
              student.StudentState === 3 ? "재학생" :
              student.StudentState === 4 ? "휴학생" : "알 수 없는 상태"
            }</td>
            <td><button className="btn btn-secondary">메모</button></td>

          </tr>
        ))}
      </tbody>
      </table>
      <button className="btn btn-info">더 보기</button>

      {showModal && (
        <div className="modal show" tabIndex="-1" style={{ display: 'block' }}>
            <div className="modal-dialog" style={{ maxWidth: '60%' }}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{selectedStudent?.User.username}</h5>
                  <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                </div>
              <div className="modal-body">
              {selectedStudent.StudentState === 0 && <PendingModalBody setPendingData={setPendingData} selectedStudent={selectedStudent} />}
              {selectedStudent.StudentState === 1 && <ZoomRegisteredModalBody setChildData={setChildData} selectedStudent={selectedStudent} />}
              {selectedStudent.StudentState === 2 && <ZoomCompletedModalBody setChildData={setChildData} selectedStudent={selectedStudent} />}
              {selectedStudent.StudentState === 3 && <CurrentStudentBody setChildData={setChildData} selectedStudent={selectedStudent} />}
              {selectedStudent.StudentState === 4 && <AbsenceStudentBody setChildData={setChildData} selectedStudent={selectedStudent} />}
              </div>
              <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => handleSaveData(childData, selectedStudent.StudentState)} >저장</button>
              <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>닫기</button>
            </div>
            </div> 
        </div>
        </div>
          )}
  </div>
 
  )};
export default StudentManagement;