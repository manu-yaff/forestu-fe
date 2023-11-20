import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const TeacherGroups = () => {
  const [groups, setGroups] = useState([]);
  const test = [1, 2, 3, 4, 5, 6];

  async function fetchTeacherGroups() {
    const response = await fetch('https://forestu-manuels-projects-c65674bc.vercel.app/groups');
    const jsonResponse = await response.json();
    return jsonResponse;
  }

  useEffect(() => {
    (async () => {
      const { data } = await fetchTeacherGroups();
      setGroups(data);
      console.log(data);
    })();
  }, []);

  return (
    <ul>
      {groups.map((group, idx) => (
        <Link to={`${group.id}/students`} key={idx}>{`${group.level} - ${group.subject}`}</Link>
      ))}
    </ul>
  );
};
