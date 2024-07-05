import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import StudentDetails from './components/StudentDetails';


function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path = "/" element = {<StudentList />} />
        <Route path = "/add" element = {<StudentForm />}/>
        <Route path = "/edit/:id" element = {<StudentForm /> }/>
        <Route path = "/details/:id" element = {<StudentDetails /> } />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
