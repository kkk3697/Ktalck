
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
        <th>시차</th>
        <th>줌미팅 날짜</th>
        <th>담당 선생님</th>
        <th>이메일</th>
        <th>생년월일</th>
        <th>국적</th>
        <th>거주도시</th>
        <th>등록 상황</th> 
        <th>메모</th>
        </tr>
      </>);
     case 2: return (<>
      <tr> 
       <th>신청일시</th>
       <th>이름</th>
       <th>애칭</th>
       <th>이메일</th>
       <th>생년월일</th>
       <th>국적</th>
       <th>거주도시</th>
       <th>등록 상황</th> 
       <th>메모</th>
       </tr>
     </>);
     case 3: return (<>
      <tr> 
       <th>신청일시</th>
       <th>이름</th>
       <th>애칭</th>
       <th>이메일</th>
       <th>생년월일</th>
       <th>국적</th>
       <th>거주도시</th>
       <th>등록 상황</th> 
       <th>메모</th>
       </tr>
     </>);
     case 4: return (<>
      <tr> 
       <th>신청일시</th>
       <th>이름</th>
       <th>애칭</th>
       <th>이메일</th>
       <th>생년월일</th>
       <th>국적</th>
       <th>거주도시</th>
       <th>등록 상황</th> 
       <th>메모</th>
       </tr>
     </>);
      default: return null;
    }
  }

  export default TableHeader;