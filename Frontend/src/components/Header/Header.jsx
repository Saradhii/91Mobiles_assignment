import React from 'react';
import "./styles.css";
import Alert from '@mui/material/Alert';
import {Link} from "react-router-dom";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Header = () => {
   
  //Alert popup for Successfull logout
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
    window.location.href="./login";
    };

  //getting jwt from localstorage for redux
    var token = localStorage.getItem("91Logintoken");
    var name  = localStorage.getItem("91Name");
    const handleLogout =()=>{
      localStorage.removeItem("91Logintoken");
      localStorage.removeItem("91Loginid");
      localStorage.removeItem("91Name");
      setOpen(true);
    }

  return (
    //Header content --> if token is present show logout, doctor name & patient list 
    //Header content --> if token is not present show login & signup

    <>
    {token ? 
    <>
    <div className='header'>
      <span><img src="https://www.svgrepo.com/show/152261/files.svg"/>&nbsp;&nbsp;<p><Link to="/profile">{name}</Link></p></span>
      <Link to="/managedocs"><h1>My documents</h1></Link> 
      <Link to="./logout"><h1 onClick={handleLogout}>Logout</h1></Link>
    </div>
    <div className='header-sm'>
    <span><img src="https://www.svgrepo.com/show/152261/files.svg"/>&nbsp;&nbsp;<p><Link to="/profile"><h1>{name}</h1></Link></p></span>
    <Link to="./logout"><h1 onClick={handleLogout}>Logout</h1></Link>
    </div>
    </> :  <>
    <div className='header'>
     <h1><img src="https://www.svgrepo.com/show/152261/files.svg"/></h1>
     <Link to="/login"><h1>LOGIN</h1></Link>
     <Link to="/signup"><h1>SIGN-UP</h1></Link> 
    </div>
    <div className='header-sm'>
     <h1><img src="https://www.svgrepo.com/show/152261/files.svg"/></h1>
     <Link to="/login"><h1>LOGIN</h1></Link>
     <Link to="/signup"><h1>SIGN-UP</h1></Link> 
    </div>
    </>
    }
    <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
        <Alert severity="success">User Logged out successfully</Alert>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Continue</Button>
        </DialogActions>
    </Dialog>
    </>
  )
}

export default Header