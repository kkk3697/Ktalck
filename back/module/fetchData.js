//페이지,더보기 공통 모듈


const { ClassRoom,TeacherClass,Teacher,Studnet,User} = require('../models');


async function fetchData(table, queryOptions) {
  const { limit, offset } = queryOptions;

  let count, rows, totalPages;

  switch (table) {
    case 'class':
      ({ count, rows } = await ClassRoom.findAndCountAll({
        limit,
        offset,
        include: [{
          model: TeacherClass,
          include: [{
            model: Teacher,
            include: [{
              model: User // Teacher와 연결된 User 정보를 포함
            }]
          }]
        }]
      }));

      const classListWithTeacherInfo = rows.map(classData => {
        const classDataValues = classData.dataValues;
  
        let teacherNames = [];
        let zoomURLs = [];
        const teacherClass = classDataValues.TeacherClass;
        if (teacherClass && teacherClass.Teacher) {
          const teacher = teacherClass.Teacher;
          teacherNames.push(teacher.User && teacher.User.username ? teacher.User.username : '선생님 정보 없음');
          zoomURLs.push(teacher.zoomMeetingLink || '');
        }

        return {
          ...classDataValues,
          teacherNames,
          zoomURLs
        };
      });
      
      totalPages = Math.ceil(count / limit);
      return { classes: classListWithTeacherInfo, totalPages };


    case 'board':
      // Board 테이블에서 데이터를 불러오는 로직
      // return { ... };
    case 'teacher':
      // Teacher 테이블에서 데이터를 불러오는 로직
      // return { ... };
    case 'student':
      // Student 테이블에서 데이터를 불러오는 로직
      // return { ... };
    default:
      throw new Error('Invalid table name');
  }
}

module.exports = {
  fetchData,
};