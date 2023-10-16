//StudentManagement 1번 모듈 내용

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ZoomRegisteredModalBody = ({selectedStudent}) => {

    const [Nickname  , setNickname ] = useState("");
    const [teacher, setTeacher] = useState("");
    const [TimeDifference ,setTimeDifference ] = useState(0);
    const [selectedZoomLink, setSelectedZoomLink] = useState();
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/teacherLoad`)
          .then(response => {
            setTeachers(response.data);
          })
          .catch(error => {
            console.error('강사 데이터를 불러오는 데 실패했습니다', error);
          });
      }, []);


  return (
    <div>
      <h3>줌 미팅 등록 상태입니다</h3>
      <p>학생이 줌 미팅을 등록했어요. 확인해보세요.</p>
    </div>
  );
};

export default ZoomRegisteredModalBody;
