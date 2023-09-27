import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, Modal } from 'react-bootstrap';
import '../style/signup.css';

import axios from 'axios';
import Select from 'react-select';



const App = () => {
const [searchTerm, setSearchTerm] = useState(""); 

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const [countryCodes, setCountryCodes] = useState([]);
const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);//박스 상태 확인
const [isCheckboxEnabled, setIsCheckboxEnabled] = useState(false);//체크 상태 확인
const [timezones, setTimezones] = useState([]);
const [showModal, setShowModal] = useState(false);  
const [selectedCountry, setSelectedCountry] = useState({
  value: '',
  label: '-- select --'
});
const [selectedOption, setSelectedOption] = useState({
  value: '82',  // 한국의 국가 코드
  label: '(82) Korea'
});
const options = countryCodes.map(codeInfo => ({
  value: codeInfo.callingCode,
  label: `(${codeInfo.callingCode}) ${codeInfo.name}`,
}));
const countryOptions = countryCodes.map(codeInfo => ({
  value: codeInfo.name, // 실제 값
  label: codeInfo.name // 보여지는 값
}));

  const openPopup = () => {
    if (!isCheckboxEnabled) {  // 체크가 안 된 상태에서만 모달 띄우기
      setShowModal(true);
    }
  };
  const handleCheckboxClick = () => {
    // 체크박스가 아직 체크되지 않았을 경우에만 모달창을 띄워준다.
    if (!isCheckboxEnabled) {
      setShowModal(true);
    } else {
      // 이미 체크가 되어 있다면, 체크를 해제한다.
      setIsCheckboxChecked(false);
      setIsCheckboxEnabled(false);
    }
  };
  
  const handleAgree = () => {
    setIsCheckboxEnabled(true);  // 체크박스를 활성화시킨다.
    setIsCheckboxChecked(true);  // 체크박스를 체크 상태로 만든다.
    setShowModal(false);  // 모달을 닫는다.
  };
  
  const handleCancel = () => {
    setIsCheckboxChecked(false);  // 체크박스를 체크 해제 상태로 만든다.
    setShowModal(false);  // 모달을 닫는다.
  };
  const SignupPopup = ({ show, onHide, onAgree, onCancel }) => (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>STUDENT RULES</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div id="scrollBox">
        <ol>
            <li>K-talk LIVE has a Xorean Only* policy. Students must speak Korean while they are within the classes except in special circumstances.</li>
            <li>Students must attend more than three fifths of the classes, otherwise, they will be asked to dismiss from the online class.</li>
            <li>Students wishing to take an extended holiday or leave of absence must receive written authorization from their teachers.</li>
            <li>If the student has been absent for more than 10 consecutive sessions, the student will be dismissed from the course.</li>
            <li> Students are expected to act in accordance with the following Student Code of Conduct These are for eliminating stress, preventing initial problems and creating a safe environment for all. Students who broke any of these rules will be given at least 1 verbal and 1 written warning. If the wrong behavior continues, the student may be considered to be expelled.
              <ul className="sub-list">
                <li>Participate in class, take all competency checks, exams and complete all projects</li>
                <li>Attend class regularly. Dressed appropriately and ready to learn.</li>
                <li>Students who access to the class more than 10 minutes after the start of class are considered absent and may not enter the classroom.</li>
                <li>Students are asked to inform their teacher of any changes in their study plans.</li>
                <li>Students must respect teachers and other students. Bullying, discrimination [e.g. race, religion, sexual orientation and gender] and abuse in any form will not be tolerated and may lead to dismissal,</li>
                <li>Students are required to turn on audio / video functions during the class. If students do not keep their audio/video on, they may be asked to leave the class by teachers.</li>
                <li>Students are asked to maintain their background environment quiet for a class. Depending on the severity of the noise from the side of students, they may receive a warning from the teacher and their audio can be turned off by the teacher.</li>
                <li>Students are requested to acquaint themselves with Zoom and Google Classroom before starting courses.</li>
                <li>Students are required to complete their homework and hand it in PDF or JPG file format.</li>
                <li>Students can ask personal questions only on the chatting line or through classroom messenger.</li>
                <li>Any kind of photo/video shooting or recording of the class is not allowed.</li>
              </ul>
            </li>
          </ol>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          취소
        </Button>
        <Button variant="primary" onClick={onAgree}>
          동의
        </Button>
      </Modal.Footer>
    </Modal>
  );

