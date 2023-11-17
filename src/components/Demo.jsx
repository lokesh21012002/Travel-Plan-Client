import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import {useNavigate,Link} from 'react-router-dom';
import axios from "../config/AxiosConfig"
import PopUp from './PopUp';

import Swal from 'sweetalert2';

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



const Demo = ({ handleLogin }) => {

    const navigate = useNavigate();
 const classes = useStyles();
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');
 const [user,setUser]=useState(null);
//  const [isLoggedIn,setLoggedIn]=useState(false);

const handleSubmit = async(e) => {
    try{
    e.preventDefault();
    const cred={username,password};
     const response=await axios.post("/auth/login",cred)
    console.log('A user signed in:', cred);
    console.log(response.data)
    if(response.data.status==="NOT_FOUND"){
        // <PopUp text="Invalid Username or Password"/>
        // alert(response.data.message);
        Swal.fire({
                    title: 'Error!',
                    text: response.data.message,
                    icon: 'error'
                    // confirmButtonText: 'Cool'
                }).then( function (){

                    if(response.data.message==="Invalid Credentials"){

                        // navigate({
                        //     pathname:"/signup"
                        // })

                    }
                    else{

                        navigate({
                            pathname:"/signup"
                        })

                    }

                    console.log(response.data.message);

                });
        handleLogin(false)
    }else{

         Swal.fire({
                    title: 'Success!',
                    text: "Click below to go to Home page!",
                    icon: 'success',
                    // confirmButtonText: 'Cool'
                }).then(function (){

                    navigate({
                        pathname: `/${role}`,
                        search: `?id=${response.data.userId}`
                    });

                });

                
        // alert("Success")
        handleLogin(true);
        
        sessionStorage.setItem("token",response.data.token);
        sessionStorage.setItem("userId",response.data.userId)
    const roleUpper=response.data.role;
    const role=roleUpper.toLowerCase();

    setUser(response.data)


// navigate({
//   pathname: `/${role}`,
//   search: `?id=${response.data.userId}`
// });

    }
//     localStorage.setItem("token",response.data.token)
//     const roleUpper=response.data.role;
//     const role=roleUpper.toLowerCase();


//    navigate(`/${role}/home`)








    setUsername('');
    setPassword('');
    
    }
    catch(error){
        console.log(error);
    
    
 }


}

 

 return (
    <>
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
   
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Sign In
      </Button>
       <Link  className={classes.Link} to="/signup" >Sign Up</Link>

    </form>

    {/* <PopUp/> */}
    </>
 );
};

export default Demo;