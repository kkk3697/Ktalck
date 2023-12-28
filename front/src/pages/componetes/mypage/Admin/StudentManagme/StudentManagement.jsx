import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PendingModalBody from './modal/PendingModalBody';
import ZoomRegisteredModalBody from './modal/ZoomRegisteredModalBody';
import ZoomCompletedModalBody from './modal/ZoomCompletedModalBody';
import CurrentStudentBody from './modal/CurrentStudentBody';
import AbsenceStudentBody from './modal/AbsenceStudentBody';

import TableBody from './table/TableBody';
import TableHeader from './table/TableHeader';

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
  const [ZoomRegisteredData, setZoomRegistered] = useState({
    zoomMeetingDataMemo : null,
    Nickname : 0
  });

  const [ZoomCompletedData,setZoomCompleted] = useState({
    classno : 0,
    classTime : null,
    scheduleDays : null
  })
  const [modalData, setModalData] = useState({
    pending: {
      timeDifference: 0,
      meetingDate: null,
      zoomMeetingTeacher: null,
      selectedZoomLink: null
    },
    ZoomRegistered: {
      zoomMeetingDataMemo : null,
      NickName : 0
    },
    zoomCompleted: {
      classno : 0,
      classTime : null,
      scheduleDays : null
    },
    currentStudent: {
      // 여기에 현재 학생과 관련된 초기 상태 값들을 설정
    },
    absenceStudent: {
      // 여기에 휴학 학생과 관련된 초기 상태 값들을 설정
    }
  });
  const fetchStudents = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/StuLoad`);
        setStudents(response.data); // 서버로부터 받은 학생 데이터를 상태에 저장
    } catch (error) {
        console.error('데이터를 불러오는 데 실패했습니다', error);
    }
};

//저장 버튼을 눌렀을때 전달할 데이터 
const handleSaveData = async () => {
  let dataToSend = {
      stuNo: selectedStudent.stuNo,
  };

  if (selectedStudent.StudentState === 0) {
      dataToSend.pendingData = pendingData;
  } else if (selectedStudent.StudentState === 1) {
      dataToSend.ZoomRegisteredData = ZoomRegisteredData;
  }
  else if(selectedStudent.StudentState == 2)
  {
    dataToSend.zoomCompletedData = ZoomCompletedData;
  }

  console.log("After merge - dataToSend:", dataToSend);

    try {
        const response = await axios.post(`${API_BASE_URL}/saveModalData`, dataToSend);
        if (response.status === 200 || response.status === 204 || response.status === 201) {
            // 성공 처리 로직
            handleCloseModal();
            fetchStudents();
        }
    } catch (error) {
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
          <TableHeader status={selectedStatus} />
        </thead>
        <tbody>
        <TableBody status={selectedStatus} students={students} onShowModal={handleShowModal} />
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
              {selectedStudent.StudentState === 1 && <ZoomRegisteredModalBody setZoomRegisteredData={setZoomRegistered} selectedStudent={selectedStudent} />}
              {selectedStudent.StudentState === 2 && <ZoomCompletedModalBody setZoomCompletedData={setZoomCompleted} selectedStudent={selectedStudent} />}
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