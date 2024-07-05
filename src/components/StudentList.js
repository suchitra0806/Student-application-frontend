import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/students')
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        setError('There was an error fetching the students!');
      });
  }, []);

  return (
    <div>
      <h2>Student List</h2>
      <Link to="/add">Add New Student</Link>
      <ul>
        {students.map(student => (
          <li key={student.id}>
            <Link to={`/details/${student.id}`}>{student.first_name} {student.last_name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
