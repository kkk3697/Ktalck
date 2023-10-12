import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const StudentManagement = () => {
  
  const [students, setStudents] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(0); // 추가된 상태변수
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [Nickname  , setNickname ] = useState("");
  const [teacher, setTeacher] = useState("");
  const [TimeDifference ,setTimeDifference ] = useState(0);
  const [selectedZoomLink, setSelectedZoomLink] = useState();

  const [teachers, setTeachers] = useState([]);
 
  const updateZoomLink = async (tno) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getZoomMeetingLink/${tno}`);
      if (response.status === 200) {
        setSelectedZoomLink(response.data.zoomMeetingLink);
      }
    } catch (error) {
      console.error('Zoom 미팅 정보를 가져오는 데 실패했습니다:', error);
    }
  };
  useEffect(() => {
    axios.get(`${API_BASE_URL}/teacherLoad`)
      .then(response => {
        setTeachers(response.data);
      })
      .catch(error => {
        console.error('강사 데이터를 불러오는 데 실패했습니다', error);
      });
  }, []);
  
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
         <button className={`btn ${selectedStatus === 5 ? "btn-primary" : "btn-secondary"}`} style={{ marginRight: '10px' }} onClick={() => setSelectedStatus(5)}>졸업 학생</button>
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
              student.StudentState === 1 ? "줌 미팅 전 상태" :
              student.StudentState === 2 ? "줌미팅 후 상태" :
              student.StudentState === 3 ? "재학생" :
              student.StudentState === 4 ? "졸업생" :
              student.StudentState === 5 ? "휴학생" : "알 수 없는 상태"
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
  <div className="row">
  <div className="col-lg-6" style={{ border: '1px solid #ccc', padding: '20px' }}> 
      <div className="mb-3">
        <label className="form-label">신청일시:</label>
        <div style={{ border: '1px solid #ccc', backgroundColor: '#f5f5f5', padding: '10px' }}>
          {selectedStudent?.createdAt}
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label">이름:</label>
        <div style={{ border: '1px solid #ccc', backgroundColor: '#f5f5f5', padding: '10px' }}>
          {selectedStudent?.User.username}</div>
      </div>
      <div className="mb-3">
        <label className="form-label">이메일:</label>
        <div style={{ border: '1px solid #ccc', backgroundColor: '#f5f5f5', padding: '10px' }}>{selectedStudent?.User.email}</div>
      </div>
      <div className="mb-3">
        <label className="form-label">생년월일:</label>
        <div style={{ border: '1px solid #ccc', backgroundColor: '#f5f5f5', padding: '10px' }}>{selectedStudent?.User.birth}</div>
      </div>
      <div className="mb-3">
        <label className="form-label">국적:</label>
        <div style={{ border: '1px solid #ccc', backgroundColor: '#f5f5f5', padding: '10px' }}>{selectedStudent?.User.Nationality}</div>
      </div>
      <div className="mb-3">
        <label className="form-label">거주국가:</label>
        <div style={{ border: '1px solid #ccc', backgroundColor: '#f5f5f5', padding: '10px' }}>{selectedStudent?.User.currentCity}</div>
      </div>
      <div className="mb-3">
        <label className="form-label">전화번호:</label>
        <div style={{ border: '1px solid #ccc', backgroundColor: '#f5f5f5', padding: '10px' }}>{selectedStudent?.User.full_phone_number}</div>
      </div>
      <div className="mb-3">
        <label className="form-label">수업 가능 시간:</label>
        <div style={{ border: '1px solid #ccc', backgroundColor: '#f5f5f5', padding: '10px' }}>
          {selectedStudent?.User.timezone}</div>
      </div>  
      <div className="mb-3">
        <label className="form-label">사용 언어:</label>
        <div style={{ border: '1px solid #ccc', backgroundColor: '#f5f5f5', padding: '10px' }}>{selectedStudent?.User.language}</div>
      </div>
      <div className="mb-3">
        <label className="form-label">신청시 메모:</label>
        <div><button class = 'btn'>메모</button></div>
      </div>
    </div>
    <div className="col-lg-6" style={{border: '1px solid #ccc', padding: '20px' }}> {/* 오른쪽 줌 미팅 부분 */}

<label htmlFor="nickname" className="form-label">애칭</label>
<input type="text" className="form-control" id="nickname" onChange={e => setNickname(e.target.value)} />


<label htmlFor="timeDifference" className="form-label">시차</label>
<input type="number" className="form-control" id="timeDifference" onChange={e => setTimeDifference(e.target.value)} />


<label htmlFor="meetingDate" className="form-label">줌 미팅 예정일시</label>
<input type="datetime-local" className="form-control" id="meetingDate" onChange={e => setMeetingDate(e.target.value)} />


<label htmlFor="isFreeClassteacher" className="form-label">무료 수업 강사</label>
<select className="form-control" id="isFreeClassteacher" onChange={async e => {
  console.log("Event target value:", e.target.value);
  setTeacher(e.target.value);
  const selectedTeacher = teachers.find(teacher => {
    if (teacher.tno === undefined) {
      console.log("tno is undefined for teacher: ", teacher);
      return false;
    }
    return teacher.tno.toString() === e.target.value;
  });
  if (selectedTeacher && selectedTeacher.tno) {
    await updateZoomLink(selectedTeacher.tno);
  }
}}>
  {teachers.map((teacher, index) => (
    <option key={index} value={teacher.tno}>
      {teacher.username}
    </option>
  ))}
</select>

<label className="form-label">줌 미팅 링크</label>
<div className="form-control">
  {selectedZoomLink}
</div>
 </div>
 </div>
</div>

<div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>닫기</button>
      </div>
    </div>
  </div>
</div>
      )}
 </div>

  );
  
};

export default StudentManagement;
