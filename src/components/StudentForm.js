import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const StudentForm = () => {
  const [student, setStudent] = useState({
    first_name: '',
    last_name: '',
    email: '',
    dob: '',
    mobile: '',
    age: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`/api/students/${id}`)
        .then(response => {
          setStudent(response.data);
        })
        .catch(error => {
          setError('There was an error fetching the student!');
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handlePhoneChange = (value) => {
    setStudent({ ...student, mobile: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      axios.put(`/api/students/${id}`, student)
        .then(() => {
          navigate('/');
        })
        .catch(error => {
          setError('There was an error updating the student!');
        });
    } else {
      axios.post('/api/students', student)
        .then(() => {
          navigate('/');
        })
        .catch(error => {
          setError('There was an error creating the student!');
        });
    }
  };

  return (
    <div>
      <h2>{id ? 'Edit Student' : 'Add Student'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input type="text" name="first_name" value={student.first_name} onChange={handleChange} />
        </div>
        <div>
          <label>Last Name</label>
          <input type="text" name="last_name" value={student.last_name} onChange={handleChange} />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={student.email} onChange={handleChange} />
        </div>
        <div>
          <label>Date of Birth</label>
          <input type="date" name="dob" value={student.dob} onChange={handleChange} />
        </div>
        <div>
          <label>Mobile</label>
          <PhoneInput
            country={'India'}
            value={student.mobile}
            onChange={handlePhoneChange}
          />
        </div>
        <div>
          <label>Age</label>
          <input type="number" name="age" value={student.age} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default StudentForm;
