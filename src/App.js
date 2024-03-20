import React, { useState, useEffect } from "react";
import { Button, TextField, Typography, Container, Table, TableHead, TableBody, TableRow, TableCell, AppBar, Toolbar, Paper } from '@mui/material';
import { DatePicker } from '@mui/lab';

function renderExpenses(expenses) {
  return expenses.map((expense) => (
    <TableRow key={expense._id}>
      <TableCell>{expense._id}</TableCell>
      <TableCell>{expense.fullname}</TableCell>
      <TableCell>{expense.amount}</TableCell>
      <TableCell>{new Date(expense.date).toDateString()}</TableCell>
    </TableRow>
  ));
}

function App() {
  const [expenses, setExpenses] = useState([]);
  const [fullname, setFullname] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(new Date());

  const fetchExpenses = async () => {
    // Simula sa pag-fetch sa expenses gikan sa API
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const saveExpense = async (event) => {
    event.preventDefault();
    // Simula sa pag-save sa bag-ong expense
  };

  useEffect(() => {
    // Refresh expenses human sa successful save
  }, [expenses]);

  return (
    <div>
      
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Expense Tracker
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" style={{ backgroundColor: '#f0f0f0', backgroundImage: 'url("/background.jpg")', backgroundSize: 'cover', padding: '20px', borderRadius: '10px', marginTop: '20px' }}>
        <Typography variant="h4" align="center" gutterBottom>Expense Tracker</Typography>
        <form onSubmit={saveExpense}>
          <TextField
            label="Fullname"
            variant="outlined"
            fullWidth
            margin="normal"
            value={fullname}
            onChange={(event) => setFullname(event.target.value)}
          />
          <TextField
            label="Amount"
            variant="outlined"
            type="number"
            fullWidth
            margin="normal"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
          <DatePicker
            label="Date"
            value={date}
            onChange={(newValue) => setDate(newValue)}
            renderInput={(params) => <TextField {...params} variant="outlined" fullWidth margin="normal" />}
          />
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>Save</Button>
        </form>
        
        <Typography variant="h5" align="center" gutterBottom style={{ marginTop: '20px' }}>My Expenses</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {renderExpenses(expenses)}
          </TableBody>
        </Table>
      </Container>
      <Paper style={{ backgroundColor: '#333', color: '#fff', padding: '20px', marginTop: '20px', textAlign: 'center' }}>
        <Typography variant="body1">&copy; 2024 Expense Tracker. All rights reserved.</Typography>
      </Paper>
    </div>
  );
}

export default App;
