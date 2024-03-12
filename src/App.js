import React, { useState, useEffect } from "react";

function renderExpenses(expenses) {
  return expenses.map((expense) => (
    <tr key={expense._id}>
      <td>{expense._id}</td>
      <td>{expense.description}</td>
      <td>{expense.amount}</td>
      <td>{new Date(expense.date).toDateString()}</td>
    </tr>
  ));
}

function App() {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [onSuccessfulSave, setOnSuccessfulSave] = useState(false);

  const fetchExpenses = async () => {
    const apiUrl = process.env.REACT_APP_API_UPL;
    const endpoint = `${apiUrl}/api/expenses`;
    const response = await fetch(endpoint);
    const expenseData = await response.json();
    setExpenses(expenseData);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const saveExpense = async (event) => {
    event.preventDefault();
    const apiUrl = process.env.REACT_APP_API_UPL;
    const endpoint = `${apiUrl}/api/expenses`;
    const expense = {
      description: description,
      amount: amount,
      date: date,
    };

    await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expense),
    });

    setOnSuccessfulSave(true);
  };

  useEffect(() => {
    if (onSuccessfulSave) {
      fetchExpenses();
    }
  }, [onSuccessfulSave]);

  return (
    <div className="container mt-5" style={{ backgroundColor: '#f0f0f0', backgroundImage: 'url("/background.jpg")', backgroundSize: 'cover' }}>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <form onSubmit={saveExpense}>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                className="form-control"
                id="description"
                rows="3"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="amount" className="form-label">Amount</label>
              <input
                type="number"
                className="form-control"
                id="amount"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="date" className="form-label">Date</label>
              <input
                type="date"
                className="form-control"
                id="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ paddingTop: '10px' }}>Save</button>
          </form>
        </div>
      </div>
      
      <div className="row justify-content-center mt-5">
        <div className="col-md-8">
          <h2>My Expenses</h2>
          <table className="table" style={{ backgroundColor: '#ffffff', opacity: 0.9 }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>{renderExpenses(expenses)}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
