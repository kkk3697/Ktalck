//StudentManagement 2번 모듈 내용

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ZoomCompletedModalBody = ({selectedStudent , setZoomCompletedData  }) => {
    const [Nickname  , setNickname ] = useState("");
    const [zoomMeetingMemo, setzoomMeetingMemo  ] = useState();
    const studentClass = selectedStudent.StudentClasses && selectedStudent.StudentClasses.length > 0 
    ? selectedStudent.StudentClasses[0] 
    : null;

    console.log(setZoomCompletedData);
    const handleNicknameChange = (e) => {
      setNickname(e.target.value);
    };
  
    const handlesetzoomMeetingMemoChange = (e) => {
      setzoomMeetingMemo(e.target.value);
    };
  
    useEffect(() => {
      setZoomCompletedData({
        Nickname: Nickname,
        zoomMeetingMemo: zoomMeetingMemo
      });
    }, [Nickname, zoomMeetingMemo]);
  
      function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('ko-KR').split('.').slice(0, 3).join('-').trim(); // 'YYYY-MM-DD' 형식으로 변환
      }
    
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
            <label className="form-label">시차:</label>
            <div style={{ border: '1px solid #ccc', backgroundColor: '#f5f5f5', padding: '10px' }}>
              {studentClass ? studentClass.timeDifference : '정보 없음'}
            </div>
          </div>
          <div className="mb-3">
              <label className="form-label">줌 미팅 예정일시:</label>
              <div style={{ border: '1px solid #ccc', backgroundColor: '#f5f5f5', padding: '10px' }}>
                {formatDate(studentClass ? studentClass.zoomMeetingData : '정보 없음')}
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">줌 미팅 담당 선생님:</label>
              <div style={{ border: '1px solid #ccc', backgroundColor: '#f5f5f5', padding: '10px' }}>
                  {studentClass && studentClass.Teacher ? studentClass.Teacher.User.username : '정보 없음'}
              </div>
          </div>
            <div className="mb-3">
              <label className="form-label">줌 미팅 링크:</label>
              <div style={{ border: '1px solid #ccc', backgroundColor: '#f5f5f5', padding: '10px' }}>
                {studentClass ? studentClass.zoomMeetingLink : '정보 없음'}
              </div>
            </div>
          </div>

        <div className="col-lg-6" style={{border: '1px solid #ccc', padding: '20px' }}> {/* 오른쪽 줌 미팅 부분 */}
    
      </div>
    
     </div>
     </div>
    </div>

);
    };

export default ZoomCompletedModalBody;
