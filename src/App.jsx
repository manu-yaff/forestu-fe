import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { TeacherGroups } from './components/TeacherGroups';
import { StudentsList } from './components/StudentsList';

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
    path: 'teacher/students/:id',
    element: <div>here goes the view of a student for the teacher</div>,
  },
  {
    path: 'manager/groups/:id/students',
    element: <div>here goes the manager page groups</div>,
  },
  {
    path: 'manager/students/:id',
    element: <div>here goes the view of a student for the manager</div>,
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
