import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { API_HOST } from '../../App';

export const StudentListManager = () => {
  const [loading, setLoading] = useState(false);
  const [group, setGroup] = useState();
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  async function fetchTeacherGroups() {
    const response = await fetch(`${API_HOST}/groups/${id}/students?include_faults=true`);
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
          <table>
            <tbody>
              <tr>
                <th>Alumno</th>
                <th>Número de faltas</th>
                <th>Semáforo</th>
              </tr>
              {filteredStudents.map((student) => (
                <tr
                  style={{ cursor: 'pointer' }}
                  key={student.id}
                  onClick={() => navigate(`/manager/students/${student.id}`)}
                >
                  <td>{student.name}</td>
                  <td>{student.faults.length}</td>
                  <td>
                    <div
                      style={{
                        borderRadius: '50%',
                        width: '2rem',
                        height: '2rem',
                        backgroundColor:
                          student.status === 'yellow'
                            ? '#fcba03'
                            : student.status === 'red'
                            ? 'red'
                            : 'green',
                      }}
                    ></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};
