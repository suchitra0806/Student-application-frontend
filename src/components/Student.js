import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Container, Paper } from '@mui/material';

export default function Student() {
const paperStyle = {padding: '50px 20px', width:500, margin:'20px auto'}
const [name, setName] = useState('')
const[address, setAddress] = useState('')
const[students, setStudents] = useState('')

const handleClick = (e) => {
    e.preventDefault()
    const student = {name, address}
    console.log(student)
    fetch("http://localhost:8080/student/add", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(student)
    }).then(() => {
        console.log("New student added")
    }) 
}

useEffect(() => {
    fetch("http://localhost:8080/student/getAll")
    .then(res => res.json())
    .then((result) => {
        setStudents(result)
    })
}, [])
  return (
    
    <Container>
        <Paper elevation={3} style={paperStyle}>
            <h1>Add Student</h1>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1},
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Student name" variant="outlined" fullWidth value={name} onChange={(e)=>setName(e.target.value)}/>
      <TextField id="outlined-basic" label="Student address" variant="outlined" fullWidth value={address} onChange={(e)=>setAddress(e.target.value)}/>
      <Button variant='contained' color='secondary' onClick={handleClick}>Submit</Button>
    </Box>
    </Paper>
    </Container>
  );
}
