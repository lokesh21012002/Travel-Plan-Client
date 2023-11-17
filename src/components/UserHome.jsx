import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
// import './App.css';
import { Typography, Box, TextField, Autocomplete } from '@mui/material'
import FilterPrductsUser from './FilterProductsUser';
import { fetchdata } from './DummyUser';
// import { Button } from '@material-ui/core';
import Button from '@mui/material/Button';

import { makeStyles } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';



import AddComp from './AddCompAdmin';
import TmpUser from './TmpUser';
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


function UserHome() {
      const [searchParams, setSearchParams] = useSearchParams();
    //   const [id,setId]=useState(0)
      console.log(searchParams.get('id'));
    //   setId(searchParams.get("id"))
    const classes = useStyles(); 
 const [input, setInput] = useState('')
 const [list, setList] = useState([]);

 const handleInput = (e) => {
   console.log(e.target.value)
   setInput(e.target.value)
 }

 useEffect(() => {
   fetchdata()
     .then(res => setList(res))
 }, [])


 return (
   <Box 
     sx={{
       width: 400,
       height: 660,
       margin: '100px auto',
       display: 'flex',
       flexDirection: 'column',
       justifyContent: 'space-evenly'
     }}>
         <Typography variant="h3" component="h2">
                Travel Plan App
        </Typography>



        <TextField onChange={handleInput} label="Search Plan" sx={{width:350,margin:"10px auto"}}></TextField>
     {/* <Typography variant='h4' component={'h1'}>React Search Bar</Typography> */}
     {/* <Autocomplete
       disablePortal
       id="combo-box-demo"
       options={ list && list.map(item => item.title)}

       renderInput={(params) => <TextField {...params}
         label="Search Plan"
         onSelect={handleInput}
         sx={{
           width: 350,
           margin: '10px auto',
         }} />}
     /> */}


     <FilterPrductsUser  searchstring={input} list={list} />



         {/* <AddComp/> */}



     {/* <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >Add Plan</Button> */}
     {/* <Button
     sx={{
        backgroundColor:'blue',
      color:'white',
      padding:'.5rem 1rem',
     }}
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Travel Plan
      </Button>
     
     onClick={()=>alert("Button clicked")}>Add Plan</Button> */}

    {/* <Link to={`/user?id=${sessionStorage.getItem("userId")}/plans`} > */}
     {/* <Button variant="outlined" >
        Plans
      </Button> */}


      <TmpUser Uid={searchParams.get('id')}/>

      {/* </Link> */}
      <Link to={"/login"}>Logout</Link>

      
   </Box>
 );
}

export default UserHome;
