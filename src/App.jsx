import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { TeacherGroups } from './components/TeacherGroups/TeacherGroups';
import { StudentsList } from './components/StudentList/StudentsList';
import StudentInfo from './components/Students/StudentInfo/StudentInfo';
import { ManagerGroups } from './components/ManagerGroups/ManagerGroups';
import { StudentListManager } from './components/StudentListManager/StudentsListManager';
import StudentDetailManager from './components/StudentDetailManager/StudentDetailManager';

// export const API_HOST = 'http://localhost:3000';
export const API_HOST = 'https://forestu-manuels-projects-c65674bc.vercel.app';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>hello world</div>,
  },
  {
    path: 'teacher/groups',
    element: <TeacherGroups />,
  },
  {
    path: 'teacher/groups/:id/students',
    element: <StudentsList />,
  },
  {
    path: 'teacher/groups/:groupId/students/:studentId',
    element: <StudentInfo />,
  },
  {
    path: 'manager/groups',
    element: <ManagerGroups />,
  },
  {
    path: 'manager/groups/:id/students',
    element: <StudentListManager />,
  },
  {
    path: 'manager/students/:id',
    element: <StudentDetailManager />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
