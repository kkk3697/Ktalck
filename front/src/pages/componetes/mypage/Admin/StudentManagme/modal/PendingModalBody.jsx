//StudentManagement 0번 모듈 내용

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


 
const PendingModalBody = ({ selectedStudent, setPendingData }) => {

  const [Nickname  , setNickname ] = useState("");
  const [teacher, setTeacher] = useState("");
  const [TimeDifference ,setTimeDifference ] = useState(0);
  const [selectedZoomLink, setSelectedZoomLink] = useState();
  const [MeetingDate, setMeetingDate ] = useState();
  const [teachers, setTeachers] = useState([]);  

  const handleTimeDifferenceChange = (e) => {
    const newTimeDifference = e.target.value;
    setTimeDifference(newTimeDifference);
  };
    
  const handleMeetingDateChange = (e) => {
    const newMeetingDate = e.target.value;
    setMeetingDate(newMeetingDate);
  };
    
  const handleTeacherChange = (newTeacher) => {
    setTeacher(newTeacher);
  };
  
  const updatePendingData = () => {

    const 만든데이터 = {
      timeDifference: TimeDifference,
      meetingDate: MeetingDate,
      teacher: teacher,
      selectedZoomLink: selectedZoomLink
    };
    setPendingData(만든데이터);
  };
  
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR').split('.').slice(0, 3).join('-').trim(); // 'YYYY-MM-DD' 형식으로 변환
  }
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
      updatePendingData();
    }, [TimeDifference, MeetingDate, teacher, selectedZoomLink]);
    
  return (
    <div>
   <div className="modal-body">
  <div className="row">
  <div className="col-lg-6" style={{ border: '1px solid #ccc', padding: '20px' }}> 
      <div className="mb-3">
        <label className="form-label">신청일시:</label>
        <div style={{ border: '1px solid #ccc', backgroundColor: '#f5f5f5', padding: '10px' }}>
        {formatDate(selectedStudent?.createdAt)} 
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
        <div><button className = 'btn'>메모</button></div>
      </div>
    </div>
    <div className="col-lg-6" style={{border: '1px solid #ccc', padding: '20px' }}> {/* 오른쪽 줌 미팅 부분 */}

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
    </div>
  );
};

export default PendingModalBody;