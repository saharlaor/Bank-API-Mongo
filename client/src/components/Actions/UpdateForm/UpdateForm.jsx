import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/api";
import "./UpdateForm.css";

function UpdateForm({ user: { _id, name, cash, credit } }) {
  const [mode, setMode] = useState("deposit");
  const [amount, setAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("e");
  const navigate = useNavigate();

  const handleModeChange = (e) => {
    setMode(e.target.value);
    setAmount(0);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleDepositClick = async (e) => {
    e.preventDefault();
    if (amount < 0) return setErrorMessage("Invalid Amount");
    await api.put(`/users/deposit/${_id}`, { amount: parseInt(amount) });
    navigate("/users");
  };

  const handleWithdrawClick = async (e) => {
    e.preventDefault();
    if (amount < 0 || amount > cash + credit)
      return setErrorMessage("Invalid Amount");
    await api.put(`/users/withdraw/${_id}`, { amount: parseInt(amount) });
    navigate("/users");
  };

  const generateForm = () => {
    switch (mode) {
      case "deposit":
        return (
          <>
            <label htmlFor="amount" autoFocus>
              Amount:
            </label>
            <input
              type="number"
              name="amount"
              id="amount"
              onChange={handleAmountChange}
              min={0}
            />
            <button onClick={handleDepositClick}>Deposit</button>
          </>
        );
      case "withdraw":
        return (
          <>
            <label htmlFor="amount" autoFocus>
              Amount:
            </label>
            <input
              type="number"
              name="amount"
              id="amount"
              onChange={handleAmountChange}
              min={0}
              max={cash + credit}
            />
            <button onClick={handleWithdrawClick}>Withdraw</button>
          </>
        );
      case "credit":
        return (
          <>
            <label htmlFor="amount" autoFocus>
              Amount:
            </label>
            <input
              type="number"
              name="amount"
              id="amount"
              onChange={handleAmountChange}
              min={Math.max(0, cash * -1)}
              max={cash + credit}
            />
            <button>Set Credit</button>
          </>
        );
      case "transfer":
        return (
          <>
            <label htmlFor="amount" autoFocus>
              Amount:
            </label>
            <input
              type="number"
              name="amount"
              id="amount"
              onChange={handleAmountChange}
              min={Math.max(0, cash * -1)}
              max={cash + credit}
            />
            <label htmlFor="id" autoFocus>
              ID:
            </label>
            <input
              type="text"
              name="id"
              id="id"
              min={Math.max(0, cash * -1)}
              max={cash + credit}
            />
            <button>Transfer</button>
          </>
        );

      default:
        break;
    }
  };

  return (
    <div className="UpdateForm">
      <h2>{name}</h2>
      <h4>Cash</h4>
      <span>{cash}</span>
      <h4>Credit</h4>
      <span>{credit}</span>
      <select name="mode" id="mode" value={mode} onChange={handleModeChange}>
        <option value="deposit">Deposit</option>
        <option value="withdraw">Withdraw</option>
        <option value="credit">Credit</option>
        <option value="transfer">Transfer</option>
      </select>
      <form action="">{generateForm()}</form>
      <div className="error-message">{errorMessage}</div>
    </div>
  );
}

export default UpdateForm;
