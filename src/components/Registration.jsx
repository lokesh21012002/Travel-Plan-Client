import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import axios from "../config/AxiosConfig";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import AxiosConfigMicroservice from '../config/AxiosConfigMicroservice';

const useStyles = makeStyles((theme) => ({
 form: {
    
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(3),
    display: "block",
    width: "auto",
    [theme.breakpoints.up(400 + theme.spacing(2))]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
},
 submit: {
    margin: theme.spacing(3, 0, 2),
 },
}));

const SignupForm = () => {
    const navigate=useNavigate();
 const classes = useStyles();
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');
 const [role, setRole] = useState('USER');

 const handleSubmit = async(e) => {
    try{
    e.preventDefault();
    const cred={username,password,role};
     const response=await axios.post("/auth/signup",cred)
    console.log('A user signed up:', cred);
    console.log(response.data);

    if(response.data.status==="NOT_FOUND"){
        // alert(response.data.message);
        Swal.fire({
                    title: 'Error!',
                    text: 'User Already Exist Click below to Login',
                    icon: 'error',
                    // confirmButtonText: 'Cool'
                }).then(()=>{
                    navigate("/login")

                })

//         Swal.fire({
//   title: 'Error!',
//   text: 'Do you want to continue',
//   icon: 'error',
//   confirmButtonText: 'Cool'
// })
    }
    else{

        Swal.fire({
                    title: 'Sucesss!',
                    text: 'Do you want to continue',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                }).then(()=>{
                     navigate("/login")

                })
        // alert("User registered sucessfully");
        // navigate("/login")

    }







    setUsername('');
    setPassword('');
    setRole('USER');
    }
    catch(error){
        console.log(error);
    
    
 }

};

 return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <TextField required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        label="Username"
        fullWidth
        margin="normal"
      />
      <TextField required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label="Password"
        type="password"
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="role-label">Role</InputLabel>
        <Select required
          labelId="role-label"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <MenuItem value="ADMIN">ADMIN</MenuItem>
          <MenuItem value="USER">USER</MenuItem>
        </Select>
      </FormControl>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Sign Up
      </Button>
    </form>
 );
};

export default SignupForm;