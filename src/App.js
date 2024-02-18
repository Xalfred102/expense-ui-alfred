import './App.css';
import { useEffect, useState } from "react";

function renderExpenses(expenses) {
     const rows = expenses.map((expense) => {
       return (
         <tr key={expense._id}>
           <td>{expense._id}</td>
           <td>{expense.description}</td>
           <td>{expense.amount}</td>
          <td>{new Date(expense.date).toDateString()}</td>
        </tr>
       );
    });
  
    return rows;
   }

function App() {
    const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
        const apiUrl = "https://alfred-klaro-ra.onrender.com";
    
        const endpoint = `${apiUrl}/api/expenses`;
    
        const response = await fetch(endpoint);
    
        const expenseData = await response.json();
    
        setExpenses(expenseData);
      };
      useEffect(() => {
            fetchExpenses();
          }, []);
        
  return (
    <div>
      <form>
        <textarea cols="30" rows="10"></textarea>
        <input type="number" />
        <input type="date" />
        <button>Save</button>
      </form>

      <h2>My Expenses</h2>

      <table width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Room</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
        {renderExpenses(expenses)}
        </tbody>
      </table>
    </div>
  );
}

export default App;