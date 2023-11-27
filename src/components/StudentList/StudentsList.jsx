import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import style from './StudentsList.module.css';
import { API_HOST } from '../../App';

export const StudentsList = () => {
  const [loading, setLoading] = useState(false);
  const [group, setGroup] = useState();
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const { id } = useParams();

  async function fetchTeacherGroups() {
    const response = await fetch(`${API_HOST}/groups/${id}/students`);
    const jsonResponse = await response.json();
    return jsonResponse;
  }

  function filterStudents(event) {
    const filteredStudents = students.filter((student) =>
      student.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredStudents(filteredStudents);
  }

  useEffect(() => {
    (async () => {
      setLoading(true);

      const { data } = await fetchTeacherGroups();

      setStudents(data.students);
      setGroup(data.group);
      console.log(data.group.level);
      setFilteredStudents(data.students);

      setLoading(false);
    })();
  }, []);

  if (loading) return <h2>Loading...</h2>;

  return (
    <>
      {group && (
        <>
          <h2>Grupo: {`${group.level} - ${group.subject}`}</h2>
          <h3>Buscar por nombre / apellido</h3>

          <input onChange={(event) => filterStudents(event)} />
          <h3>Lista de alumnos</h3>
          <ul>
            {filteredStudents.map((student) => (
              <Link to={`/teacher/groups/${group.id}/students/${student.id}`} key={student.id}>
                {student.name}
              </Link>
            ))}
          </ul>
        </>
      )}
    </>
  );
};
