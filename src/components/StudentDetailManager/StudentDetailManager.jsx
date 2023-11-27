import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { API_HOST } from '../../App';
import style from './StudentDetailManager.module.css';

const StudentDetailManager = () => {
  const { id } = useParams();
  const [student, setStudent] = useState({});
  const [loading, setLoading] = useState(false);

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

    const fetchGroup = async (groupId) => {
      const response = await fetch(`${API_HOST}/groups/${groupId}`);
      const { data } = await response.json();
      return data.group;
    };

    const studentIndicatorsWithGroups = await Promise.all(
      Object.entries(studentIndicators).map(async ([indicator, value]) => {
        const faultsWithGroups = await Promise.all(
          value.faults.map(async (fault) => {
            const group = await fetchGroup(fault.group_id);
            return {
              ...fault,
              group,
            };
          })
        );

        return [indicator, { ...value, faults: faultsWithGroups }];
      })
    );

    const studentIndicatorsWithGroupsObject = Object.fromEntries(studentIndicatorsWithGroups);

    return {
      ...studentInfo,
      periods: studentPeriods,
      indicators: studentIndicatorsWithGroupsObject,
    };
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
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p>Indicador</p>
                <p>Total de faltas</p>
              </div>
              {Object.entries(student.indicators).map(([indicator, value], index) => (
                <div key={indicator}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      border: '1px solid black',
                      padding: '0.5rem',
                      margin: '10px',
                    }}
                  >
                    <p>{indicator}</p>
                    <p>{value.numberFaults}</p>
                  </div>
                  {value.faults.map((fault) => (
                    <div
                      key={fault.date}
                      style={{ display: 'flex', justifyContent: 'space-between', padding: '2rem' }}
                    >
                      <p>{fault.date}</p>
                      <p>
                        {fault.group.level} {fault.group.subject}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </>
          )}
        </>
      )}
    </>
  );
};

export default StudentDetailManager;
