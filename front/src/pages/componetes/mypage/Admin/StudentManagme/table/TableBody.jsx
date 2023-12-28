 

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR').split('.').slice(0, 3).join('-').trim(); // 'YYYY-MM-DD' 형식으로 변환
  }
  function formatDates(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR', {
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit'
    }).replace(/\.\s/g, '-').split(':').slice(0, 2).join(':').trim(); // 'YYYY-MM-DD 시:분' 형식으로 변환
  }
  const onShowMemo = (student) => {
 
  };

  const TableBody = ({ status, students, onShowModal }) => {

    const filteredStudents = students.filter(student => student.StudentState === status);

    switch (status) {
      case 0: return (<>
        {filteredStudents.map((student, index) => (  
          <tr key={index}>
            <td>{formatDate(student.createdAt)}</td>
            <td onClick={() => onShowModal(student)}>{student.User.username}</td>
            <td onClick={() => onShowModal(student)}>{student.User.email}</td>
            <td>{student.User.birth}</td>
            <td>{student.User.Nationality}</td>
            <td>{student.User.currentCity}</td>
            <td>{
              student.StudentState === 0 ? "잠정 가입" :
              student.StudentState === 1 ? "줌미팅 등록 상태" :
              student.StudentState === 2 ? "줌미팅 후 상태" :
              student.StudentState === 3 ? "재학생" :
              student.StudentState === 4 ? "휴학생" : "알 수 없는 상태"
            }</td>
            <td><button className="btn btn-secondary">메모</button></td>

          </tr>
        ))}
      </>);
      case 1: return (<>
        {filteredStudents.map((student, index) => (  
          <tr key={index}>
            <td>{formatDate(student.createdAt)}</td>
            <td onClick={() => onShowModal(student)}>{student.User.username}</td>
           <td> {student.StudentClasses[0]?.zoomMeetingData ? formatDates(student.StudentClasses[0].zoomMeetingData) : '정보 없음'}</td> 
            <td onClick={() => onShowModal(student)}>{student.StudentClasses[0]?.Teacher?.User?.username || '선생님 정보 없음'}</td>
            <td>{student.User.Nationality}</td>
            <td>{student.StudentClasses[0]?.timeDifference || '정보 없음'}</td>
            <td>{student.User.currentCity}</td>
            
            <td>{
              student.StudentState === 0 ? "잠정 가입" :
              student.StudentState === 1 ? "줌미팅 등록 상태" :
              student.StudentState === 2 ? "줌미팅 후 상태" :
              student.StudentState === 3 ? "재학생" :
              student.StudentState === 4 ? "휴학생" : "알 수 없는 상태"
            }</td>
            <td><button className="btn btn-secondary">메모</button></td>

          </tr>
        ))}
      </>);
      case 2: return (<>
        {filteredStudents.map((student, index) => (  
          <tr key={index}>
            <td>{formatDate(student.createdAt)}</td>
            <td onClick={() => onShowModal(student)}>{student.User.username}</td>
            <td onClick={() => onShowModal(student)}>{student.Nickname}</td>
            <td onClick={() => onShowModal(student)}>{student.User.email}</td>
            <td>{student.User.birth}</td>
            <td>{student.User.Nationality}</td>
            <td>{student.User.currentCity}</td>
            <td>{student.zoomMeetingMemo || '없음'}</td> {/* 줌 미팅 메모 */}

            <td>{
              student.StudentState === 0 ? "잠정 가입" :
              student.StudentState === 1 ? "줌미팅 등록 상태" :
              student.StudentState === 2 ? "줌미팅 후 상태" :
              student.StudentState === 3 ? "재학생" :
              student.StudentState === 4 ? "휴학생" : "알 수 없는 상태"
            }</td>
           <td>{student.zoomMeetingTeacher?.name || '없음'}</td> {/* 줌 미팅 담당 선생님 */}
            <td>{student.timeDifference || '없음'}</td> {/* 시차 */}


          </tr>
        ))}
      </>);
      case 3: return (<>
        {filteredStudents.map((student, index) => (  
          <tr key={index}>
            <td>{formatDate(student.createdAt)}</td>
            <td onClick={() => onShowModal(student)}>{student.User.username}</td>
            <td onClick={() => onShowModal(student)}>{student.Nickname}</td>
            <td onClick={() => onShowModal(student)}>{student.User.email}</td>
            <td>{student.User.birth}</td>
            <td>{student.User.Nationality}</td>
            <td>{student.User.currentCity}</td>
            <td>{
              student.StudentState === 0 ? "잠정 가입" :
              student.StudentState === 1 ? "줌미팅 등록 상태" :
              student.StudentState === 2 ? "줌미팅 후 상태" :
              student.StudentState === 3 ? "재학생" :
              student.StudentState === 4 ? "휴학생" : "알 수 없는 상태"
            }</td>
            <td><button className="btn btn-secondary">메모</button></td>

          </tr>
        ))}
      </>);
      case 4: return (<>
        {filteredStudents.map((student, index) => (  
          <tr key={index}>
            <td>{formatDate(student.createdAt)}</td>
            <td onClick={() => onShowModal(student)}>{student.User.username}</td>
            <td onClick={() => onShowModal(student)}>{student.Nickname}</td>
            <td onClick={() => onShowModal(student)}>{student.User.email}</td>
            <td>{student.User.birth}</td>
            <td>{student.User.Nationality}</td>
            <td>{student.User.currentCity}</td>
            <td>{
              student.StudentState === 0 ? "잠정 가입" :
              student.StudentState === 1 ? "줌미팅 등록 상태" :
              student.StudentState === 2 ? "줌미팅 후 상태" :
              student.StudentState === 3 ? "재학생" :
              student.StudentState === 4 ? "휴학생" : "알 수 없는 상태"
            }</td>
            <td><button className="btn btn-secondary">메모</button></td>

          </tr>
        ))}
      </>);
    
      default: return null;
    }
  }

  export default TableBody;