import React, { useState } from 'react';
import Modal from 'react-modal';
import {  Box,Typography} from '@material-ui/core';
import Button from '@mui/material/Button';
import './styles.css';
import axios from "../config/AxiosConfig";
import Swal from 'sweetalert2';

Modal.setAppElement('#root');

const Tmp = (props) => {
 const [showModal, setShowModal] = useState(false);
 const [users, setUsers] = useState([]);

 const getUsersForPlan =  async (plan) => {

  try{
      const token=sessionStorage.getItem("token");
    console.log(props.Pid);
    const response=await axios.get(`/admin/users/${props.Pid}/all`,{ headers: {"Authorization" : `Bearer ${token}`} ,})
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
        <h2>Users</h2>
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              {/* <th>Name</th> */}
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.user_id}>
                <td>{user.user_id}</td>
                {/* <td>{user.name}</td> */}
                <td>{user.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <Box textAlign="center" justifyContent='center' justifyItems="center"> */}
        <Typography align='center'>
              <Button color="primary"  variant="contained" onClick={() => setShowModal(false)}>Close</Button>
</Typography>
        {/* </Box> */}

        {/* <button onClick={() => setShowModal(false)}>Close</button> */}
      </Modal>
    );
 };

 return (
    <div>
      <Button  color="primary" variant="contained" onClick={() => handleButtonClick('Premium')}>
        Users
      </Button>
      {/* <button onClick={() => handleButtonClick('Premium')}>Show Premium Users</button> */}
      <UsersModal />
    </div>
 );
};

export default Tmp;