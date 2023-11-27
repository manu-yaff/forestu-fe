import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import style from './ManagerGroups.module.css';
import { API_HOST } from '../../App';

export const ManagerGroups = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchTeacherGroups() {
    const response = await fetch(`${API_HOST}/groups?include_status=true`);
    const jsonResponse = await response.json();
    return jsonResponse;
  }

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await fetchTeacherGroups();
      console.log(data.groups);
      setGroups(data.groups);
      setLoading(false);
    })();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Bienvenido directivo, Salvador</h2>
      <p>Lista de grupos</p>
      <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {groups.map((group, idx) => (
          <Link to={`${group.id}/students`} key={idx} className={style['group-item']}>
            <p>
              {group.level} {group.subject}
            </p>
            <div className={style['status-container']}>
              <div
                style={{
                  backgroundColor: 'red',
                  color: 'white',
                  padding: '0 1rem',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                }}
              >
                {group.red}
              </div>
              <div
                style={{
                  backgroundColor: '#fcba03',
                  color: 'white',
                  padding: '0 1rem',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                }}
              >
                {group.yellow}
              </div>
              <div
                style={{
                  backgroundColor: 'green',
                  color: 'white',
                  padding: '0 1rem',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                }}
              >
                {group.green}
              </div>
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
};