useEffect(() => {
  // 국가 코드를 불러오는 함수
  async function fetchCountryCodes() {
    try {
      const response = await axios.get(`${API_BASE_URL}/countryCodes`);
      const countryNames = response.data.map(item => item.name);
      setCountryCodes(response.data);
    } catch (error) {
      console.error("API 호출 중 에러 발생:", error);
    }
  }
  async function fetchTimezones() {
    try {
      const response = await axios.get(`${API_BASE_URL}/timezones`);
      setTimezones(response.data);
    } catch (error) {
      console.error("API 호출 중 에러 발생:", error);
    }
  }

  window.addEventListener('message', messageListener);
  
  fetchCountryCodes();
  fetchTimezones();

  return () => {
    // 컴포넌트 unmount 될 때 이벤트 리스너 해제
    window.removeEventListener('message', messageListener);
  };
}, []);

const messageListener = (event) => {
  if (event.data === 'agreed') {
    setIsCheckboxEnabled(true);
  }
};
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    birthYear: '',
    birthMonth: '',
    birthDay: '',
    country_code: '',
    language: '',
    nationality: '',
    phone_number: '',
    currentCity: '',
    timezones: []
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevState) => {
        let updatedTimezones = prevState[name] || [];  // 이미 체크된 값이 있다면 가져오고, 없으면 빈 배열
        if (checked) {
          updatedTimezones.push(value); // 체크했다면 추가
          console.log("Updated state:", formData);
        } else {
          updatedTimezones = updatedTimezones.filter(item => item !== value); // 체크 해제했다면 제거
        }
        return { ...prevState, [name]: updatedTimezones };
      });
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }

  };
  
  
  
  // 폼을 제출하는 함수
  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentYear = new Date().getFullYear();
    const minYear = 1900;
    if (formData.birthYear < minYear || formData.birthYear > currentYear) {
      alert("유효한 생년을 입력해주세요.");
      return;
    }
    
    if (formData.birthMonth < 1 || formData.birthMonth > 12) {
      alert("유효한 월을 입력해주세요.");
      return;
    }
    
    if (formData.birthDay < 1 || formData.birthDay > 31) {
      alert("유효한 일을 입력해주세요.");
      return;
    }
  
    // 국가 검사
    const isValidCountry = countryOptions.some(
      (option) => option.value === formData.nationality
    );
    
    if (!isValidCountry) {
      alert("유효한 국가를 선택해주세요.");
      return;
    }
    if (isCheckboxChecked) {
      const newFormData = {
        ...formData,
        email: formData.email,
        birthYear: formData.birthYear,
        birthMonth: formData.birthMonth,
        birthDay: formData.birthDay,
        country: selectedCountry,
        language: formData.language,
        phone_number: formData.phone_number,
        timezone: formData.timezones,
        country_code: selectedOption ? selectedOption.value : '',
        currentCity: formData.currentCity, 
        firstName: formData.firstName,  
        lastName: formData.lastName,  
        nationality: formData.nationality  
      };
  
      try {
        // 서버로 POST 요청
        const response = await axios.post(`${API_BASE_URL}/signup`, newFormData);
        if (response.status === 200) {
          console.log('Application submitted:', response.data);
          console.log(new FormData);
          
          // 서버로부터 받은 메시지를 알림으로 띄우고 페이지 리다이렉션
          alert(response.data.message);
          if (response.data.redirect) {
            window.location.href = response.data.redirect;
          }
        } 
      } catch (error) {
        console.error('error:', error);
        if (error.response && error.response.status === 409) {
          alert('Email already exists.');
        } else {
          console.error('error:', error);
        }
      }
    } else {
      alert('Please agree to the Terms of Use.');
    }
  };
  

  return (
    <Container className="container">
      <h1>Application Form</h1><br/>
      <h2>for K-talk Live regular paid Korean lessons</h2>
      <h4>·Please complete and submit this form so that teachers can contact you for the next step.
          <br/>
          ·If you'd like to apply for our Free Hangeul Lessons, please exit this page and visit our website at
          <br/>    
          http://ktalklive.com
          or our FB page at 
          https://www.facebook.com/ktalklive<br/><br/>
          Thank you very much!<br/></h4>
  
    <Form onSubmit={handleSubmit}>
    <Form.Group as={Row} className="form-group">
    <Form.Label column sm="2">
      Name in full (First/Last):
    </Form.Label>
    <Col sm="5">
      <Form.Control
        type="text"
        placeholder="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        required
      />
    </Col>
    <Col sm="5">
      <Form.Control
        type="text"
        placeholder="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        required
      />
    </Col>
  </Form.Group>

  <Form.Group as={Row} className="form-group">
    <Form.Label column sm="2">
      Email Address
    </Form.Label>
    <Col sm="10">
      <Form.Control
        type="email"
        placeholder="Address@gmail.com"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
    </Col>
  </Form.Group>

  <Form.Group as={Row} className="form-group">
  <Form.Label column sm="2">
    Date of Birth:
  </Form.Label>
  <Col sm="10">
    <div style={{ display: "flex" }}>
      <Form.Control 
        type="text" 
        list="birthYears" 
        name="birthYear" 
        className="form-control" 
        placeholder="Year" 
        required 
        onChange={handleChange}
        style={{width: "100px", marginRight: "10px"}}
      />
      <datalist id="birthYears">
        {[...Array(61).keys()].map(i => i + 1950).map(year => (
          <option key={year} value={year} />
        ))}
      </datalist>
      
      <Form.Control 
        type="text" 
        list="birthMonths" 
        name="birthMonth" 
        className="form-control" 
        placeholder="Month" 
        required 
        onChange={handleChange}
        style={{width: "100px", marginRight: "10px"}}
      />
      <datalist id="birthMonths">
        {[...Array(12).keys()].map(i => i + 1).map(Month => (
          <option key={Month} value={Month} />
        ))}
      </datalist>
      
      <Form.Control 
        type="text" 
        list="birthDays" 
        name="birthDay" 
        className="form-control" 
        placeholder="Day" 
        required 
        onChange={handleChange}
        style={{width: "100px"}}
      />
      <datalist id="birthDays">
        {[...Array(31).keys()].map(i => i + 1).map(Day => (
          <option key={Day} value={Day} />
        ))}
        </datalist>
    </div>
  </Col>
</Form.Group>

<Form.Group as={Row} className="form-group">
  <Form.Label column sm="2">
    Nationality
  </Form.Label>
  <Col sm="10">
    <Select 
      options={countryOptions} 
      isSearchable={true} 
      value={selectedCountry}
      onChange={(option) => {
        setSelectedCountry(option);
        setFormData({
          ...formData,
          nationality: option ? option.value : ''
        });
      }}
    />
  </Col>
</Form.Group>


<Form.Group as={Row} className="form-group">
    <Form.Label column sm="2">
      Language you use:
    </Form.Label>
    <Col sm="10">
      <Form.Control 
        as="input" 
        list="language" 
        name="language" 
        placeholder="Up to 3 languages" 
        onChange={handleChange}
        required />
    </Col>
  </Form.Group>

  <Form.Group as={Row} className="form-group">
      <Form.Label column sm="2">
        Phone number
      </Form.Label>
      <Col sm="10">
        <div className="phone-container ">
          <Select 
            options={options} 
            isSearchable={true} 
            value={selectedOption}
            onChange={handleChange}
            className='mb-2 phone_code'
          />
          <Form.Control
            type="text"
            name="phone_number"
            className="form-control mb-3"
            onChange={handleChange}
            required
          />
        </div>
      </Col>
    </Form.Group>
  
    <Form.Group as={Row} className="form-group">
  <h2>Please choose your available class hours in your local time.</h2>
      <Form.Group className="timezone-container">
      {timezones.map((row, rowIndex) => (
        <div key={rowIndex} className="timezone-row">
          {row.map((timezone, index) => (
            <div key={index} className="timezone-item">
              <Form.Check 
                type="checkbox" 
                id={timezone} 
                name="timezones" 
                value={timezone} 
                label={timezone} 
                onChange={handleChange}
              />
            </div>
          ))}
        </div>
      ))}
    </Form.Group>
  <Form.Label>Please indicate your country of residence with states and city:</Form.Label>
  <Form.Control 
  type="text" 
  name="currentCity" 
  placeholder="country / state / city" 
  onChange={handleChange}
/>
</Form.Group>


<div className="d-flex flex-column align-items-center add-margin">
  <h3>Do you agree to the terms of our Student Rules?</h3>
  <Form.Check
    style={{ marginTop: '20px' }}
    type="checkbox"
    label="Yes, I agree"
    id="termsCheckbox"
    onChange={handleCheckboxClick}
    checked={isCheckboxChecked}

    
  />
</div>

<SignupPopup show={showModal} onHide={() => setShowModal(false)} onAgree={handleAgree} onCancel={handleCancel}/>


  <Button type="submit">Submit application</Button>

  </Form>
  </Container>
  );
};

export default App;
