import React, { useEffect, useState } from "react";

const StudentRules = () => {
  const [isAgreeable, setIsAgreeable] = useState(false);

  const handleScroll = (e) => {
    const element = e.target;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      setIsAgreeable(true);
    }
  };

  const handleClick = () => {
    // 동의 버튼 클릭시 처리
  };

  useEffect(() => {
    // 여기에 로딩이나 API 호출 같은거 처리
  }, []);

  return (
    <div>
      <h1>STUDENT RULES</h1>
      <div id="scrollBox" onScroll={handleScroll}>
        {/* 이곳에 규칙 내용 */}
      </div>
      <button id="agreeButton" onClick={handleClick} disabled={!isAgreeable}>
        동의합니다
      </button>
    </div>
  );
};

export default StudentRules;