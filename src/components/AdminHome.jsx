import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
// import './App.css';
import { Typography, Box, TextField, Autocomplete } from '@mui/material'
import FilterPrducts from './FilterProductsAdmin';
// import { fetchdata } from './DummyAdmin';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from "../config/AxiosConfig";

import AddComp from './AddCompAdmin';
import { Link } from 'react-router-dom';
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


function SearchBox() {

    const [searchParams, setSearchParams] = useSearchParams();
// searchParams.get("__firebase_request_key")
console.log(searchParams.get("id"));
    const classes = useStyles(); 
 const [input, setInput] = useState('')
 const [list, setList] = useState([]);

 const handleInput = (e) => {
   console.log(e.target.value)
   setInput(e.target.value)
 }

 const fetchdata = async ()=>{
   try{

    const token=sessionStorage.getItem("token")
    // const token="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMiLCJpYXQiOjE2OTk1OTQzOTYsImV4cCI6MTY5OTU5NjE5Nn0.5yyVQyzNC4d1Y28HiN3ZGEKYktil0O-lrwFCxGwEtVA"
    console.log(token);
const headers = {
 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8;application/json',
  'Authorization': `Bearer ${token}`
}


        // const bodyParameters = {
        // key: "value"
        // };
       const response = await axios.get("/admin/all",{ headers: {"Authorization" : `Bearer ${token}`} });
       console.log("response.data",response.data);
       setList(response.data)
       return response.data;
    }
    catch (error) {
       console.log(error);
   }
}

 useEffect(() => {
   fetchdata()
    //  .then(res => {setList(res)
    
    // console.log("res=",res);
    // })

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

        {/* <h1>Travel Plan Appp</h1>
         */}

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
         }} 
         
         
         />}
     /> */}


     <FilterPrducts  fetchdata={fetchdata} searchstring={input} list={list} />



         <AddComp setList={setList} list={list}/>

         <Link to={"/login"}>Logout</Link>



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
     
     
     onClick={()=>alert("Button clicked")}>Add Plan</Button> */}
   </Box>
 );
}

export default SearchBox;
