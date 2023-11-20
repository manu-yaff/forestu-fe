import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>hello world</div>,
  },
  {
    path: 'teacher/groups',
    element: <div>here goes the teachers page groups</div>,
  },
  {
    path: 'teacher/groups/:id/students',
    element: <div>here goes the list of students</div>,
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
