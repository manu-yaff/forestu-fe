import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export const StudentsList = () => {
  const [students, setStudents] = useState([]);
  const { id } = useParams();

  async function fetchTeacherGroups() {
    const response = await fetch(
      `https://forestu-manuels-projects-c65674bc.vercel.app/groups/${id}/students`
    );
    const jsonResponse = await response.json();
    return jsonResponse;
  }

  useEffect(() => {
    (async () => {
      const { data } = await fetchTeacherGroups();
      setStudents(data);
    })();
  }, []);

  return (
    <ul>
      {students.map((student) => (
        <Link to={`/teacher/students/${student.id}`} key={student.id}>
          {student.name}
        </Link>
      ))}
    </ul>
  );
};
