import React, { useState } from 'react';
import { useRef } from 'react';
import "../Header/styles.css";
import axios from "axios";
import { useEffect } from 'react';
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Documents = () => {
    const [alldocs,setAlldocs] = useState(true);
    const [newdocs,setNewdocs] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [searchdocs,setSearchdocs] = useState(false);
    const [data, setData] = useState({});
    const [docs,setDocs] = useState([]);
    const [serchdoc,setSearchdoc] = useState([]);
    const [open1, setOpen1] = React.useState(false);
    const inputDoc = useRef();

    const handleClose = () => {
         setOpen(false);
         setOpen1(false);
         setAlldocs(true);
         setNewdocs(false);
         setSearchdocs(false);
     };

    useEffect(()=>{
     const userid = localStorage.getItem("91Loginid");
     axios.get(`https://assignment91mobiles.herokuapp.com/user/${userid}/getdocs`)
     .then(({data})=>{
          setDocs(data);
     });
    })

    const getdocs = () =>{
         setAlldocs(true);
         setNewdocs(false);
         setSearchdocs(false);
    }
    const getnewdocs = () =>{
         setAlldocs(false);
         setNewdocs(true);
         setSearchdocs(false);
    }
    const getsearchdocs = () =>{
        setAlldocs(false);
        setNewdocs(false);
        setSearchdocs(true);
    }
// Handling changes on input-fields
    const handleChange = (e)=>{
     let name = e.target.name;
     setData({
     ...data,
     [name]: e.target.value,
     [name]: e.target.value,
    });
    }

//Sending form-data to login end-point
     const handleSubmit = (e)=>{
     e.preventDefault();
 
     const userid = localStorage.getItem("91Loginid");
     const formData = new FormData();
     formData.append("name",data.name);
     formData.append("doc",inputDoc.current.files[0]);
     axios.post(`https://assignment91mobiles.herokuapp.com/user/${userid}/docs`,formData,{
          headers:{"Content-type":"multipart/formdata"},
     })
     setOpen(true);
     };

     const searchProduct = (e) => {
          const value = e.target.value;
          axios.get(`https://assignment91mobiles.herokuapp.com/user/doc/search?name=${value}`)
            .then((res) => {
              const { data } = res;
               setSearchdoc(data);
            })
        };
     //deleting a doc
     const deleteItem = async (id) => {
     console.log(id);
     let res = await fetch(`https://assignment91mobiles.herokuapp.com/user/delete/${id}`, {
       method: "DELETE",
     });
     setOpen1(true);
     };    
  return (
    <>
    <div className='dochome'>
         <button className='b1' onClick={getdocs}>View all Documents</button>
         <button className='b1' onClick={getnewdocs}>Upload New document</button>
         <button className='b1' onClick={getsearchdocs}>Search document</button>
    </div>
    <div className='docbody'>
        {alldocs?<>
        <h1>ALL DOCS</h1>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js">
        <div>
          {docs && docs.map((e)=>{
               return (
                    <div>
                     <Accordion>
                     <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                     <Typography><div className='singledoc'>{e.name} <button className='delete' onClick={() => {deleteItem(e._id)}}>Delete</button></div></Typography>
                     </AccordionSummary>
                     <AccordionDetails>
                     <Typography>
                     <div className='pdfdoc'>
                         <Viewer fileUrl={`https://assignment91mobiles.herokuapp.com/static/${e.doc}`} />
                     </div>
                     </Typography>
                     </AccordionDetails>
                     </Accordion>
                     </div>
               )
          })}
        </div>
        </Worker>
        </>:null}
        {newdocs?<>
          <div className='fileupload'>
               <form onSubmit={handleSubmit}>
                    <label>Upload new file: </label><br></br>
                    <input type="text" name="name" placeholder='Enter name for your document' onChange={handleChange}/>
                    <div className='doty'>
                    <input type="file" ref={inputDoc} name="document" accept=".pdf" onChange={handleChange}/>
                    </div>
                    <input type="submit" value="Save"/>
               </form>
          </div>
          </>:null}
        {searchdocs?<>
        <div>
          <h1>SEARCH DOCS</h1>
          <span>Search:</span>&nbsp;
                <input type="text" placeholder='document name'  onChange={(e) => searchProduct(e)}></input>
        </div>
        <div className='searchdiv'>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js">
          {serchdoc && serchdoc.map((s)=>{
               return (
                    <>
                     <Accordion>
                     <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                     <Typography>{s.name}</Typography>
                     </AccordionSummary>
                     <AccordionDetails>
                     <Typography>
                     <div className='pdfdoc'><Viewer fileUrl={`https://assignment91mobiles.herokuapp.com/static/${s.doc}`} /></div>
                     </Typography>
                     </AccordionDetails>
                     </Accordion>
                     </>
               )
          })}
          </Worker>
        </div>
        </>:null}
    </div>
    <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
        <Alert severity="success">Pdf Saved</Alert>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Continue</Button>
        </DialogActions>
    </Dialog>

    <Dialog open={open1} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
        <Alert severity="error">Document deleted</Alert>
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

export default Documents