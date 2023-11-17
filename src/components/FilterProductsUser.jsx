import React, { useEffect, useState } from 'react'
import { Stack } from '@mui/system';
import { Paper, Box, Typography } from '@mui/material';
// import { Button } from '@material-ui/core';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import axios from "../config/AxiosConfig";
import { useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';


export default function FilterProductsUser({searchstring, list}) {

       const [searchParams, setSearchParams] = useSearchParams();
      console.log(searchParams.get('id'));

    const handleRegister= async (e)=>{
    const plan_id=e.currentTarget.getAttribute("id");
    const user_id=searchParams.get('id');
    console.log(user_id,plan_id);

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
       const response = await axios.post(`/user/add/${user_id}/travel-plans/${plan_id}`,{},{ headers: {"Authorization" : `Bearer ${token}`} });
       console.log("response.data",response.data);
    //    alert("Added sucessfully")
    if(response.data.status==="FOUND"){
        const msg=`Users ${user_id} taken the plan ${plan_id}`
        // alert(`Users ${user_id} taken the plan ${plan_id}`)
         Swal.fire({
                    title: 'Sucesss!',
                    text: msg,
                    icon: 'success',
                    // confirmButtonText: 'Cool'
                })
    }
    else{

        const msg=`Users ${user_id} already taken the plan ${plan_id}`
         Swal.fire({
                    title: 'Error!',
                    text: msg,
                    icon: 'error',
                    // confirmButtonText: 'Cool'
                })

        // alert(`Users ${user_id} already taken the plan ${plan_id}`)
    }
    //    setList(response.data)
    //    return response.data;
    }
    catch (error) {
       console.log(error);
   }
    


    }

    const handleExit= async (e)=>{
        const plan_id=e.currentTarget.getAttribute("id");
        const user_id=searchParams.get('id');
        console.log(user_id,plan_id);

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
       const response = await axios.delete(`/user/exit/${user_id}/travel-plans/${plan_id}`,{ headers: {"Authorization" : `Bearer ${token}`} });
       console.log("response.data",response.data);
    //    alert("Added sucessfully")
    if(response.data.status==="FOUND"){
        // alert(`Users ${user_id} exited from plan ${plan_id}`)
         const msg=`Users ${user_id} exited from the plan ${plan_id}`
        // alert(`Users ${user_id} taken the plan ${plan_id}`)
         Swal.fire({
                    title: 'Sucesss!',
                    text: msg,
                    icon: 'success',
                    // confirmButtonText: 'Cool'
                })
    }
    else{

        const msg=`Users ${user_id} have't taken the plan ${plan_id}`
         Swal.fire({
                    title: 'Error!',
                    text: msg,
                    icon: 'error',
                    // confirmButtonText: 'Cool'
                })
        // alert(`Users ${user_id} have't taken the plan ${plan_id}`)
    }
    //    setList(response.data)
    //    return response.data;
    }
    catch (error) {
       console.log(error);
   }




    }


    
//    console.log(sessionStorage.getItem("userId"));
    // const [selected,setSelected]=useState(null)



        // const handleSubmit=(event)=>{
        //     console.log(event);
        //     alert(` user id ${sessionStorage.getItem("userId")} tajne the plan`)
        // }








const filteredList = list && list.filter((element) => {
   if (searchstring === '') {
       return element;
   }
   else {
       return element.name.toLowerCase().includes(searchstring)
   }
})

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
                   <br></br>
                   <Box display="flex" justifyContent="space-between">
                   <Button  variant="contained" color="primary" onClick={handleRegister} id={item.plan_id}>Register</Button>
                   <Button  variant="contained" color="primary" onClick={handleExit} id={item.plan_id}>Exit</Button>
                    {/* <br></br> */}
                   </Box>
                   <br></br>
               </Paper>
           ))}

</Stack>
   </Box>
 )
}
