import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import style from './TeacherGroups.module.css';

export const TeacherGroups = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchTeacherGroups() {
    const response = await fetch('https://forestu-manuels-projects-c65674bc.vercel.app/groups');
    const jsonResponse = await response.json();
    return jsonResponse;
  }

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await fetchTeacherGroups();
      setGroups(data);
      console.log(data);
      setLoading(false);
    })();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className={style.container}>
      <div className={style['sub-container']}>
        <h2>Bienvenido maestro, Juan</h2>
        <p>Lista de grupos</p>
        <ul className={style['group-list']}>
          {groups.map((group, idx) => (
            <Link
              to={`${group.id}/students`}
              key={idx}
              className={style['group-item']}
            >{`${group.level} - ${group.subject}`}</Link>
          ))}
        </ul>
      </div>
    </div>
  );
};
