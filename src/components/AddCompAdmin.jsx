import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Swal from 'sweetalert2';

import axios from "../config/AxiosConfig";

function AddComp(props) {
 const [open, setOpen] = useState(false);

 const [name, setName] = useState('');
 const [description, setDescription] = useState('');
 const [destination, setDestination] = useState('');
 const [date, setDate] = useState('');
   function refreshPage() {
    window.location.reload(false);
  }

 const handleClickOpen = () => {
    setOpen(true);
 };

 const handleClose = () => {
    setOpen(false);
 };

 const handleSubmit = async (event) => {
    event.preventDefault();
    const payload={name,destination,description,date};
    // Submit your form data here
    console.log(payload);
    const token=sessionStorage.getItem("token");
    const response=await axios.post("/admin/add",payload,{ headers: {"Authorization" : `Bearer ${token}`} ,})
console.log("respind",response);
// Swal.fire({
//                     title: 'Sucesss!',
//                     text: 'Do you want to continue',
//                     icon: 'success',
//                     confirmButtonText: 'Cool'
//                 })
console.log(props.list);

props.setList([...props.list,response.data,])
console.log(props.list);




  // let formattedStr=response.data.date.toString().split("-").reverse();
  // console.log(formattedStr);
  if(response.status===200){
    // alert("Added Successfully")
    if(response.data.status==='NOT_FOUND'){
        // alert("Travel Plan Already exists")
        Swal.fire({
                    title: 'Error!',
                    text: 'Travel Plan Already exist',
                    icon: 'error',
                    confirmButtonText: 'Cool'
                })
      }

      else{
        Swal.fire({
                    title: 'Sucesss!',
                    text: 'Do you want to continue',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                })
        // alert("Travel plan added successfully")
      }
  }
  else{
    alert("Failed to add")
    }
    setDate('')
    setDescription('')
    setDestination('')
    setName('')
    setOpen(false)




    // if(response.data. c)



    handleClose();
    // refreshPage();

 };

 return (
    <div>
      <Button color="primary" variant="contained" onClick={handleClickOpen}>
        Add Travel Plan
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Travel Plan</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Fill out the following details to Add a new Travel Plan.
          </DialogContentText>
          {/* <TextField
            margin="dense"
            id="id"
            label="Id"
            type="text"
            fullWidth
            value={id}
            onChange={(e) => setId(e.target.value)}
          /> */}
          <TextField required
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField required
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField required
            margin="dense"
            id="destination"
            label="Destination"
            type="text"
            fullWidth
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <TextField required
            margin="dense"
            id="date"
            label="Date"
            type="date"
            fullWidth
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary"  variant='contained' onClick={handleClose} >
            Cancel
          </Button>
          <Button  color="primary" variant="contained" onClick={handleSubmit} >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
 );
}

export default AddComp;