import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import Title from './Title';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

export default function Sales() {
  const [expenses, setExpenses] = useState([]);
  const storeId = useSelector((state) => state.auth.storeID);
  const jwt = localStorage.getItem('token');
  const decoded = jwtDecode(jwt);
  const userRole = decoded.role;

  const fetchData = async () => {
    try {
      let response;
      if (userRole === 'Admin') {
        response = await axios.get('http://localhost:3200/store/getexpense');
      } else {
        response = await axios.get(`http://localhost:3200/store/storeexpense?store=${storeId}`);
      }
  
      
  
      if (Array.isArray(response.data)) {
        setExpenses(response.data);
      } else {
        console.error('Response data is not an array of expenses.');
      }
    } catch (error) {
      alert(error);
      // Handle the error here, e.g., show a message to the user
    }
  };
  
  useEffect(() => {   
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Title>Expense</Title>
      <Typography component="p" variant="h4">
        {expenses.length > 0 ? `$${expenses[0].amount.toFixed(2)}` : 'NO expense added yet'}
      </Typography>
    </React.Fragment>
  );
}