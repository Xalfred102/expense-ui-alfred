import "./App.css";
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

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(
    new Date(Date.now()).toLocaleDateString("en-CA")
  );
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
    <div>
      <form onSubmit={saveExpense}>
        <textarea
          cols="30"
          rows="10"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        ></textarea>
        <input
          type="number"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
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

        <tbody>{renderExpenses(expenses)}</tbody>
      </table>
    </div>
  );
}

export default App;
