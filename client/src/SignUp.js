// import * as React from 'react';
import React, {useState,useEffect} from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navigate } from 'react-router-dom';
import axios from "axios";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Reddit
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const initialValues={fullName:"",userName:"",dob:"",email:"",phoneNumber:"",password:""}
  const [formValues,setFormValues]=useState(initialValues)
  const [formErrors,setFormErrors]=useState({})
  const [isSubmit,setIsSubmit]=useState(false)

  const handleChange=(e)=>{
    const {name,value}=e.target
    setFormValues({...formValues,[name]:value})
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
    setFormErrors(validate(formValues))
    setIsSubmit(true)
  }

  useEffect(()=>{
    async function check(){
      if(Object.keys(formErrors).length===0 && isSubmit){
        await axios.post("http://localhost:5000/api/user/register",{
          name:formValues.fullName,
          username:formValues.userName,
          dob:formValues.dob,
          password:formValues.password,
          email:formValues.email,
          phone_number:formValues.phoneNumber,
          //image:userImageReg
        }).then((response)=> {
          console.log(response)
        });
      }
    }
    check()
  },[formErrors])

  const validate=(values)=>{
    const errors={}
    const regex=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if(!values.fullName){
      errors.fullName="Full name is required"
    }

    if(!values.userName){
      errors.userName="Username is required"
    }

    if(!values.dob){
      errors.dob="Dob is required"
    }

    if(!values.password){
      errors.password="Password is required"
    }else if(values.password.length<4){
      errors.email="Password must be more than 4 characters"
    }else if(values.password.length>10){
      errors.email="Password cannot exceed more than 10 characters"
    }

    if(!values.email){
      errors.email="Email is required"
    }else if(!regex.test(values.email)){
      errors.email="Enter valid email"
    }

    if(!values.phoneNumber){
      errors.phoneNumber="Phone number is required"
    }else if(values.phoneNumber.length!==10){
      errors.phoneNumber="Enter correct number"
    }
    return errors
  }

  return (
    <ThemeProvider theme={theme}>
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <Navigate to="/signIn" replace={true} />
      ) : (
        ""
      )}
      {/* {Object.keys(formErrors).length === 0 && isSubmit &&(
      <Navigate to="/signIn" replace={true} />
      )} */}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="fullName"
                  required
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  autoFocus
                  value={formValues.fullName}
                  onChange={handleChange}
                />
                <Grid item>{formErrors.fullName}</Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="userName"
                  label="User_Name"
                  name="userName"
                  autoComplete="user-name"
                  value={formValues.userName}
                  onChange={handleChange}
                />
                <Grid item>{formErrors.userName}</Grid>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formValues.email}
                  onChange={handleChange}
                />
                <Grid item>{formErrors.email}</Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="dob"
                  type="date"
                  id="dob"
                  value={formValues.dob}
                  onChange={handleChange}
                />
                <Grid item>{formErrors.dob}</Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="phoneNumber"
                  label="Phone Number"
                  type="number"
                  id="phoneNumber"
                  autoComplete="phone-number"
                  value={formValues.phoneNumber}
                  onChange={handleChange}
                />
                <Grid item>{formErrors.phoneNumber}</Grid>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formValues.password}
                  onChange={handleChange}
                  // onChange={(e)=>{
                  //   setPassword(e.target.value)
                  // }}
                />
                <Grid item>{formErrors.password}</Grid>
              </Grid>
              <Grid item xs={5}>
                <Button
                  type="file"
                  variant="contained"
                  sx={{ mt: -1 }}
                >
                  Upload Image
                </Button>
              </Grid>
            </Grid>
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 1 }}
              onClick={handleSubmit}
              //onClick={ () => handleSubmit()}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signIn" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 2 }} />
      </Container>
    </ThemeProvider>
  );
}