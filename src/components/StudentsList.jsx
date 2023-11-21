import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export const StudentsList = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const { id } = useParams();

  async function fetchTeacherGroups() {
    const response = await fetch(
      `https://forestu-manuels-projects-c65674bc.vercel.app/groups/${id}/students`
    );
    const jsonResponse = await response.json();
    return jsonResponse;
  }

  function filterStudents(event) {
    console.log(event.target.value);
    const filteredStudents = students.filter((student) =>
      student.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    console.log(filteredStudents);
    setFilteredStudents(filteredStudents);
  }

  useEffect(() => {
    (async () => {
      const { data } = await fetchTeacherGroups();
      setStudents(data);
      setFilteredStudents(data);
    })();
  }, []);

  return (
    <>
      <h2>Grupo: {}</h2>
      <h3>Buscar por nombre / apellido</h3>

      <h3>Lista de alumnos</h3>
      <input onChange={(event) => filterStudents(event)} />
      <ul>
        {filteredStudents.map((student) => (
          <Link to={`/teacher/students/${student.id}`} key={student.id}>
            {student.name}
          </Link>
        ))}
      </ul>
    </>
  );
};
