import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import '../style/signup.css';

import axios from 'axios';

const App = () => {
    
const [countryCodes, setCountryCodes] = useState([]);
useEffect(() => {
    // 국가 코드를 불러오는 함수
    async function fetchCountryCodes() {
      try {
        const response = await axios.get('http://localhost:4020/api/countryCodes');
        setCountryCodes(response.data);
      } catch (error) {
        console.error("API 호출 중 에러 발생:", error);
      }
    }
    
    fetchCountryCodes();
  }, []);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    birthYear: '',
    birthMonth: '',
    birthDay: '',
    country_code: '',
    phone_number: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // 폼을 제출하는 함수
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted', formData);
  };

  return (
    <Container className="container">
      <h1>Application Form</h1><br/>
      <h2>for K-talk Live regular paid Korean lessons</h2>
  
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

  {/* Email Address */}
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
        style={{width: "100px"}}
      />
      {/* 여기에 datalist birthDays 추가 */}
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
      Phone number
    </Form.Label>
    <Col sm="10">
      <div className="phone-container">
   
        <Form.Select name="country_code">
              {countryCodes.map((codeInfo, index) => (
                <option key={index} value={codeInfo.callingCode}>
                  ({codeInfo.callingCode}) {codeInfo.name}
                </option>
              ))}
            </Form.Select>     
        <Form.Control
          type="text"
          name="phone_number"
          required
        />
      </div>
    </Col>
  </Form.Group>
  <Form.Group as={Row} className="form-group">
    <Form.Label column sm="2">
      Language you use:
    </Form.Label>
    <Col sm="10">
      <Form.Control 
        as="input" 
        list="countries" 
        name="country" 
        placeholder="Up to 3 languages" 
        required />
      {/* <datalist id="countries"> 여기에 국가나 언어 옵션을 채워넣으면 되겠지 </datalist> */}
    </Col>
  </Form.Group>

  <Form.Group as={Row} className="form-group">
    <h2>Please choose your available class hours in your local time.</h2>
    <Form.Label>Please indicate your country of residence with states and city:</Form.Label>
    <Form.Control type="text" name="currentCity" placeholder="country / state / city" />
  </Form.Group>
  

  <Form.Group>
    <Form.Check 
      type="checkbox" 
      label="I agree to the terms and conditions" 
      id="termsCheckbox" 
      disabled />
  </Form.Group>

  <Button type="submit">Submit application</Button>


</Form>
    </Container>
  );
};

export default App;
