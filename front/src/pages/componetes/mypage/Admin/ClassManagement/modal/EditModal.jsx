import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditModal  = ({ showModal, toggleModal, classData }) => {
  if (!showModal) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">클래스 수정 </h5>
            <button type="button" className="btn-close" onClick={toggleModal}></button>
          </div>
          <div className="modal-body">
            {/* 클래스 상세 정보를 여기에 표시 */}
            <p>클래스 이름: {classData.className}</p>
            {/* 기타 상세 정보 */}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={toggleModal}>닫기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
