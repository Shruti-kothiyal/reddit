import React, {useState,useEffect} from "react";
// import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import { useLocation } from "react-router-dom";


var CryptoJS = require("crypto-js");

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

export default function SignIn(props) {
  console.log("props -----> ",props)
  const location=useLocation();
  console.log("location ---> ",location)
  var originalDetails=""
  if(location.state!==null){
  var bytes  = CryptoJS.AES.decrypt(location.state,process.env.REACT_APP_KEY);
  originalDetails = bytes.toString(CryptoJS.enc.Utf8);
  originalDetails=JSON.parse(originalDetails)
  console.log("original details -----> ",originalDetails)
  }
  const initialValues={email:originalDetails.email,password:"",otp:""}
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
        await axios.post("http://localhost:5000/api/user/login", {
          email:formValues.email,
          otp:formValues.otp,
          password:formValues.password
        }).then((response) => {
            alert("Logged In")
        })
      }
    }
    check()
  },[formErrors])
  
  const validate=(values)=>{
    const errors={}
    const regex=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    if(!values.email){
      errors.email="Email is required"
    }else if(!regex.test(values.email)){
      errors.email="Enter valid email"
    }
    if(originalDetails.status===true||originalDetails.state===null){
      if(!values.password){
        errors.password="Password is required"
      }else if(values.password.length<4){
        errors.password="Password must be more than 4 characters"
      }else if(values.password.length>10){
        errors.password="Password cannot exceed more than 10 characters"
      }
    }else if(originalDetails.status===false){
      if(!values.otp){
        errors.otp="OTP is required"
      }
    }
    return errors
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus 
                  value={formValues.email}
                  onChange={handleChange}
                />
              <Grid item>{formErrors.email}</Grid>
            </Grid>
            {originalDetails.status===true||location.state===null?(
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={formValues.password}
                  onChange={handleChange}
                />
                <Grid item>{formErrors.password}</Grid>
              </Grid>
                ):
                (
                  <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="otp"
                    label="OTP"
                    id="otp"
                    autoComplete="current-password"
                    value={formValues.otp}
                    onChange={handleChange}
                  /><Grid item>{formErrors.otp}</Grid>
                  </Grid>
                )
              }
            </Grid>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
              //onClick={ () => handleSubmit()}      //here function definition is used instead of function calling
            >
              Sign In
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link href="signUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
  
}
