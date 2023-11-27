const express = require('express');
const router = express.Router();
const { User, Student, Teacher, StudentClass, ClassRoom } = require('../../models');

router.post('/saveModalData', async (req, res) => {
    try {
       const { stuNo, pendingData } = req.body;

       let timeDifference, meetingDate, teacher, selectedZoomLink;

       if (pendingData) {
            ({ timeDifference, meetingDate, teacher, selectedZoomLink } = pendingData);
       }

       const existingStudent = await Student.findOne({
           where: { stuNo: stuNo }
       });

       let existingStudentClass = await StudentClass.findOne({
           where: { stuNo: stuNo }
       });

       // StudentClass 데이터가 없으면 새로 생성
       if (!existingStudentClass && pendingData) {
           existingStudentClass = await StudentClass.create({
               stuNo: stuNo,
               zoomMeetingTeacher: teacher,
               zoomMeetingLink: selectedZoomLink,
               timeDifference: timeDifference,
               zoomMeetingData: meetingDate,
               // 추가 필드가 있으면 여기에 추가
           });
           console.log('StudentClass 정보 생성 성공');
       } else if (existingStudentClass && pendingData) {
           // 이미 존재하는 StudentClass 데이터 업데이트
           await existingStudentClass.update({
               zoomMeetingTeacher: teacher,
               zoomMeetingLink: selectedZoomLink,
               timeDifference: timeDifference,
               zoomMeetingData: meetingDate,
               // 추가 필드가 있으면 여기에 추가
           });
           console.log('StudentClass 정보 업데이트 성공');
       }

       // 기타 필요한 업데이트 로직
       if (existingStudent) {
           // 예: 학생 상태 업데이트
           await existingStudent.update({ StudentState: '1' });
       }

       res.status(201).json({ message: 'Data saved successfully' });
    } catch (error) {
        console.error('Error while saving modal data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
