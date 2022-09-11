import React from 'react';
import { useState,useEffect } from "react";
import axios from "axios";
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Login = () => {

    // hooks for form-data & popups
    const [formData, Setformdata] = useState({});
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);

    // closing for success popup
    const handleClose = () => {
      setOpen(false);
      window.location.href="/profile";
    };

    // closing for failed popup
    const handleClose1 = () => {
      setOpen1(false);
    };
   
    // Handling changes on input-fields
    const handleChange = (e)=>{
        let name = e.target.name;
        Setformdata({
        ...formData,
        [name]: e.target.value,
        [name]: e.target.value,
    });
    }

    //Sending form-data to login end-point
    const handleSubmit = (e)=>{
        setOpen2(true);
        e.preventDefault();
        axios.post(`https://assignment91mobiles.herokuapp.com/user/signin`, formData, {
        headers: { "Content-Type": "application/json" },
        }).then((responce) => {
        const { data } = responce;
        console.log(data);
        if (data.message == "Logged in") {
          localStorage.setItem("91Logintoken", data.token);
          localStorage.setItem("91Loginid", data.user._id);
          localStorage.setItem("91Name",data.user.name);
          setOpen2(false);
          setOpen(true);
        } else {
          setOpen2(false);
          setOpen1(true);
        }
      });
    };

  return (
    <>
    {/* Form for taking email & password */}
    <div className='signuppage'>
      <div>
        <h1>LOGIN</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
         <label htmlFor="email">Email</label>
         <input type="text" className='lname' name="email" onChange={handleChange} placeholder="Your email.." required/>
         <label htmlFor="password">Password</label>
         <input type="text" className='lname' name="password" onChange={handleChange} placeholder="Your password.." required/>
         <input type="submit" value="Submit"/>
        </form>
      </div>
    </div>

    {/* Alert popup for successfull login */}
    <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
        <Alert severity="success">Login succeess</Alert>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Continue</Button>
        </DialogActions>
    </Dialog>

    {/* Alert popup for login failed */}
    <Dialog open={open1} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
        <Alert severity="error">Login Failed ( Invalid credentials )</Alert>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1}>Continue</Button>
        </DialogActions>
    </Dialog>

    <Dialog open={open2} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
        <div class="spinner-3"></div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        </DialogActions>
    </Dialog>
    </>
  )
}

export default Login