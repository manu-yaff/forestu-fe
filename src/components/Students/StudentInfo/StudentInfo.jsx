import { useParams } from 'react-router-dom';
import { API_HOST } from '../../../App';
import { useEffect, useState } from 'react';
import style from './StudentInfo.module.css';

const StudentInfo = () => {
  const { studentId, groupId } = useParams();
  const [student, setStudent] = useState({});
  const [loading, setLoading] = useState(false);

  async function getStudentInfo() {
    const response = await fetch(`${API_HOST}/students/${studentId}`);
    const { data } = await response.json();
    const studentInfo = data.student.student;

    const responsePeriods = await fetch(`${API_HOST}/students/${studentId}/periods`);
    const studentPeriodsJson = await responsePeriods.json();
    const studentPeriods = studentPeriodsJson.data.periods;

    const studentIndicatorsResponse = await fetch(`${API_HOST}/students/${studentId}/faults`);
    const jsonStudentIndicators = await studentIndicatorsResponse.json();
    const studentIndicators = jsonStudentIndicators.data.faults_by_indicator;

    return { ...studentInfo, periods: studentPeriods, indicators: studentIndicators };
  }

  async function handleAddFault(indicator) {
    setLoading(true);
    const payload = {
      indicator,
      group_id: +groupId,
      date: new Date().toISOString().slice(0, 10),
    };

    const response = await fetch(`${API_HOST}/students/${student.id}/faults`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const result = await getStudentInfo();
    setStudent(result);
    setLoading(false);
  }

  useEffect(() => {
    (async () => {
      const result = await getStudentInfo();
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
                  {Object.entries(student.indicators).map(
                    ([indicator, { numberFaults, faults }]) => (
                      <tr key={indicator} className={style['indicator']}>
                        <td>{indicator}</td>
                        <td>{numberFaults}</td>
                        <td>
                          <div
                            style={{
                              width: '50%',
                              height: '50%',
                              backgroundColor:
                                numberFaults >= 3 ? 'red' : numberFaults > 0 ? '#fcba03' : 'green',
                            }}
                          ></div>
                        </td>
                        <td>
                          <button onClick={() => handleAddFault(indicator)}>+</button>
                        </td>
                      </tr>
                    )
                  )}
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
