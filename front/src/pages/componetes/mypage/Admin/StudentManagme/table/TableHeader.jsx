
function TableHeader({ status }) {
    switch (status) {
      case 0: return (
        <>
      <tr>
        <th>신청일시</th>
        <th>이름</th>
        <th>이메일</th>
        <th>생년월일</th>
        <th>국적</th>
        <th>거주도시</th>
        <th>등록 상황</th> 
        <th>메모</th>
      </tr>
      </>
    );
      case 1: return (<>
       <tr> 
        <th>신청일시</th>
        <th>이름</th>
        <th>줌미팅 예정 날짜</th>
        <th>담당 선생님</th>
        <th>국적</th>
        <th>시차</th>
        <th>거주도시</th>
        <th>등록 상황</th> 
        <th>메모</th>
        </tr>
      </>);
     // 케이스 2: 줌미팅 완료
    case 2: 
    return (
      <>
        <tr>
          <th>신청일시</th>
          <th>이름</th>
          <th>애칭</th>
          <th>이메일</th>
          <th>생년월일</th>
          <th>국적</th>
          <th>거주도시</th>
          <th>줌미팅 후기</th>
          <th>등록 상황</th> 
          <th>시차</th>
          <th>줌미팅 담당 선생님</th>
        </tr>
      </>
    );

  // 케이스 3: 재학 학생
  case 3: 
    return (
      <>
        <tr>
            <th>신청일시</th>
            <th>이름</th>
            <th>애칭</th>
            <th>이메일</th>
            <th>생년월일</th>
            <th>국적</th>
            <th>거주도시</th>
            <th>출석 정보</th>
            <th>등록 상황</th> 
            <th>메모</th>
          </tr>
      </>
    );

  // 케이스 4: 휴학 학생
  case 4: 
    return (
      <>
        <tr>
          <th>신청일시</th>
          <th>이름</th>
          <th>애칭</th>
          <th>이메일</th>
          <th>생년월일</th>
          <th>국적</th>
          <th>거주도시</th>
          <th>휴학 시작일</th>
          <th>예상 복학일</th>
          <th>등록 상황</th> 
          <th>메모</th>
        </tr>
      </>
    );

  default: 
    return null;
}
}

export default TableHeader;