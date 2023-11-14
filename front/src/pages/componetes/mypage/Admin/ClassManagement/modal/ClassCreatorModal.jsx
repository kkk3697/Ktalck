import React, { useState ,useEffect   } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


const levels = ['초급', '중급', '고급'];
const daysOfWeek = ['월', '화', '수', '목', '금', '토', '일'];
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ClassCreatorModal = ({ showModal, toggleModal }) => {
  const [teachers, setTeachers] = useState([]);
  const [timezones, setTimezones] = useState([]);
  const [className, setClassName] = useState(''); 
  const [accountNumber, setAccountNumber] = useState('');
  const [selectedZoomLink, setSelectedZoomLink] = useState();
  const [classCategory, setClassCategory] = useState('온라인');
  const [teacher, setTeacher] = useState(1);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [zoomMeetingID, setZoomMeetingID] = useState("");
  const [zoomPassword, setZoomPassword] = useState("");
  const [textbook, setTextbook] = useState('');
  const [classLevels, setClassLevels] = useState(['', '', '']);
  const [selectedDays, setSelectedDays] = useState([]);
  const [weeklyFrequency, setWeeklyFrequency] = useState(0);
  const [classTime, setClassTime] = useState('');
  const [scheduleDays, setScheduleDays] = useState([]);
  const [unitLevel, setUnitLevel] = useState(1);
  const [gradeLevel, setGradeLevel] = useState(1);
  const [classLevel, setClassLevel] = useState(1);
  const levelOptions = Array.from({ length: 9 }, (_, i) => i + 1);
  const classTypes = ["온라인", "오프라인", "혼합"];

  useEffect(() => {
    if (showModal) {
      const fetchData = async () => {
        try {
          // 동시에 여러 API 호출
          const [teachersResponse, timezonesResponse] = await Promise.all([
            axios.get(`${API_BASE_URL}/teacherLoad`),
            axios.get(`${API_BASE_URL}/timezones`),
          ]);

          // API 응답으로 상태 업데이트
          setTeachers(teachersResponse.data);
          setTimezones(timezonesResponse.data);
      
        } catch (error) {
          // 에러 핸들링은 한 군데에서!
          console.error('데이터를 불러오는 데 실패했습니다:', error);
        }
      };

      fetchData();
    }
  }, [showModal]);
  const handleTeacherChange = (selectedTeacher) => {
    setTeacher(selectedTeacher);
  };
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
  const handleSubmit = async () => {
    try {
      const classData = {
        className,
        classCategory,
        teacher,
        textbook,
        unitLevel,
        gradeLevel,
        classLevel,
        weeklyFrequency,
        selectedDays, 
        selectedTimes, 
        zoomMeetingID,
        zoomPassword,
       
      };
      const response = await axios.post(
        `${API_BASE_URL}/ClassCreates`,
        classData,
        { headers: { 'Content-Type': 'application/json' } }
      );
  
      if (response.status === 201) {
        console.log('클래스가 성공적으로 생성되었습니다.');
        toggleModal(); // 모달 닫기
      }
    } catch (error) {
      console.error('클래스 생성에 실패했습니다:', error);
      console.log(API_BASE_URL); // 이 부분은 필요에 따라 삭제하거나 남겨둘 수 있어.
    }
  };

  // 날짜 클릭 핸들러
  const handleDayClick = (day) => {
    setSelectedDays(selectedDays.includes(day)
      ? selectedDays.filter(d => d !== day)
      : [...selectedDays, day]
    );
  };

  // 시간 삭제 핸들러
  const removeTime = (time) => {
    setSelectedTimes(selectedTimes.filter(t => t !== time));
  };

  // 시간 더블 클릭 핸들러
  const handleDoubleClick = (time) => {
    if (!selectedTimes.includes(time)) {
      setSelectedTimes([...selectedTimes, time]);
    }
  };

  // 모달을 렌더링하는 부분
  return (
    <>
    {showModal && (
      <div className="modal fade show d-block" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">클래스 생성</h5>
              <button type="button" className="btn-close" onClick={toggleModal}></button>
            </div>
            <div className="modal-body">
              

    <div className="row mb-3">
    <label className="col-sm-3 col-form-label">클래스 이름</label>
    <div className="col-sm-4">
    <input type="text" placeholder="" value={className} onChange={(e) => setClassName(e.target.value)} className="form-control" />
    </div>
      </div> 
    <div className="row mb-3">
        <label className="col-sm-3 col-form-label">강의 타입</label>
        <div className="col-sm-4">
        <select className="form-control" id="classType" onChange={e => setClassCategory(e.target.value)}>
          {classTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
        </div>
      </div>

      <div className="row mb-3">
        <label className="col-sm-3 col-form-label">강사</label>
        <div className="col-sm-4">
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
                
        </div>
      </div>

      <div className="row mb-3">
        <label className="col-sm-3 col-form-label">교재</label>
        <div className="col-sm-4">
          <input type="text" placeholder="" value={textbook} onChange={(e) => setTextbook(e.target.value)} className="form-control" />
        </div>
      </div>

      <div className="row mb-3">
        <label className="col-sm-3 col-form-label">클래스 레벨</label>
        <div className="col-sm-9">
          <div style={{ display: 'inline-block', margin: '0 10px' }}>
           
            <select onChange={(e) => setUnitLevel(e.target.value)}>
              {levelOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <span>단원</span>
          </div>
          <div style={{ display: 'inline-block', margin: '0 10px' }}>
            
            <select onChange={(e) => setGradeLevel(e.target.value)}>
              {levelOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <span>수준</span>
          </div>
          <div style={{ display: 'inline-block', margin: '0 10px' }}>
            
            <select onChange={(e) => setClassLevel(e.target.value)}>
              {levelOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <span>레벨</span>
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <label className="col-sm-3 col-form-label">주 횟수</label>
        <div className="col-sm-4">
          <input type="number" placeholder="" value={weeklyFrequency} onChange={(e) => setWeeklyFrequency(e.target.value)} className="form-control" />
        </div>
      </div>

      <div className="row mb-3">
          <label className="col-sm-3 col-form-label">진행 요일</label>
          <div className="col-sm-9">
            {daysOfWeek.map((day, index) => (
              <div key={index} style={{ display: 'inline-block', margin: '0 10px' }}>
                <input type="checkbox" id={day} checked={selectedDays.includes(day)} onChange={() => handleDayClick(day)} />
                <label htmlFor={day}>{day}</label>
              </div>
            ))}
          </div>
        </div>
 

      <div className="row mb-3">
        <label className="col-sm-3 col-form-label">수업시간</label>
        <div className="col-sm-9">
          <div className="col-sm-6">
          <select multiple className="form-control" onChange={e => {
              const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
              setClassTime(selectedOptions); // selectedTimes로 바꿀지도 모르겠어. 확인해 봐야 해.
            }}>
              {timezones && timezones.flat().map((time, index) => (
                <option key={index} value={time} onDoubleClick={() => handleDoubleClick(time)}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <label className="col-sm-3 col-form-label">선택된 시간</label>
        <div className="col-sm-9">
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {selectedTimes.map((time, index) => (
              <div key={index} style={{ margin: '0 10px' }}>
                {time}
                <button onClick={() => removeTime(time)}>x</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <label className="col-sm-3 col-form-label">줌 미팅 링크</label>
        <div className="col-sm-4">
         {selectedZoomLink}
        </div>
      </div>

      <div className="row mb-3">
      <label className="col-sm-3 col-form-label">줌 미팅 아이디</label>
      <div className="col-sm-4">
        <input type="text" value={zoomMeetingID} onChange={(e) => setZoomMeetingID(e.target.value)} className="form-control" />
      </div>
    </div>

    {/* 줌 미팅 패스워드 */}
    <div className="row mb-3">
      <label className="col-sm-3 col-form-label">줌 미팅 패스워드</label>
      <div className="col-sm-4">
        <input type="password" value={zoomPassword} onChange={(e) => setZoomPassword(e.target.value)} className="form-control" />
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
      </>
    );
  };

export default ClassCreatorModal;
