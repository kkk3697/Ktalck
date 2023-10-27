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
                where: {
                  stuNo: stuNo
                }
              });
            const existingStudentClass = await StudentClass.findOne({
            where: {
                stuNo: stuNo
            }
        });
        if (existingStudentClass) {
            const updateData = {};
            
            if (pendingData) {
                // pendingData가 있을 경우에만 이 부분 실행
                updateData.timeDifference = timeDifference;
                updateData.zoomMeetingData = meetingDate;
                updateData.zoomMeetingTeacher = teacher;
                updateData.zoomMeetingLink = selectedZoomLink;

                await existingStudent.update({ StudentState: '1' });

            } else {
                // pendingData가 없는 경우에는 다른 로직을 넣거나,
                // 필요한 정보만 updateData에 추가
            }
            
            await existingStudentClass.update(updateData);
            console.log('Update 성공');
            res.status(201).json({ message: 'Data updated successfully' });
        } else {
            console.log('해당 학생 번호에 대한 StudentClass 데이터가 없습니다.');
            res.status(404).json({ message: 'StudentClass not found' });
        }
    } catch (error) {
        console.error('Error while saving modal data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
