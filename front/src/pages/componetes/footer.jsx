import React from 'react';

import '../style/footer.css'; // 스타일 파일을 적용하기 위해 필요한 CSS 파일을 import합니다.
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></link>


function Footer() {
  return (
    <footer className="footer">
       <div className="footer-sns">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <i className="fa fa-facebook"></i>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <i className="fa fa-twitter"></i>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <i className="fa fa-instagram"></i>
        </a>
        <a href="https://your-camera-site.com" target="_blank" rel="noopener noreferrer">
          <i className="fa fa-camera"></i>
        </a>
      </div>
      <div className="footer-inner">
        <div className="footer-content">
          <div className="footer-text">
            <span className="bold-white">K-TALK</span><span className="light-white"> LIVE</span><br/>
            Powered by jeju Korean Language Center<br/><br/>
            Original page:jejuklc.com<br/>
            More Information:jklc.ktalk@gmail.com
            📧<br/><br/>
            Copyright 2021. Ktalklive inc. all rights reserved.<br/>
            By K-talk Live Co.. Ltd
          </div>
          
          <div className="footer-logo">
            <img src="/path/to/your/logo.png" alt="Logo" />
          </div>
        </div>
        <div className="footer-sns">
        <i className="fa fa-camera"></i> 
        </div>
      </div>
    </footer>
  );
}

export default Footer;