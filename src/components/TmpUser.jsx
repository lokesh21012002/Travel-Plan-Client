import React, { useState } from 'react';
import Modal from 'react-modal';
import {Typography } from '@material-ui/core';
import './styles.css';
import axios from "../config/AxiosConfig";
import Button from '@mui/material/Button';

Modal.setAppElement('#root');

const TmpUser = (props) => {
 const [showModal, setShowModal] = useState(false);
 const [users, setUsers] = useState([]);

 const getUsersForPlan =  async (plan) => {

  try{
      const token=sessionStorage.getItem("token");
    console.log(props.Uid);
    const response=await axios.get(`/user/travelplan/all/${props.Uid}`,{ headers: {"Authorization" : `Bearer ${token}`} ,})
    console.log(response.data);
    setUsers(response.data);
  }

  catch(err){
    console.log(err);
  }



    // setUsers([
    //   { id: 1, name: 'John Doe', username: 'john_doe', plan: plan },
    //   { id: 2, name: 'Jane Doe', username: 'jane_doe', plan: plan },
    // ]);
 };

 const handleButtonClick = (plan) => {
    getUsersForPlan(plan);
    setShowModal(true);
 };

 const UsersModal = () => {
    return (
      <Modal isOpen={showModal} onRequestClose={() => setShowModal(false)}>
        <h2>Plans</h2>
        <table className="user-table">
          <thead>
            <tr>
              <th>Travel Plan ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Destination</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.plan_id}>
                <td>{user.plan_id}</td>
                {/* <td>{user.name}</td> */}
                <td>{user.name}</td>
                <td>{user.description}</td>
                <td>{user.destination}</td>
                <td>{user.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Typography align='center'>
              <Button color="primary"  variant="contained" onClick={() => setShowModal(false)}>Close</Button>
</Typography>
      </Modal>
    );
 };

 return (
    <div>
      <Button variant="contained" color="primary" onClick={() => handleButtonClick('Premium')}>
        Plans
      </Button>
      {/* <button onClick={() => handleButtonClick('Premium')}>Show Premium Users</button> */}
      <UsersModal />
    </div>
 );
};

export default TmpUser;