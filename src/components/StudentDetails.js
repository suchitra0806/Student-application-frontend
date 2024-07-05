import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const StudentDetails = () => {
  const [student, setStudent] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/api/students/${id}`)
      .then(response => {
        setStudent(response.data);
      })
      .catch(error => {
        setError('There was an error fetching the student details!');
      });
  }, [id]);

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Student Details</h2>
      {error && <p className="error">{error}</p>}
      <p>First Name: {student.first_name}</p>
      <p>Last Name: {student.last_name}</p>
      <p>Email: {student.email}</p>
      <p>Date of Birth: {student.dob}</p>
      <p>Mobile: {student.mobile}</p>
      <p>Age: {student.age}</p>
      <Link to={`/edit/${student.id}`}>Edit</Link>
    </div>
  );
};

export default StudentDetails;
