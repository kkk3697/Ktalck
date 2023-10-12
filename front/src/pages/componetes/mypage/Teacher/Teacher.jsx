import React from 'react';
import { Route, Routes } from 'react-router-dom';

import TeacherMain from './TeacherMain';
import LectureFee from './LectureFee';
import Availability from './Availability';
import TeacherBookManagement from './TeacherBookManagement';
import ResourceRoom from './ResourceRoom';

const Teacher = () => {
  return (
    <div>      
      
      <Routes>
        <Route index element={<TeacherMain />} />
        <Route path="teacher-main" element={<TeacherMain />} />
        <Route path="lecture-fee" element={<LectureFee />} />
        <Route path="availability" element={<Availability />} />
        <Route path="book-management" element={<TeacherBookManagement />} />
        <Route path="resource-room" element={<ResourceRoom />} />
      </Routes>
    </div>
  );
};

export default Teacher;
