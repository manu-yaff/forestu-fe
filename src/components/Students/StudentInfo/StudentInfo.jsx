import { useParams } from 'react-router-dom';
import { API_HOST } from '../../../App';
import { useEffect, useState } from 'react';
import style from './StudentInfo.module.css';

const StudentInfo = () => {
  const { id } = useParams();
  const [student, setStudent] = useState({});

  async function getStudentInfo() {
    const response = await fetch(`${API_HOST}/students/${id}`);
    const { data } = await response.json();
    const studentInfo = data.student.student;

    const responsePeriods = await fetch(`${API_HOST}/students/${id}/periods`);
    const studentPeriodsJson = await responsePeriods.json();
    const studentPeriods = studentPeriodsJson.data.periods;

    const studentIndicatorsResponse = await fetch(`${API_HOST}/students/${id}/faults`);
    const jsonStudentIndicators = await studentIndicatorsResponse.json();
    const studentIndicators = jsonStudentIndicators.data.faults_by_indicator;

    return { ...studentInfo, periods: studentPeriods, indicators: studentIndicators };
  }

  useEffect(() => {
    (async () => {
      const result = await getStudentInfo();
      console.log(result);
      setStudent(result);
    })();
  }, []);

  return (
    <>
      {student && (
        <>
          <h3>Información del alumno</h3>
          <div className={style['student-info']}>
            <p>Name: {student.name}</p>
            <p>Nombre del padre/madre: {student.parent_name}</p>
            <p>Teléfono de contacto: {student.phone_number}</p>
            <p>Dirección: {student.address}</p>
          </div>

          {student.periods && (
            <>
              <h3>Periodos de evaluación</h3>
              <div className={style['periods']}>
                {student.periods.map((period) => (
                  <div key={period.id}>
                    <p>Evaluación periodo {period.name}</p>
                    <p className={style['period-box']}>{period.grade}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {student.indicators && (
            <>
              <h3>Indicadores de rezago</h3>
              <table>
                <tbody>
                  <tr>
                    <th>Indicador</th>
                    <th>No. Faltas</th>
                    <th>Semáforo</th>
                    <th>Agregar</th>
                  </tr>
                  {Object.entries(student.indicators).map(([key, value]) => (
                    <tr key={key} className={style['indicator']}>
                      <td>{key}</td>
                      <td>{value}</td>
                      <td>
                        <div
                          style={{
                            width: '50%',
                            height: '50%',
                            backgroundColor: value >= 3 ? 'red' : value > 0 ? 'yellow' : 'green',
                          }}
                        ></div>
                      </td>
                      <td>
                        <button>+</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </>
      )}
    </>
  );
};

export default StudentInfo;
