import React from 'react';
import { Route, Routes } from 'react-router-dom';

import ClassManagement from './ClassManagement/ClassManagement';
import StudentManagement from './StudentManagme/StudentManagement';
import PaymentManagement from './PaymentManagement';
import TeacherManagement from './TeacherManagement';
import BoardManagement from './BoardManagement';
import BookManagement from './BookManagement';
import ReviewManagement from './ReviewManagement';
import TeacherIntroduction from './TeacherIntroduction';


const Admin = () => {
  return (
    <div>     
      <Routes>
        <Route index element={<ClassManagement />} />
        <Route path="class-management" element={<ClassManagement />} />
        <Route path="student-management" element={<StudentManagement />} />
        <Route path="payment-management" element={<PaymentManagement />} />
        <Route path="teacher-management" element={<TeacherManagement />} />
        <Route path="board-management" element={<BoardManagement />} />
        <Route path="book-management" element={<BookManagement />} />
        <Route path="review-management" element={<ReviewManagement />} />
        <Route path="teacher-introduction" element={<TeacherIntroduction />} />
      </Routes>
    </div>
  );
};

export default Admin;
