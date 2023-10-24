import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const TeacherManagement = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [memberName, setMemberName] = useState('');
  const [gender, setGender] = useState('남성');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [registrationNumberFront, setRegistrationNumberFront] = useState('');
  const [registrationNumberBack, setRegistrationNumberBack] = useState('');
  const [teachingLanguage, setTeachingLanguage] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [zoomMeetingLink ,setZoomMeetingLing] = useState('');
  
  
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  
  
  const handleSubmit = async () => {
  const combinedRegistrationNumber = `${registrationNumberFront}-${registrationNumberBack}`;
    try {
      const formData = {
        email,
        memberName,
        phoneNumber,
        gender,
        address,
        detailAddress,
        registrationNumber: combinedRegistrationNumber, 
        teachingLanguage,
        bankName,
        accountNumber,
        zoomMeetingLink,
      };
  
      const response = await axios.post(`${API_BASE_URL}/TeacherCreate`, JSON.stringify(formData), {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        console.log('강사가 성공적으로 생성되었습니다.');
        console.log(API_BASE_URL);
      }
  
      toggleModal(); // 모달 닫기
    } catch (error) {
      console.error('강사 생성에 실패했습니다.', error);
      console.log(API_BASE_URL);
    }
  };


    return (
      <div className="container">
        <h1 className="mt-3 mb-3">강사 관리</h1>
        <div className="mb-3 d-flex justify-content-between">
          <div>
            <button className="btn btn-primary">전체 강사</button>
            <button className="btn btn-secondary ml-2">재직 강사</button>
            <button className="btn btn-secondary ml-2">해직 강사</button>
          </div>
          <button className="btn btn-success" onClick={toggleModal}>강사 생성</button>
        </div>
        {showModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">강사 생성</h5>
                <button type="button" className="btn-close" onClick={toggleModal}></button>
              </div>
          <div className="modal-body">
            <div className="row mb-3">
              <label className="col-sm-3 col-form-label">이메일</label>
              <div className="col-sm-9">
                <input type="text" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-3 col-form-label">회원 이름</label>
              <div className="col-sm-9">
                <input type="text" placeholder="회원 이름" value={memberName} onChange={(e) => setMemberName(e.target.value)} className="form-control" />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-3 col-form-label">성별 :</label>
              <div className="col-sm-9">
              <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)} className="form-control">
                <option value="남성">남성</option>
                <option value="여성">여성</option>
              </select>
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-3 col-form-label">전화번호</label>
              <div className="col-sm-9">
                <input type="text" placeholder="전화번호" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="form-control" />
              </div>
            </div>
            <div className="row mb-3">
                  <label className="col-sm-3 col-form-label">기본 주소</label>
                  <div className="col-sm-9">
                    <input
                      style={{ width: '100%' }} 
                      value={address} 
                      onChange={e => setAddress(e.target.value)}
                      placeholder="주소"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-3 col-form-label">상세 주소</label>
                  <div className="col-sm-9">
                    <input
                      style={{ width: '100%' }} 
                      value={detailAddress}
                      onChange={e => setDetailAddress(e.target.value)}
                      placeholder="상세주소"
                    />
                  </div>
                </div>

          <div className="row mb-3">
            <label className="col-sm-3 col-form-label">주민등록번호</label>
            <div className="col-sm-4">
              <input type="text" placeholder="앞자리" value={registrationNumberFront} onChange={(e) => setRegistrationNumberFront(e.target.value)} className="form-control" />
            </div>
          <div className="col-sm-1 text-center align-self-center">
            <span style={{ fontSize: '24px' }}>-</span>
          </div>
            <div className="col-sm-4">
              <input type="text" placeholder="뒷자리" value={registrationNumberBack} onChange={(e) => setRegistrationNumberBack(e.target.value)} className="form-control" />
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-3 col-form-label">강사 가능 언어</label>
            <div className="col-sm-9">
              <input type="text" placeholder="강사 가능 언어" value={teachingLanguage} onChange={(e) => setTeachingLanguage(e.target.value)} className="form-control" />
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-3 col-form-label">은행 이름</label>
            <div className="col-sm-9">
              <input type="text" placeholder="은행 이름" value={bankName} onChange={(e) => setBankName(e.target.value)} className="form-control" />
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-3 col-form-label">계좌 번호</label>
            <div className="col-sm-9">
              <input type="text" placeholder="계좌 번호" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} className="form-control" />
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-3 col-form-label">줌 미팅 링크</label>
            <div className="col-sm-4">
              <input type="text" placeholder="" value={zoomMeetingLink} onChange={(e) => setZoomMeetingLing(e.target.value)} className="form-control" />
            </div>
        </div>
          
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={toggleModal}>닫기</button>
          <button type="button" className="btn btn-primary" onClick={handleSubmit}>저장</button>
        </div>
      </div>
    </div>
  </div>
)}
  <table className="table">
          <thead>
            <tr>
              <th>강사번호</th>
              <th>이름</th>
              <th>이메일</th>
              <th>전화번호</th>
              <th>상세 정보</th>
              <th>강의 보기</th>
              <th>추가 수업 가능 시간</th>
              <th>수당 관리</th>
            </tr>
          </thead>
          <tbody>
            
          </tbody>
        </table>
        <button className="btn btn-info">더 보기</button>
      </div>
    );
  };

export default TeacherManagement;
