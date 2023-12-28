const express = require('express');
const router = express.Router();
const { User, Student, Teacher, StudentClass, ClassRoom } = require('../../models');

router.post('/saveModalData', async (req, res) => {
    try {
        console.log('Request body:', req.body); // 전체 요청 데이터 확인
        const { stuNo, pendingData, ZoomRegisteredData,dataToSend  } = req.body;

        console.log('Received stuNo:', stuNo); // 받은 학생 번호 확인
        console.log('Received pendingData:', pendingData); // 받은 pendingData 확인
        console.log('Received ZoomRegisteredData:', ZoomRegisteredData ); // 받은 zoomRegisteredData 확인
        console.log("에이 설마 :" , dataToSend);
        let timeDifference, meetingDate, Nickname, zoomMeetingDataMemo, teacher, selectedZoomLink;
 
        if (pendingData) {
            ({ timeDifference, meetingDate, teacher, selectedZoomLink } = pendingData);
            console.log('Processed pendingData:', { timeDifference, meetingDate, teacher, selectedZoomLink }); // 처리된 pendingData 확인
        }
        if (ZoomRegisteredData) {
            ({ Nickname, zoomMeetingDataMemo } = ZoomRegisteredData);
            console.log('Processed zoomRegisteredData:', { Nickname, zoomMeetingDataMemo }); // 처리된 zoomRegisteredData 확인
        }

        const existingStudent = await Student.findOne({ where: { stuNo: stuNo } });
        console.log('Found existingStudent:', existingStudent); // 찾은 existingStudent 확인

        let existingStudentClass = await StudentClass.findOne({ where: { stuNo: stuNo } });
        console.log('Found existingStudentClass:', existingStudentClass); // 찾은 existingStudentClass 확인
       
        if (existingStudentClass) {
            const updateData = {};
            if (pendingData) {
                updateData.zoomMeetingTeacher = teacher;
                updateData.zoomMeetingLink = selectedZoomLink;
                updateData.timeDifference = timeDifference;
                updateData.zoomMeetingData = meetingDate;
            } else if (ZoomRegisteredData ) {
            
                const { Nickname, ...zoomClassData } = ZoomRegisteredData;
                updateData.zoomMeetingDataMemo = zoomClassData.zoomMeetingDataMemo;
        
                // Student 모델 업데이트
                if (existingStudent) {
                    await existingStudent.update({ Nickname: Nickname });
                    console.log('Existing student updated with Nickname:', Nickname); // existingStudent 업데이트 성공 로그
                }
            }
        
            await existingStudentClass.update(updateData);
            console.log('StudentClass 정보 업데이트 성공', updateData); // 업데이트 성공 및 업데이트된 데이터 확인
        } else {
            // 새 StudentClass 생성
            const createData = {
                stuNo: stuNo,
                ...pendingData,
                ...ZoomRegisteredData
            };
            await StudentClass.create(createData);
            console.log('StudentClass 정보 생성 성공', createData); // 생성 성공 및 생성된 데이터 확인
        }
         // 기타 필요한 업데이트 로직
       if (pendingData) {
        // 예: 학생 상태 업데이트
        await existingStudent.update({ StudentState: '1' });
        }
        else if(ZoomRegisteredData)
        {
            await existingStudent.update({ StudentState: '2' });
        }
        res.status(201).json({ message: 'Data saved successfully' });
    } catch (error) {
        console.error('Error while saving modal data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;
