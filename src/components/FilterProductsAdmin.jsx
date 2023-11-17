import React, { useEffect, useState } from 'react'
import { Stack } from '@mui/system';
import { Paper, Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core/styles';

import UpdateCompAdmin from './UpdateCompAdmin';

import axios from '../config/AxiosConfig';
import Swal from 'sweetalert2';

import Tmp from './Tmp';
// import { fetchdata } from './DummyAdmin';


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



export default function FilterPrducts({fetchdata,searchstring, list}) {

   const classes = useStyles();

const filteredList = list && list.filter((element) => {
   if (searchstring === '') {
       return element;
   }
   else {
       return element.name.toLowerCase().includes(searchstring)
   }
})


 const handleClickDelete= async (e)=>{
 const plan_id=e.currentTarget.getAttribute("id");

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
       const response = await axios.delete(`/admin/delete/${plan_id}`,{ headers: {"Authorization" : `Bearer ${token}`} });
       console.log("response.data",response,response.data);
       if(response.status===200){
        fetchdata();


        Swal.fire({
                    title: 'Sucesss!',
                    text: 'Item deleted Sucessfully',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                })

        

        // alert(`Plan ${plan_id} deleted sucessfully`);
        // fetchdata();
       }
       else{

        Swal.fire({
                    title: 'Error!',
                    text: 'Do you want to continue',
                    icon: 'error',
                    confirmButtonText: 'Cool'
                })
                // alert("Error");
       }
      //  setList(response.data)
      //  return response.data;
    }
    catch (error) {
       console.log(error);
   }





  // alert("Deleted Sucessfully");





 }


 return (
   <Box>
     <Stack spacing={2}
     sx={{
       overflow: 'auto',
       maxHeight: 500,

     }}
     >
     { filteredList && filteredList.map((item) => (
               <Paper key={item.plan_id}
               sx={{
                   textAlign:'left'
               }}  >
                   <Typography><strong>Id:</strong> {item.plan_id}</Typography>
                   <Typography><strong>Name:</strong> {item.name}</Typography>
                   <Typography><strong>Description:</strong> {item.description}</Typography>
                   <Typography><strong>Destination:</strong> {item.destination}</Typography>
                   <Typography><strong>Date:</strong> {item.date}</Typography>
                 {/* <Button type="submit" color="primary" className={classes.submitz}>
                    Update
                </Button> */}
                <br></br>
                <Box display="flex" justifyContent="space-between">

                <UpdateCompAdmin  fetchdata={fetchdata} travelPlan={item} id={item.plan_id} />

                <Button  color="primary" variant='contained' type="submit" id={item.plan_id} className={classes.submitz} onClick={handleClickDelete}>
                    Delete
                </Button>

                  {/* <Button type="submit" color="primary" className={classes.submitz} onClick={handleClickDelete}>
                    Users
                </Button> */}

                <Tmp Pid={item.plan_id} />
                </Box>
                <br></br>

               </Paper>
           ))}

</Stack>
   </Box>
 )
}
