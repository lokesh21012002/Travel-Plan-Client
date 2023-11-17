import React from "react";
import axios from "../config/AxiosConfig"

export const fetchdata = async ()=>{
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
        // const response={}
       const response = await axios.get("/user/travel-plans/all",{ headers: {"Authorization" : `Bearer ${token}`} });
       console.log(response);
       return response.data;
    }
    catch (error) {
       console.log(error);
   }
}
